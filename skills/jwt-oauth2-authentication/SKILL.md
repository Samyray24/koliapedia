---
name: jwt-oauth2-authentication
description: >-
  Authentication engineering: JWT signing, refresh token rotation, OAuth2 PKCE flow, and session revocation.
---

# JWT & OAuth2 Authentication Skill

## Core Principles
- **Token Lifespan**: Short-lived access tokens (5-15 mins) paired with rotating refresh tokens stored in HttpOnly cookies.
- **Algorithm Whitelist**: Explicitly enforce signing algorithm (e.g. `RS256` or `EdDSA`); reject `none`.
- **PKCE Flow**: Mandate Proof Key for Code Exchange for all public and single-page applications.
