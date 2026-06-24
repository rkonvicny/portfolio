import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Povolení vývojářského HMR ze sítě
	allowedDevOrigins: ["192.168.68.52", "localhost"],
	async headers() {
		return [
			{
				// Aplikovat na všechny API routes
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{ key: "Access-Control-Allow-Origin", value: "*" }, // případně "http://192.168.68.52:3000"
					{
						key: "Access-Control-Allow-Methods",
						value: "GET,OPTIONS,PATCH,DELETE,POST,PUT"
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
					}
				]
			}
		];
	}
};

export default nextConfig;
