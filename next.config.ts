import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	// Povolení vývojářského HMR ze sítě
	allowedDevOrigins: ["localhost", "192.168.68.52"]
};

export default nextConfig;
