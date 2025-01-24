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
    domains: ['res.cloudinary.com', 'images.unsplash.com', 'simple.wikipedia.org', 'upload.wikimedia.org'],
  },
  webpack: (config) => {
    // Resolve aliases
    config.resolve.alias["@"] = "/src"; // Adjust the path as needed
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
