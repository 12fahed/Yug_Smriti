import React, { useEffect, useState } from "react";
import Image from "next/image";

// Text Component
interface TextProps {
  title: string;
  content: string;
}

const Text: React.FC<TextProps> = ({ title, content }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(255, 255, 255, 0.6)", // Translucent background
        padding: "20px",
        borderRadius: "10px",
        fontSize: "18px",
        maxWidth: "500px",
        textAlign: "center",
        color: "#000000",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
        opacity: 0,
        animation: "fadeIn 2s forwards", // Fades in when visible
      }}
    >
      <h2>
        <strong>{title}</strong>
      </h2>
      <p>{content}</p>
    </div>
  );
};

// AnimatedClouds Component
interface AnimatedCloudsProps {
  title: string;
  content: string;
  onClose: () => void; // Callback to notify parent when closed
}

const AnimatedClouds: React.FC<AnimatedCloudsProps> = ({ title, content, onClose }) => {
  const [cloud1Translate, setCloud1Translate] = useState("-translate-x-full");
  const [cloud2Translate, setCloud2Translate] = useState("translate-x-full");
  const [isAnimating, setIsAnimating] = useState(true);
  const [showText, setShowText] = useState(false); // Toggle text visibility

  useEffect(() => {
    // Cloud animation timing
    const animateClouds = setTimeout(() => {
      setCloud1Translate("translate-x-0");
      setCloud2Translate("translate-x-0");
      setIsAnimating(false); // Clouds have finished animating
      setShowText(true); // Show text immediately after clouds finish animating
    }, 10000); // Start cloud animation

    return () => {
      clearTimeout(animateClouds);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen z-50 transition-colors duration-1000 ${isAnimating ? "bg-transparent" : "bg-black/30"}`}
    >
      {/* Close Button */}
      {!isAnimating && (
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "white",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          fontSize: "20px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        ✕
      </button>
    )}

      {/* Cloud 1 */}
      <div
        className={`absolute top-1/4 left-0 transition-transform duration-[10000ms] ease-in-out ${cloud1Translate}`}
      >
        <Image
          src="/cloud.png"
          alt="Cloud 1"
          width={1000}
          height={1000}
        />
      </div>

      {/* Cloud 2 */}
      <div
        className={`absolute top-1/4 right-0 transition-transform duration-[10000ms] ease-in-out ${cloud2Translate}`}
      >
        <Image
          src="/cloud2.png"
          alt="Cloud 2"
          width={1000}
          height={1000}
        />
      </div>

      {/* Display Text after animation */}
      {showText && <Text title={title} content={content} />}
    </div>
  );
};

export default AnimatedClouds;
