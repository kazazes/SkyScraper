#!/bin/bash
IPADDR=$(ip addr show eth0 | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b" | head -1)
/opt/install/sdrangel/bin/sdrangelsrv -a ${IPADDR}