/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;
