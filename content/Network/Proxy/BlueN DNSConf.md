---
title: BlueN DNSConf
date: 2025-01-15
categories:
  - BlueN
---
{
  "hosts": {
    "dns.google": "8.8.8.8",
    "dns.pub": "119.29.29.29",
    "dns.alidns.com": "223.6.6.6",
    "geosite:category-ads-all": "127.0.0.1",
    "dns.cloudflare.com": "1.1.1.1",
    "aws.amazon.com":"169.254.169.253"
  },
  "servers": [
"localhost",
    {
      "address": "223.6.6.6",
      "domains": [
        "geosite:cn"
      ],
      "expectIPs": [
        "geoip:cn"
      ]
    },
    "1.1.1.1",
    "8.8.8.8",
    "https://dns.google/dns-query"
  ]
}