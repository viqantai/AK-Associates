/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // static site — generates /out folder
  images: { unoptimized: true }, // required for static export with <Image>
};

export default nextConfig;