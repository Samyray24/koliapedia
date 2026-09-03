---
name: canvas-image-processing-filters
description: >-
  Canvas pixel manipulation: convolution matrices (blur, sharpen, edge detection), ImageData buffers, and color adjustments.
---

# Canvas Image Processing & Pixel Filters Skill

## Core Principles
- **Direct Uint8ClampedArray Access**: Manipulate raw pixel arrays (`data[i], data[i+1], data[i+2], data[i+3]`) directly for peak performance.
- **Convolution Kernels**: Apply 3x3 and 5x5 kernel convolution matrices for Gaussian blur, sharpening, and embossing.
- **Color Grading**: Implement brightness, contrast, saturation, and invert filters via lookup tables (LUT).
