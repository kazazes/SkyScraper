#!/bin/sh

OVPN_PATH="/ovpn/client.ovpn"
until [ -f $OVPN_PATH ]; do
    echo "No client config file found"
    sleep 60
done
echo "Starting VPN client"
openvpn --config $OVPN_PATH
