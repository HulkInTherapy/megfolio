

/**
 * Utility functions for creating hand-drawn cursor SVGs using rough.js
 */

// Create an SVG element for cursor generation
const createSvgElement = (width, height) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  return svg;
};

// Convert SVG element to data URL
export const svgToDataUrl = (svg) => {
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  const encoded = encodeURIComponent(svgString);
  return `data:image/svg+xml,${encoded}`;
};

/**
 * Create Pencil Cursor (existing design)
 */
export const createPencilCursor = () => {
  const svg = createSvgElement(32, 32);
  const rc = rough.svg(svg);

  // Pencil body
  const body = rc.polygon([
    [4, 28], [8, 4], [14, 4], [10, 28]
  ], {
    stroke: '#2F3640',
    strokeWidth: 1,
    roughness: 0.8,
    fill: '#E8A87C',
    fillStyle: 'solid',
  });
  svg.appendChild(body);

  // Wood/sharpened section
  const wood = rc.polygon([
    [4, 28], [7, 20], [9, 20], [10, 28]
  ], {
    stroke: '#2F3640',
    strokeWidth: 1,
    roughness: 0.6,
    fill: '#D4A574',
    fillStyle: 'solid',
  });
  svg.appendChild(wood);

  // Graphite tip
  const tip = rc.polygon([
    [6, 28], [7, 24], [8, 24], [8, 28]
  ], {
    stroke: '#2F3640',
    strokeWidth: 0.8,
    roughness: 0.4,
    fill: '#2F3640',
    fillStyle: 'solid',
  });
  svg.appendChild(tip);

  // Eraser band
  const band = rc.line(8, 6, 13, 6, {
    stroke: '#718093',
    strokeWidth: 2,
    roughness: 0.5,
  });
  svg.appendChild(band);

  // Eraser
  const eraser = rc.polygon([
    [8, 4], [8, 7], [14, 7], [14, 4]
  ], {
    stroke: '#2F3640',
    strokeWidth: 1,
    roughness: 0.6,
    fill: '#CD6853',
    fillStyle: 'solid',
  });
  svg.appendChild(eraser);

  return { svg, hotspot: { x: 4, y: 28 } };
};

/**
 * Create Marker Cursor - Chisel tip marker
 */
export const createMarkerCursor = (color = '#718093') => {
  const svg = createSvgElement(32, 32);
  const rc = rough.svg(svg);

  // Marker body (thick rectangle, angled)
  const body = rc.polygon([
    [6, 4], [18, 4], [20, 6], [20, 18], [18, 20], [6, 20], [4, 18], [4, 6]
  ], {
    stroke: '#2F3640',
    strokeWidth: 1.2,
    roughness: 0.6,
    fill: '#F5F5F5',
    fillStyle: 'solid',
  });
  svg.appendChild(body);

  // Marker cap (colored)
  const cap = rc.polygon([
    [6, 4], [18, 4], [18, 8], [6, 8]
  ], {
    stroke: '#2F3640',
    strokeWidth: 1,
    roughness: 0.5,
    fill: color,
    fillStyle: 'solid',
  });
  svg.appendChild(cap);

  // Chisel tip
  const tip = rc.polygon([
    [8, 20], [16, 20], [14, 28], [10, 28]
  ], {
    stroke: '#2F3640',
    strokeWidth: 1,
    roughness: 0.4,
    fill: color,
    fillStyle: 'solid',
  });
  svg.appendChild(tip);

  // Label line
  const label = rc.line(8, 14, 16, 14, {
    stroke: '#CCCCCC',
    strokeWidth: 1.5,
    roughness: 0.8,
  });
  svg.appendChild(label);

  return { svg, hotspot: { x: 12, y: 28 } };
};

/**
 * Create Watercolor Brush Cursor
 */
export const createWatercolorCursor = (color = '#A8C4D9') => {
  const svg = createSvgElement(32, 32);
  const rc = rough.svg(svg);

  // Wooden handle
  const handle = rc.polygon([
    [14, 2], [18, 2], [17, 14], [15, 14]
  ], {
    stroke: '#2F3640',
    strokeWidth: 1,
    roughness: 0.7,
    fill: '#D4A574',
    fillStyle: 'solid',
  });
  svg.appendChild(handle);

  // Metal ferrule
  const ferrule = rc.polygon([
    [13, 14], [19, 14], [18, 18], [14, 18]
  ], {
    stroke: '#2F3640',
    strokeWidth: 1,
    roughness: 0.4,
    fill: '#A0A0A0',
    fillStyle: 'solid',
  });
  svg.appendChild(ferrule);

  // Bristles (fan shape)
  const bristles = rc.path(`
    M 14 18
    Q 10 22, 8 28
    Q 16 30, 24 28
    Q 22 22, 18 18
    Z
  `, {
    stroke: '#2F3640',
    strokeWidth: 1,
    roughness: 1,
    fill: color,
    fillStyle: 'solid',
  });
  svg.appendChild(bristles);

  // Bristle lines
  for (let i = 0; i < 3; i++) {
    const x = 12 + i * 4;
    const line = rc.line(x, 20, x + (i - 1), 26, {
      stroke: '#2F3640',
      strokeWidth: 0.5,
      roughness: 1.2,
    });
    svg.appendChild(line);
  }

  // Water droplet
  const droplet = rc.ellipse(22, 24, 4, 5, {
    stroke: '#87CEEB',
    strokeWidth: 0.8,
    roughness: 0.5,
    fill: '#87CEEB',
    fillStyle: 'solid',
  });
  svg.appendChild(droplet);

  return { svg, hotspot: { x: 16, y: 28 } };
};

