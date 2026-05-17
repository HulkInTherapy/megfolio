"use client";

import React, { useState, useEffect } from 'react';
import CoffeeCupDoodle from './CoffeeCupDoodle';
import TerminalDoodle from './TerminalDoodle';
import CodeBracketsDoodle from './CodeBracketsDoodle';
import LightbulbDoodle from './LightbulbDoodle';
import RocketDoodle from './RocketDoodle';
import BugDoodle from './BugDoodle';
import GearDoodle from './GearDoodle';
import GitBranchDoodle from './GitBranchDoodle';

/**
 * Doodle configuration for each section
 * Each section can have doodles in left and/or right margins
 */
const sectionDoodles = {
  hero: {
    left: { Component: LightbulbDoodle, size: 55, top: 80, rotation: -5 },
    right: { Component: CoffeeCupDoodle, size: 55, top: 150, rotation: 3 },
  },
  experience: {
    left: { Component: TerminalDoodle, size: 75, top: 60, rotation: -2 },
    right: { Component: GearDoodle, size: 50, top: 180, rotation: 0 },
  },
  projects: {
    left: { Component: CodeBracketsDoodle, size: 60, top: 100, rotation: -3 },
    right: { Component: RocketDoodle, size: 50, top: 50, rotation: 5 },
  },
  blog: {
    left: { Component: LightbulbDoodle, size: 45, top: 80, rotation: 8 },
    right: { Component: GitBranchDoodle, size: 60, top: 120, rotation: -2 },
  },
  contact: {
    left: { Component: BugDoodle, size: 50, top: 40, rotation: -5 },
    right: { Component: CoffeeCupDoodle, size: 50, top: 100, rotation: 4 },
  },
};

/**
 * SectionDoodles - Places decorative doodles in section margins
 * Hidden on mobile (< 1100px to ensure enough margin space)
 */
const SectionDoodles = ({ section }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Need at least 1100px to show margin doodles (800px content + 150px each side)
      setIsMobile(window.innerWidth < 1100);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  const config = sectionDoodles[section];
  if (!config) return null;

  return (
    <div
      className="section-doodles"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 2,
      }}
      aria-hidden="true"
    >
      {config.left && (
        <div
          style={{
            position: 'absolute',
            left: 'calc(50% - 480px)',
            top: config.left.top,
            transform: `rotate(${config.left.rotation}deg)`,
            pointerEvents: 'auto',
          }}
        >
          <config.left.Component size={config.left.size} />
        </div>
      )}
      {config.right && (
        <div
          style={{
            position: 'absolute',
            right: 'calc(50% - 480px)',
            top: config.right.top,
            transform: `rotate(${config.right.rotation}deg)`,
            pointerEvents: 'auto',
          }}
        >
          <config.right.Component size={config.right.size} />
        </div>
      )}
    </div>
  );
};

export default SectionDoodles;
