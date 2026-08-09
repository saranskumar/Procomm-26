import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Procomm-26",

  images: {
    unoptimized: true,
  },

  // Allow ngrok tunnel for mobile testing (gyroscope requires HTTPS)
  allowedDevOrigins: [
    "*.ngrok-free.app",
    "*.ngrok.io",
  ],
};

export default nextConfig;
