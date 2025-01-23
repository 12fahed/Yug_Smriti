"use client"
import React from 'react';
import dynamic from 'next/dynamic';

const CloudTextScene = dynamic(() => import('../components/CloudTextScene'), {
  ssr: false
});

const CloudScenePage: React.FC = () => {
  return <CloudTextScene />;
};

export default CloudScenePage;