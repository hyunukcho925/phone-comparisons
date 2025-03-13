/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rovdcewcphlrygwiozip.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
