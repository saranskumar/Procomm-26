import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/Procomm-26" : "",

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
