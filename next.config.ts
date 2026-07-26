import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow ngrok tunnel for mobile testing (gyroscope requires HTTPS)
  allowedDevOrigins: [
    "*.ngrok-free.app",
    "*.ngrok.io",
  ],
};

export default nextConfig;
