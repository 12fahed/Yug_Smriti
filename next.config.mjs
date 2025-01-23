/** @type {import('next').NextConfig} */
import path from "path";
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
      },
    ],
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
  webpack: (config) => {
    // Resolve aliases
    config.resolve.alias["@"] = "/src";

    config.resolve.extensions.push('.glb')

    // Add support for .glb files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource'
    });

    return config;
  },
};

export default nextConfig;