/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lafab.com.co",
      },
      {
        protocol: "https",
        hostname: "staging.lafab.com.co",
      },
      {
        protocol: "https",
        hostname: "cms.lafab.com.co",
      },
    ],
  },
};

export default nextConfig;
