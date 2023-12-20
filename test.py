# Assuming the output is stored in a variable named 'ipconfig_output'
ipconfig_output = """
Media State . . . . . . . . . . . : Media disconnected\n   Connection-specific DNS Suffix  . : \n\nUnknown adapter Pritunl 1:\n\n   Media State . . . . . . . . . . . : Media disconnected\n   Connection-specific DNS Suffix  . : \n\nUnknown adapter Pritunl 2:\n\n   Media State . . . . . . . . . . . : Media disconnected\n   Connection-specific DNS Suffix  . : \n\nUnknown adapter Pritunl 3:\n\n   Media State . . . . . . . . . . . : Media disconnected\n   Connection-specific DNS Suffix  . : \n\nWireless LAN adapter Local Area Connection* 1:\n\n   Media State . . . . . . . . . . . : Media disconnected\n   Connection-specific DNS Suffix  . : \n\nWireless LAN adapter Local Area Connection* 2:\n\n   Media State . . . . . . . . . . . : Media disconnected\n   Connection-specific DNS Suffix  . : \n\nWireless LAN adapter Wi-Fi:\n\n   Connection-specific DNS Suffix  . : \n   IPv4 Address. . . . . . . . . . . : 192.168.1.5\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : 192.168.1.254\n\nEthernet adapter VMware Network Adapter VMnet1:\n\n   Connection-specific DNS Suffix  . : \n   Link-local IPv6 Address . . . . . : fe80::36ff:4415:cd11:c3b7%12\n   IPv4 Address. . . . . . . . . . . : 192.168.75.1\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : \n\nEthernet adapter VMware Network Adapter VMnet8:\n\n   Connection-specific DNS Suffix  . : \n   Link-local IPv6 Address . . . . . : fe80::e63f:46dd:b67e:6fde%10\n   IPv4 Address. . . . . . . . . . . : 192.168.132.1\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : \n\nEthernet adapter Bluetooth Network Connection:\n\n   Media State . . . . . . . . . . . : Media disconnected\n   Connection-specific DNS Suffix  . :
"""

# Split the output into lines
lines = ipconfig_output.split('\n')

# Find the index of the line containing "Wireless LAN adapter Wi-Fi"
start_index = next((i for i, line in enumerate(lines) if 'Wireless LAN adapter Wi-Fi' in line), None)

if start_index is not None:
    # Find the index of the line containing "Subnet Mask"
    end_index = next((i for i, line in enumerate(lines[start_index:], start=start_index) if '   Subnet Mask' in line), None)

    if end_index is not None:
        # Extract and print the lines between the specified indices
        for line in lines[start_index + 1:end_index]:
            print(line)
        
        # Display the line containing the IPv4 Address
        ipv4_address_line = next((line for line in lines[start_index + 1:end_index] if 'IPv4 Address' in line), None)
        if ipv4_address_line:
            print(f"IPv4 Address: {ipv4_address_line.split(':')[-1].strip()}")
        else:
            print("IPv4 Address not found in the specified range.")
    else:
        print("Subnet Mask not found after 'Wireless LAN adapter Wi-Fi'")
else:
    print("'Wireless LAN adapter Wi-Fi' not found in the output")