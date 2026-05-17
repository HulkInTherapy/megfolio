"use client";

import { useLayoutEffect, useRef, useContext, useMemo } from 'react';
import ArtSuppliesContext from './interactive/ArtSuppliesContext';
import {
  CURSORS,
  getColoredMarkerCursor,
  getColoredWatercolorCursor,
  getColoredCrayonCursor,
} from './cursors/prebuiltCursors';

const PencilCursor = () => {
  const context = useContext(ArtSuppliesContext);

  const currentTool = context?.currentTool || { id: 'pencil' };
  const currentColor = context?.currentColor || { hex: '#718093' };

  const lastToolRef = useRef(null);
  const lastColorRef = useRef(null);
  const isInitializedRef = useRef(false);

  const cursor = useMemo(() => {
    switch (currentTool.id) {
      case 'marker':
        return getColoredMarkerCursor(currentColor.hex);
      case 'watercolor':
        return getColoredWatercolorCursor(currentColor.hex);
      case 'crayon':
        return getColoredCrayonCursor(currentColor.hex);
      case 'pencil':
      default:
        return CURSORS.pencil;
    }
  }, [currentTool.id, currentColor.hex]);

  const hand = CURSORS.pointing;

  useLayoutEffect(() => {
    if (isInitializedRef.current &&
        lastToolRef.current === currentTool.id &&
        lastColorRef.current === currentColor.hex) {
      return;
    }

    isInitializedRef.current = true;
    lastToolRef.current = currentTool.id;
    lastColorRef.current = currentColor.hex;

    document.body.style.cursor = `url('${cursor.url}') ${cursor.hotspot.x} ${cursor.hotspot.y}, auto`;

    const existingStyle = document.getElementById('custom-cursor-styles');
    if (existingStyle) {
      existingStyle.remove();
    }

    const styleEl = document.createElement('style');
    styleEl.id = 'custom-cursor-styles';
    styleEl.textContent = `
      a, button, [role="button"], [onclick], .paper-lift, .contact-link,
      input[type="submit"], input[type="button"], select,
      [tabindex]:not([tabindex="-1"]), .clickable {
        cursor: url('${hand.url}') ${hand.hotspot.x} ${hand.hotspot.y}, pointer !important;
      }
      a:hover, button:hover, [role="button"]:hover, .paper-lift:hover {
        cursor: url('${hand.url}') ${hand.hotspot.x} ${hand.hotspot.y}, pointer !important;
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      document.body.style.cursor = 'auto';
      const style = document.getElementById('custom-cursor-styles');
      if (style) style.remove();
    };
  }, [currentTool.id, currentColor.hex, cursor, hand]);

  return null;
};

export default PencilCursor;
