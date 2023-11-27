import socket

def get_local_ip():
    try:
        # Get the hostname
        hostname = socket.gethostname()
        # Get the local IP address using the hostname
        local_ip = socket.gethostbyname(hostname)
        return local_ip
    except Exception as e:
        return str(e)

# Call the function and print the local IP
print(get_local_ip())