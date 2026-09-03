---
name: nginx-reverse-proxy
description: >-
  NGINX web server configuration: reverse proxy, SSL/TLS certificates, rate limiting, gzip/brotli, and cache headers.
---

# NGINX Reverse Proxy & Web Server Skill

## Core Principles
- **Proxy Headers**: Pass `Host`, `X-Real-IP`, and `X-Forwarded-For` on all proxied locations.
- **Compression**: Enable Gzip or Brotli for text, JSON, CSS, and JS MIME types.
- **Security Headers**: Inject HSTS, X-Content-Type-Options, and Referrer-Policy.
