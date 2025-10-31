# ping

Used to send ICMP ECHO_REQUEST to network hosts

> ping google.com

## Output

- Bytes: The size of the ICMP packet sent
- Time: The round-trip time it took for the packet to reach the host and return, measured in miliseconds
- TTL(Time to Live): The remaining lifespan of the packet, which decreases by one for each hop
- Packet Loss: The percentage of packets that were lost during transmission
- Round-Trip Time Statistics: Includes minimum, average, maximum, and standard deviation of the round-trip times

## Options

- `-c` => Send a specific number of ping requests
- `-i` => Wait a specific number of seconds between sending each packet
- `-t` => Set the IP time to live (TTL)
- `-q` => Quiet output, only show summary
- `-s` => Specify the number of data bytes to be sent


