"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useArtSupplies, TOOLS, COLORS } from './ArtSuppliesContext';

/**
 * RadialToolMenu - Appears on long-press, allows tool/color selection
 * Shows 4 tools in a circle around the cursor position
 */
const RadialToolMenu = () => {
  const {
    currentTool,
    currentColor,
    showToolMenu,
    showColorPalette,
    menuPosition,
    selectTool,
    selectColor,
    openToolMenu,
    openColorPalette,
    closeMenus,
  } = useArtSupplies();

  const [hoveredItem, setHoveredItem] = useState(null);
  const pressTimerRef = useRef(null);
  const longPressTimerRef = useRef(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const menuJustOpenedRef = useRef(false);

  // Tool icons (emoji for simplicity, could be SVG)
  const toolIcons = {
    pencil: '✏️',
    marker: '🖊️',
    watercolor: '🎨',
    crayon: '🖍️',
  };

  // Long press detection
  const handleMouseDown = useCallback((e) => {
    // Ignore if on interactive element
    if (e.target.closest('a, button, input, select, [role="button"]')) {
      return;
    }

    startPosRef.current = { x: e.clientX, y: e.clientY };

    // 500ms for tool menu
    pressTimerRef.current = setTimeout(() => {
      menuJustOpenedRef.current = true;
      openToolMenu(e.clientX, e.clientY);
    }, 500);

    // 1000ms for color palette
    longPressTimerRef.current = setTimeout(() => {
      menuJustOpenedRef.current = true;
      closeMenus();
      openColorPalette(e.clientX, e.clientY);
    }, 1000);
  }, [openToolMenu, openColorPalette, closeMenus]);

  const handleMouseUp = useCallback(() => {
    clearTimeout(pressTimerRef.current);
    clearTimeout(longPressTimerRef.current);
  }, []);

  const handleMouseMove = useCallback((e) => {
    // Cancel if moved too far
    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 10 && !showToolMenu && !showColorPalette) {
      clearTimeout(pressTimerRef.current);
      clearTimeout(longPressTimerRef.current);
    }
  }, [showToolMenu, showColorPalette]);

  // Touch events for mobile
  const handleTouchStart = useCallback((e) => {
    if (e.target.closest('a, button, input, select, [role="button"]')) {
      return;
    }

    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };

    pressTimerRef.current = setTimeout(() => {
      menuJustOpenedRef.current = true;
      openToolMenu(touch.clientX, touch.clientY);
    }, 500);

    longPressTimerRef.current = setTimeout(() => {
      menuJustOpenedRef.current = true;
      closeMenus();
      openColorPalette(touch.clientX, touch.clientY);
    }, 1000);
  }, [openToolMenu, openColorPalette, closeMenus]);

  const handleTouchEnd = useCallback(() => {
    clearTimeout(pressTimerRef.current);
    clearTimeout(longPressTimerRef.current);
  }, []);

  const handleTouchMove = useCallback((e) => {
    const touch = e.touches[0];
    const dx = touch.clientX - startPosRef.current.x;
    const dy = touch.clientY - startPosRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 10 && !showToolMenu && !showColorPalette) {
      clearTimeout(pressTimerRef.current);
      clearTimeout(longPressTimerRef.current);
    }
  }, [showToolMenu, showColorPalette]);

  // Right-click for color palette
  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    openColorPalette(e.clientX, e.clientY);
  }, [openColorPalette]);

  // Click outside to close (but not immediately after opening)
  const handleClick = useCallback((e) => {
    // Ignore if clicking on a menu button (they handle their own closing)
    if (e.target.closest('[data-radial-menu]')) {
      return;
    }

    // Ignore the first click right after menu opened (the mouseup from long-press)
    if (menuJustOpenedRef.current) {
      menuJustOpenedRef.current = false;
      return;
    }

    if (showToolMenu || showColorPalette) {
      closeMenus();
    }
  }, [showToolMenu, showColorPalette, closeMenus]);

  // Register event listeners
  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
      clearTimeout(pressTimerRef.current);
      clearTimeout(longPressTimerRef.current);
    };
  }, [handleMouseDown, handleMouseUp, handleMouseMove, handleTouchStart, handleTouchEnd, handleTouchMove, handleContextMenu, handleClick]);

  // Calculate item positions in a circle
  const getItemPosition = (index, total, radius) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  const tools = Object.values(TOOLS);
  const colors = Object.values(COLORS);

  if (!showToolMenu && !showColorPalette) return null;

  return (
    <div
      data-radial-menu
      style={{
        position: 'fixed',
        left: menuPosition.x,
        top: menuPosition.y,
        zIndex: 10000,
        pointerEvents: 'none',
      }}
    >
      {/* Tool Menu */}
      {showToolMenu && (
        <div
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Center indicator */}
          <div
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--paper)',
              border: '2px dashed var(--pencil)',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            {toolIcons[currentTool.id]}
          </div>

          {/* Tool buttons */}
          {tools.map((tool, index) => {
            const pos = getItemPosition(index, tools.length, 70);
            const isSelected = tool.id === currentTool.id;
            const isHovered = hoveredItem === tool.id;

            return (
              <button
                key={tool.id}
                onClick={(e) => {
                  e.stopPropagation();
                  selectTool(tool.id);
                }}
                onMouseEnter={() => setHoveredItem(tool.id)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  position: 'absolute',
                  left: pos.x,
                  top: pos.y,
                  transform: 'translate(-50%, -50%)',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: isSelected ? '3px solid var(--spark)' : '2px solid var(--pencil)',
                  background: isHovered ? 'var(--paper-aged)' : 'var(--paper)',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                  animation: 'popIn 0.2s ease forwards',
                  animationDelay: `${index * 0.05}s`,
                  opacity: 0,
                }}
                title={tool.name}
              >
                {toolIcons[tool.id]}
              </button>
            );
          })}
        </div>
      )}

      {/* Color Palette */}
      {showColorPalette && (
        <div
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Center - current color */}
          <div
            style={{
              position: 'absolute',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: currentColor.hex,
              border: '2px solid var(--ink)',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Color buttons */}
          {colors.map((color, index) => {
            const pos = getItemPosition(index, colors.length, 60);
            const isSelected = color.id === currentColor.id;
            const isHovered = hoveredItem === color.id;

            return (
              <button
                key={color.id}
                onClick={(e) => {
                  e.stopPropagation();
                  selectColor(color.id);
                }}
                onMouseEnter={() => setHoveredItem(color.id)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  position: 'absolute',
                  left: pos.x,
                  top: pos.y,
                  transform: 'translate(-50%, -50%)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: isSelected ? '3px solid var(--ink)' : '2px solid var(--pencil)',
                  background: color.hex,
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.2)' : '0 2px 6px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                  transform: `translate(-50%, -50%) scale(${isHovered ? 1.15 : 1})`,
                  animation: 'popIn 0.2s ease forwards',
                  animationDelay: `${index * 0.05}s`,
                  opacity: 0,
                }}
                title={color.name}
              />
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes popIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default RadialToolMenu;
