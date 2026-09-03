---
name: webrtc-p2p-streaming
description: >-
  Realtime peer-to-peer audio, video, and data channels: WebRTC RTCPeerConnection, STUN/TURN traversal, and mesh networks.
---

# WebRTC Peer-to-Peer Streaming Skill

## Core Principles
- **ICE Candidate Exchange**: Exchange SDP offers and answers via a reliable signaling channel (WebSocket).
- **STUN/TURN Fallback**: Always configure reliable TURN servers to bypass symmetric NATs and enterprise firewalls.
- **DataChannels**: Leverage SCTP data channels with ordered or unordered delivery for ultra-low latency data transfer.
