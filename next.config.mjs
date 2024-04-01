/** @type {import('next').NextConfig} */
const nextConfig = {
	redirects() {
		return [
			{
				source: "/boards",
				destination: "/",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
