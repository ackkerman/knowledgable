'use client';
import React from 'react';
import { GraphViewer } from '@kg/ui';
import Button from '../components/ui/button';

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Knowledge Graph Tool</h1>
      <p>Welcome to the Knowledge Graph Tool.</p>
      <Button className="mt-4">Click me</Button>
      <div className="w-full h-64 mt-4">
        <GraphViewer data={{ nodes: [], edges: [] }} />
      </div>
    </main>
  );
}
