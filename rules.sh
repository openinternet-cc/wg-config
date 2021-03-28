#!/bin/bash
sysctl -w net.ipv4.ip_forward=1
sysctl -w net.ipv6.conf.all.forwarding=1
iptables -t nat -A POSTROUTING -s 192.168.88.0/24 -j MASQUERADE