/**
 * Create Crayon Cursor
 */
export const createCrayonCursor = (color = '#E8A5A5') => {
  const svg = createSvgElement(32, 32);
  const rc = rough.svg(svg);

  // Crayon body (wrapped)
  const body = rc.polygon([
    [10, 4], [22, 4], [22, 22], [10, 22]
  ], {
    stroke: '#2F3640',
    strokeWidth: 1,
    roughness: 0.8,
    fill: color,
    fillStyle: 'solid',
  });
  svg.appendChild(body);

  // Paper wrapper (middle section)
  const wrapper = rc.polygon([
    [10, 8], [22, 8], [22, 18], [10, 18]
  ], {
    stroke: '#2F3640',
    strokeWidth: 0.8,
    roughness: 0.6,
    fill: '#FDFBF7',
    fillStyle: 'solid',
  });
  svg.appendChild(wrapper);

  // Wrapper torn edge (top)
  const tornTop = rc.path(`
    M 10 8
    Q 12 7, 14 8
    Q 16 7, 18 8
    Q 20 7, 22 8
  `, {
    stroke: '#2F3640',
    strokeWidth: 0.8,
    roughness: 1.2,
  });
  svg.appendChild(tornTop);

  // Wrapper label lines
  for (let i = 0; i < 2; i++) {
    const y = 11 + i * 3;
    const line = rc.line(12, y, 20, y, {
      stroke: '#CCCCCC',
      strokeWidth: 1,
      roughness: 0.8,
    });
    svg.appendChild(line);
  }

  // Crayon tip (rounded)
  const tip = rc.path(`
    M 10 22
    L 10 24
    Q 12 28, 16 28
    Q 20 28, 22 24
    L 22 22
    Z
  `, {
    stroke: '#2F3640',
    strokeWidth: 1,
    roughness: 0.6,
    fill: color,
    fillStyle: 'solid',
  });
  svg.appendChild(tip);

  return { svg, hotspot: { x: 16, y: 28 } };
};

/**
 * Create Pointing Hand Cursor (for clickable elements)
 */
export const createPointingCursor = () => {
  const svg = createSvgElement(32, 32);
  const rc = rough.svg(svg);

  // Pointing finger
  const finger = rc.path(`
    M 12 2
    Q 14 0, 16 2
    L 16 14
    L 12 14
    Z
  `, {
    stroke: '#2F3640',
    strokeWidth: 1,
    roughness: 0.6,
    fill: '#E8A87C',
    fillStyle: 'solid',
  });
  svg.appendChild(finger);

  // Finger nail
  const nail = rc.path(`
    M 12 3
    Q 14 2, 16 3
  `, {
    stroke: '#CD6853',
    strokeWidth: 1.5,
    roughness: 0.5,
  });
  svg.appendChild(nail);

  // Other fingers (curled)
  const fingers = rc.path(`
    M 16 14
    Q 20 12, 22 14
    Q 24 16, 22 18
    L 16 18
  `, {
    stroke: '#2F3640',
    strokeWidth: 1,
    roughness: 0.7,
    fill: '#E8A87C',
    fillStyle: 'solid',
  });
  svg.appendChild(fingers);

  // Palm
  const palm = rc.path(`
    M 8 14
    L 22 14
    L 22 24
    Q 16 28, 8 24
    Z
  `, {
    stroke: '#2F3640',
    strokeWidth: 1,
    roughness: 0.8,
    fill: '#E8A87C',
    fillStyle: 'solid',
  });
  svg.appendChild(palm);

  // Thumb
  const thumb = rc.path(`
    M 8 16
    Q 4 18, 6 22
    Q 8 24, 10 22
  `, {
    stroke: '#2F3640',
    strokeWidth: 1,
    roughness: 0.7,
    fill: '#E8A87C',
    fillStyle: 'solid',
  });
  svg.appendChild(thumb);

  // Click marks
  const mark1 = rc.line(18, 4, 22, 2, {
    stroke: '#CD6853',
    strokeWidth: 1.5,
    roughness: 0.8,
  });
  svg.appendChild(mark1);

  const mark2 = rc.line(19, 8, 24, 7, {
    stroke: '#CD6853',
    strokeWidth: 1.5,
    roughness: 0.8,
  });
  svg.appendChild(mark2);

  return { svg, hotspot: { x: 12, y: 2 } };
};
