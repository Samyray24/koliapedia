---
name: web-bluetooth-usb-hardware
description: >-
  Hardware web APIs: Web Bluetooth, WebUSB, and Web Serial for communicating with physical devices from the browser.
---

# Web Bluetooth & Hardware Integration Skill

## Core Principles
- **User Gesture Requirement**: Always request device pairing inside explicit click or tap event handlers.
- **GATT Characteristics**: Read, write, and subscribe to notifications on standard and custom Bluetooth services.
- **Disconnection Handling**: Always handle sudden hardware disconnections and reconnect gracefully.
