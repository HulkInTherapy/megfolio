/**
 * Imperfection Utilities - Wabi-Sabi design system
 * Creates intentional imperfections for a hand-drawn, human feel
 */

// Rotation library - small random rotations for elements
export const ROTATIONS = [-3, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 3];

/**
 * Get a random rotation value from the library
 * @param {number} seed - Optional seed for consistent results
 * @returns {number} Rotation in degrees
 */
export const getRandomRotation = (seed = null) => {
  if (seed !== null) {
    // Use seed for consistent rotation (based on element id/index)
    const index = Math.abs(seed) % ROTATIONS.length;
    return ROTATIONS[index];
  }
  return ROTATIONS[Math.floor(Math.random() * ROTATIONS.length)];
};

/**
 * Get a subtle rotation for less dramatic effect
 * @param {number} seed - Optional seed
 * @returns {number} Rotation between -1.5 and 1.5 degrees
 */
export const getSubtleRotation = (seed = null) => {
  const subtle = [-1.5, -1, -0.5, 0.5, 1, 1.5];
  if (seed !== null) {
    const index = Math.abs(seed) % subtle.length;
    return subtle[index];
  }
  return subtle[Math.floor(Math.random() * subtle.length)];
};

/**
 * Generate a wobble offset for baseline variations in text
 * @param {number} index - Character index
 * @param {number} intensity - Wobble intensity (default 2)
 * @returns {number} Y offset in pixels
 */
export const getWobbleOffset = (index, intensity = 2) => {
  // Use sine wave with varying frequency for natural wobble
  return Math.sin(index * 0.8) * intensity;
};

/**
 * Generate letter spacing variation for handwritten feel
 * @param {number} index - Character index
 * @param {number} base - Base letter spacing in pixels
 * @returns {number} Letter spacing in pixels
 */
export const getLetterSpacingVariation = (index, base = 0) => {
  const variation = Math.sin(index * 1.2) * 0.5;
  return base + variation;
};

/**
 * Get a random position offset for scattered elements
 * @param {number} maxOffset - Maximum offset in pixels
 * @returns {{x: number, y: number}} Position offset
 */
export const getScatterOffset = (maxOffset = 10) => {
  return {
    x: (Math.random() - 0.5) * maxOffset * 2,
    y: (Math.random() - 0.5) * maxOffset * 2,
  };
};

/**
 * Get transform string for imperfect element
 * @param {Object} options - Configuration options
 * @param {number} options.rotation - Rotation in degrees
 * @param {number} options.translateX - X offset in pixels
 * @param {number} options.translateY - Y offset in pixels
 * @param {number} options.scale - Scale factor
 * @returns {string} CSS transform string
 */
export const getImperfectTransform = ({
  rotation = 0,
  translateX = 0,
  translateY = 0,
  scale = 1,
} = {}) => {
  const parts = [];
  if (translateX !== 0 || translateY !== 0) {
    parts.push(`translate(${translateX}px, ${translateY}px)`);
  }
  if (rotation !== 0) {
    parts.push(`rotate(${rotation}deg)`);
  }
  if (scale !== 1) {
    parts.push(`scale(${scale})`);
  }
  return parts.join(' ') || 'none';
};

/**
 * Generate style object for imperfect element
 * @param {number} seed - Seed for consistent imperfection
 * @param {Object} options - Configuration options
 * @returns {Object} Style object with transform
 */
export const getImperfectStyle = (seed, options = {}) => {
  const {
    includeRotation = true,
    includeOffset = false,
    maxOffset = 5,
    subtle = false,
  } = options;

  const rotation = includeRotation
    ? subtle
      ? getSubtleRotation(seed)
      : getRandomRotation(seed)
    : 0;

  const offset = includeOffset ? getScatterOffset(maxOffset) : { x: 0, y: 0 };

  return {
    transform: getImperfectTransform({
      rotation,
      translateX: offset.x,
      translateY: offset.y,
    }),
  };
};

/**
 * Hash function for generating consistent seeds from strings
 * @param {string} str - String to hash
 * @returns {number} Hash value
 */
export const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

/**
 * Get imperfect border radius values for sketchy boxes
 * @param {number} base - Base radius in pixels
 * @param {number} variation - Max variation in pixels
 * @returns {string} CSS border-radius value
 */
export const getImperfectBorderRadius = (base = 8, variation = 4) => {
  const corners = Array.from({ length: 4 }, () => {
    const offset = (Math.random() - 0.5) * variation * 2;
    return Math.max(0, base + offset);
  });
  return corners.map((r) => `${r}px`).join(' ');
};

/**
 * Generate a path with wobbly lines (for SVG)
 * @param {number} x1 - Start X
 * @param {number} y1 - Start Y
 * @param {number} x2 - End X
 * @param {number} y2 - End Y
 * @param {number} wobble - Wobble intensity
 * @returns {string} SVG path d attribute
 */
export const getWobblyPath = (x1, y1, x2, y2, wobble = 2) => {
  const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * wobble;
  const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * wobble;
  const ctrl1X = (x1 + midX) / 2 + (Math.random() - 0.5) * wobble;
  const ctrl1Y = (y1 + midY) / 2 + (Math.random() - 0.5) * wobble;
  const ctrl2X = (midX + x2) / 2 + (Math.random() - 0.5) * wobble;
  const ctrl2Y = (midY + y2) / 2 + (Math.random() - 0.5) * wobble;

  return `M ${x1} ${y1} Q ${ctrl1X} ${ctrl1Y}, ${midX} ${midY} Q ${ctrl2X} ${ctrl2Y}, ${x2} ${y2}`;
};

export default {
  ROTATIONS,
  getRandomRotation,
  getSubtleRotation,
  getWobbleOffset,
  getLetterSpacingVariation,
  getScatterOffset,
  getImperfectTransform,
  getImperfectStyle,
  hashString,
  getImperfectBorderRadius,
  getWobblyPath,
};
