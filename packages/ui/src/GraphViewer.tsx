import React, { useEffect, useRef } from 'react';
import { renderGraph, GraphData } from '@kg/graph';
import gsap from 'gsap';

interface GraphViewerProps {
  data: GraphData;
}

const GraphViewer: React.FC<GraphViewerProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cy = renderGraph(containerRef.current, data);
      gsap.fromTo(
        containerRef.current.querySelectorAll('.cy-node'),
        { opacity: 0 },
        { opacity: 1, duration: 1 }
      );
    }
  }, [data]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default GraphViewer;