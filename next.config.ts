import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	// Povolení vývojářského HMR ze sítě
	allowedDevOrigins: ["192.168.68.52", "localhost"]
};

export default nextConfig;
