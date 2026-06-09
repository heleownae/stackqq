import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // GitHub Actions 배포 시에만 basePath 적용 (로컬은 localhost:3000/ 그대로)
  basePath: process.env.GITHUB_ACTIONS === 'true' ? '/stackqq' : '',
};

export default nextConfig;
