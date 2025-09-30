// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',               // генерировать статический /out
  images: { unoptimized: true },  // если где-то используешь <Image>
};
export default nextConfig;
