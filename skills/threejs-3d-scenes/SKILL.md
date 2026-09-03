---
name: threejs-3d-scenes
description: >-
  Three.js 3D web environments, lighting, GLTF asset loading, shader materials, and camera controls.
---

# Three.js 3D Web Experiences Skill

## Core Principles
- **Asset Optimization**: Compress GLTF/GLB models using Draco and KTX2 texture compression.
- **Render Loop Discipline**: Disable continuous rendering when scene is idle to save mobile battery.
- **Disposal**: Manually call `.dispose()` on geometries and textures upon unmount.
