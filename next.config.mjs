/** @type {import('next').NextConfig} */
const nextConfig = {
  // URLs del WordPress viejo que Google tiene indexadas
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/home/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
