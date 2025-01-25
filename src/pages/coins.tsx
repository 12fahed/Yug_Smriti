import React from 'react';
import dynamic from 'next/dynamic';
import Coin3D from '../components/Coin3D';

// Dynamically load the Coin3D component to ensure it works with SSR
// const Coin3D = dynamic(() => import('../components/Coin3D'), { ssr: false });

const CoinsPage: React.FC = () => {
  return (
    <div>
      <Coin3D />
    </div>
  );
};

export default CoinsPage;
