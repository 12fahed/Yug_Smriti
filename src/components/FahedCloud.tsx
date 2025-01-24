export default function FogOverlay() {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-5 backdrop-filter">
      {/* Background */}

      {/* Fog Container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Fog Layer 1 - Slow */}
        <div
          className="absolute h-full w-[200vw] bg-repeat-x bg-contain bg-center animate-marquee"
          style={{ backgroundImage: 'url(/fog-1.png)' }}
        ></div>
        {/* Fog Layer 2 - Fast */}
        <div
          className="absolute h-full w-[200vw] bg-repeat-x bg-contain bg-center animate-marquee"
          style={{ backgroundImage: 'url(/fog-2.png)' }}
        ></div>
      </div>

      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <h1 className="text-white text-5xl font-bold uppercase tracking-widest">In the Fog</h1>
      </div>
    </div>
  );
}
