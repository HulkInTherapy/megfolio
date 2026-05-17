const toDataUrl = (svgString) => {
  const base64 = typeof btoa !== 'undefined'
    ? btoa(unescape(encodeURIComponent(svgString)))
    : Buffer.from(svgString).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
};

const PENCIL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <polygon points="4,28 8,20 24,4 28,8 12,24" fill="#E8A87C" stroke="#2F3640" stroke-width="1" stroke-linejoin="round"/>
  <polygon points="4,28 8,20 12,24" fill="#D4A574" stroke="#2F3640" stroke-width="1"/>
  <polygon points="4,28 6,24 10,26" fill="#2F3640" stroke="#2F3640" stroke-width="0.8"/>
  <line x1="20" y1="8" x2="24" y2="12" stroke="#718093" stroke-width="2" stroke-linecap="round"/>
  <polygon points="24,4 28,8 26,10 22,6" fill="#CD6853" stroke="#2F3640" stroke-width="1"/>
</svg>`;

const MARKER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <polygon points="8,28 4,12 10,4 22,4 28,12 24,28" fill="#FAFAFA" stroke="#2F3640" stroke-width="1.2" stroke-linejoin="round"/>
  <polygon points="10,4 22,4 24,8 8,8" fill="#718093" stroke="#2F3640" stroke-width="1"/>
  <polygon points="10,28 22,28 18,32 14,32" fill="#718093" stroke="#2F3640" stroke-width="1"/>
  <line x1="12" y1="16" x2="20" y2="16" stroke="#DDDDDD" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const WATERCOLOR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <polygon points="14,2 18,2 17,12 15,12" fill="#D4A574" stroke="#2F3640" stroke-width="1" stroke-linejoin="round"/>
  <polygon points="13,12 19,12 18,16 14,16" fill="#B0B0B0" stroke="#2F3640" stroke-width="1"/>
  <path d="M14,16 Q10,22 10,28 Q16,30 22,28 Q22,22 18,16 Z" fill="#A8C4D9" stroke="#2F3640" stroke-width="1"/>
  <line x1="13" y1="18" x2="12" y2="26" stroke="#2F3640" stroke-width="0.5" opacity="0.5"/>
  <line x1="16" y1="18" x2="16" y2="26" stroke="#2F3640" stroke-width="0.5" opacity="0.5"/>
  <line x1="19" y1="18" x2="20" y2="26" stroke="#2F3640" stroke-width="0.5" opacity="0.5"/>
  <ellipse cx="22" cy="22" rx="2" ry="2.5" fill="#87CEEB" stroke="#87CEEB" stroke-width="0.8"/>
</svg>`;

const CRAYON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect x="10" y="4" width="12" height="20" rx="1" fill="#E8A5A5" stroke="#2F3640" stroke-width="1"/>
  <rect x="10" y="8" width="12" height="12" fill="#FDFBF7" stroke="#2F3640" stroke-width="0.8"/>
  <path d="M10,8 Q13,7 16,8 Q19,7 22,8" fill="none" stroke="#2F3640" stroke-width="0.8"/>
  <line x1="12" y1="12" x2="20" y2="12" stroke="#CCCCCC" stroke-width="1"/>
  <line x1="12" y1="15" x2="20" y2="15" stroke="#CCCCCC" stroke-width="1"/>
  <path d="M10,24 L10,26 Q13,30 16,30 Q19,30 22,26 L22,24 Z" fill="#E8A5A5" stroke="#2F3640" stroke-width="1"/>
</svg>`;

const POINTING_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <path d="M10,4 Q11,2 13,2 Q15,2 15,4 L15,12 L10,12 Z" fill="#E8A87C" stroke="#2F3640" stroke-width="1.2"/>
  <path d="M11,4 Q12.5,3 14,4" fill="none" stroke="#CD6853" stroke-width="1.5"/>
  <path d="M15,12 L17,10 Q19,9 20,11 L18,14 L15,14" fill="#E8A87C" stroke="#2F3640" stroke-width="1.2"/>
  <path d="M18,14 L20,13 Q22,12 22,15 L20,17 L17,17" fill="#E8A87C" stroke="#2F3640" stroke-width="1.2"/>
  <path d="M20,17 L21,16 Q23,16 22,19 L20,20 L17,20" fill="#E8A87C" stroke="#2F3640" stroke-width="1.2"/>
  <path d="M10,12 L10,22 Q10,26 14,26 L18,26 Q22,26 22,22 L22,19 L17,20 L17,17 L17,14 L15,14 L15,12 Z" fill="#E8A87C" stroke="#2F3640" stroke-width="1.2"/>
  <path d="M10,16 Q6,17 6,20 Q6,23 9,23 L10,22" fill="#E8A87C" stroke="#2F3640" stroke-width="1.2"/>
  <line x1="6" y1="3" x2="4" y2="1" stroke="#CD6853" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="18" y1="3" x2="20" y2="1" stroke="#CD6853" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

const createColoredSvg = (baseSvg, color, fillTarget) => {
  return baseSvg.replace(new RegExp(fillTarget, 'g'), color);
};

export const CURSORS = {
  pencil: { url: toDataUrl(PENCIL_SVG), hotspot: { x: 4, y: 28 } },
  marker: { url: toDataUrl(MARKER_SVG), hotspot: { x: 16, y: 32 } },
  watercolor: { url: toDataUrl(WATERCOLOR_SVG), hotspot: { x: 16, y: 28 } },
  crayon: { url: toDataUrl(CRAYON_SVG), hotspot: { x: 16, y: 30 } },
  pointing: { url: toDataUrl(POINTING_SVG), hotspot: { x: 12, y: 2 } },
};

export const getColoredMarkerCursor = (color) => ({
  url: toDataUrl(createColoredSvg(MARKER_SVG, color, '#718093')),
  hotspot: { x: 16, y: 32 },
});

export const getColoredWatercolorCursor = (color) => ({
  url: toDataUrl(createColoredSvg(WATERCOLOR_SVG, color, '#A8C4D9')),
  hotspot: { x: 16, y: 28 },
});

export const getColoredCrayonCursor = (color) => ({
  url: toDataUrl(createColoredSvg(CRAYON_SVG, color, '#E8A5A5')),
  hotspot: { x: 16, y: 30 },
});
