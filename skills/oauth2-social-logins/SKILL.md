---
name: oauth2-social-logins
description: >-
  Social identity federation: Google, GitHub, Apple OAuth2 providers, state verification, and profile synthesis.
---

# OAuth2 Social Logins & Identity Federation Skill

## Core Principles
- **State Parameter Defense**: Always generate cryptographically secure `state` values stored in session to prevent CSRF attacks.
- **Account Linking Safety**: Only link social accounts automatically if the email is verified by the identity provider.
- **ID Token Verification**: Validate cryptographic signatures of JWT ID tokens using provider public JWKS endpoints.
