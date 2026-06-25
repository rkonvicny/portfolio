import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	// Povolení vývojářského HMR ze sítě
	allowedDevOrigins: ["localhost"]
};

export default nextConfig;
