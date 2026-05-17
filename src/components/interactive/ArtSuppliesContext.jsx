"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Tool definitions
export const TOOLS = {
  pencil: {
    id: 'pencil',
    name: 'Pencil',
    emoji: '✏️',
    message: 'back to basics ✏️',
    // Trail properties
    lineWidth: 1.5,
    opacity: 0.15,
    fadeTime: 4000,
    roughness: 1.2,
    velocityEffect: 0.8, // How much velocity affects width (0-1)
  },
  marker: {
    id: 'marker',
    name: 'Marker',
    emoji: '🖊️',
    message: 'time to make a statement!',
    lineWidth: 12, // Wider for highlighter feel
    opacity: 0.35,
    fadeTime: 5000,
    roughness: 0.3,
    velocityEffect: 0.3,
  },
  watercolor: {
    id: 'watercolor',
    name: 'Watercolor',
    emoji: '🎨',
    message: 'let it flow... 🌊',
    lineWidth: 20, // Much wider brush
    opacity: 0.2,
    fadeTime: 6000,
    roughness: 0.5,
    velocityEffect: 0.5,
    blur: 25, // Increased blur for soft edges
  },
  crayon: {
    id: 'crayon',
    name: 'Crayon',
    emoji: '🖍️',
    message: 'channeling your inner child 🖍️',
    lineWidth: 10, // Thicker for waxy feel
    opacity: 0.35,
    fadeTime: 4500,
    roughness: 2,
    velocityEffect: 0.6,
    texture: true, // Special: gaps/texture
  },
};

// Color definitions (pastel palette)
export const COLORS = {
  graphite: {
    id: 'graphite',
    name: 'Graphite',
    hex: '#718093',
  },
  persimmon: {
    id: 'persimmon',
    name: 'Soft Persimmon',
    hex: '#E8A5A5',
  },
  bamboo: {
    id: 'bamboo',
    name: 'Soft Bamboo',
    hex: '#A8D4A8',
  },
  rain: {
    id: 'rain',
    name: 'Soft Rain',
    hex: '#A8C4D9',
  },
  koi: {
    id: 'koi',
    name: 'Soft Koi',
    hex: '#F0D9B5',
  },
};

// Color messages
const COLOR_MESSAGES = [
  'ooh, nice choice!',
  'that color suits you',
  'now we\'re painting!',
  'beautiful pick!',
];

// Easter egg messages
const IDLE_HINTS = [
  'psst... hold anywhere for a surprise',
  'have you found all the art supplies yet?',
  'try holding down... magic awaits ✨',
];

// Context
const ArtSuppliesContext = createContext(null);

// Provider component
export const ArtSuppliesProvider = ({ children }) => {
  const [currentTool, setCurrentTool] = useState(TOOLS.pencil);
  const [currentColor, setCurrentColor] = useState(COLORS.graphite);
  const [toast, setToast] = useState(null);
  const [showToolMenu, setShowToolMenu] = useState(false);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [toolsUsed, setToolsUsed] = useState(new Set(['pencil']));
  const [hasUnlockedStudio, setHasUnlockedStudio] = useState(false);
  const [idleHintShown, setIdleHintShown] = useState(false);

  // Show toast notification
  const showToast = useCallback((message, duration = 2000) => {
    setToast(message);
    setTimeout(() => setToast(null), duration);
  }, []);

  // Select tool
  const selectTool = useCallback((toolId) => {
    const tool = TOOLS[toolId];
    if (tool && tool.id !== currentTool.id) {
      setCurrentTool(tool);
      showToast(tool.message);

      // Track tools used for easter egg
      setToolsUsed(prev => {
        const newSet = new Set(prev);
        newSet.add(toolId);
        return newSet;
      });
    }
    setShowToolMenu(false);
  }, [currentTool.id, showToast]);

  // Select color
  const selectColor = useCallback((colorId) => {
    const color = COLORS[colorId];
    if (color && color.id !== currentColor.id) {
      setCurrentColor(color);
      const randomMessage = COLOR_MESSAGES[Math.floor(Math.random() * COLOR_MESSAGES.length)];
      showToast(randomMessage);
    }
    setShowColorPalette(false);
  }, [currentColor.id, showToast]);

  // Open tool menu at position
  const openToolMenu = useCallback((x, y) => {
    setMenuPosition({ x, y });
    setShowToolMenu(true);
    setShowColorPalette(false);
  }, []);

  // Open color palette at position
  const openColorPalette = useCallback((x, y) => {
    setMenuPosition({ x, y });
    setShowColorPalette(true);
    setShowToolMenu(false);
  }, []);

  // Close all menus
  const closeMenus = useCallback(() => {
    setShowToolMenu(false);
    setShowColorPalette(false);
  }, []);

  // Check for "all tools used" easter egg
  useEffect(() => {
    if (toolsUsed.size === 4 && !hasUnlockedStudio) {
      setHasUnlockedStudio(true);
      setTimeout(() => {
        showToast('🎨 You\'ve unlocked the full art studio!', 3000);
      }, 500);
    }
  }, [toolsUsed, hasUnlockedStudio, showToast]);

  // Idle hint timer
  useEffect(() => {
    if (idleHintShown) return;

    const timer = setTimeout(() => {
      const hint = IDLE_HINTS[Math.floor(Math.random() * IDLE_HINTS.length)];
      showToast(hint, 4000);
      setIdleHintShown(true);
    }, 30000); // 30 seconds idle

    return () => clearTimeout(timer);
  }, [idleHintShown, showToast]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();

      // Tool shortcuts
      if (key === 'p') selectTool('pencil');
      else if (key === 'm') selectTool('marker');
      else if (key === 'w') selectTool('watercolor');
      else if (key === 'c') selectTool('crayon');

      // Color shortcuts
      else if (key === '1') selectColor('graphite');
      else if (key === '2') selectColor('persimmon');
      else if (key === '3') selectColor('bamboo');
      else if (key === '4') selectColor('rain');
      else if (key === '5') selectColor('koi');
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [selectTool, selectColor]);

  const value = {
    // State
    currentTool,
    currentColor,
    toast,
    showToolMenu,
    showColorPalette,
    menuPosition,
    toolsUsed,
    hasUnlockedStudio,

    // Actions
    selectTool,
    selectColor,
    openToolMenu,
    openColorPalette,
    closeMenus,
    showToast,

    // Data
    TOOLS,
    COLORS,
  };

  return (
    <ArtSuppliesContext.Provider value={value}>
      {children}
    </ArtSuppliesContext.Provider>
  );
};

// Hook to use context
export const useArtSupplies = () => {
  const context = useContext(ArtSuppliesContext);
  if (!context) {
    throw new Error('useArtSupplies must be used within an ArtSuppliesProvider');
  }
  return context;
};

export default ArtSuppliesContext;
