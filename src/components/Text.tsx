import React from 'react';

export const Text: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Translucent background
        padding: '20px',
        borderRadius: '10px',
        fontSize: '18px',
        maxWidth: '500px',
        textAlign: 'center',
        color: '#000000',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
      }}
    >
      <h2>What if the Kargil War had never happened?</h2>
      <p>
        India might have avoided the military tensions and diverted resources toward economic development, potentially accelerating growth in infrastructure and other critical sectors.
      </p>
    </div>
  );
};
