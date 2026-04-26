/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ppukvlevivjjlimcxqxe.supabase.co",
        pathname: "/storage/v1/object/public/game-photos/**",
      },
    ],
  },
};

module.exports = nextConfig;
