---
name: data-encryption-cryptography
description: >-
  Applied cryptography: AES-256-GCM authenticated encryption, password hashing with Argon2id/bcrypt, and key storage.
---

# Data Encryption & Cryptography Skill

## Core Principles
- **Password Hashing**: Use Argon2id or bcrypt with appropriate work factor; never use SHA/MD5.
- **Authenticated Encryption**: Use AES-256-GCM or ChaCha20-Poly1305 to ensure confidentiality and integrity.
- **Secure Randomness**: Generate tokens and nonces using `crypto.randomBytes`, never `Math.random()`.
