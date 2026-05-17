"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ArtSuppliesProvider } from './ArtSuppliesContext';
import { preloadRough } from '@/lib/rough';

const PencilCursor = dynamic(() => import('../PencilCursor'), { ssr: false });
const PencilTrailCanvas = dynamic(() => import('./PencilTrailCanvas'), { ssr: false });
const IdleDoodles = dynamic(() => import('./IdleDoodles'), { ssr: false });
const RadialToolMenu = dynamic(() => import('./RadialToolMenu'), { ssr: false });
const ToolToast = dynamic(() => import('./ToolToast'), { ssr: false });

const ClientShell = ({ children }) => {
  const [overlaysReady, setOverlaysReady] = useState(false);

  useEffect(() => {
    preloadRough();
    const id = requestIdleCallback(() => setOverlaysReady(true), { timeout: 1500 });
    return () => cancelIdleCallback(id);
  }, []);

  return (
    <ArtSuppliesProvider>
      {children}
      {overlaysReady && (
        <>
          <PencilCursor />
          <RadialToolMenu />
          <ToolToast />
          <PencilTrailCanvas opacity={0.15} fadeTime={4000} strokeColor="#718093" />
          <IdleDoodles idleTime={6000} maxDoodles={3} doodleLifetime={15000} />
        </>
      )}
    </ArtSuppliesProvider>
  );
};

export default ClientShell;
