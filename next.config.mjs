/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  distDir: "build",
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/login",
  //       permanent: true,
  //     },
  //   ];
  // },
  env: {
    customKey: "ahsodhn234u9kmdnshf98ueeqa354",
    BASE_URL: "http://localhost:3001/vmsdev",
  },
};

export default nextConfig;
