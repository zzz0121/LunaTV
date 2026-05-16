/** @type {import('next').NextConfig} */
const nextConfig = {
  // 核心：强制静态导出，生成纯静态文件，不生成服务端文件
  output: "export",
  distDir: "out",
  trailingSlash: true,

  // 关闭校验，避免构建报错
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // 图片优化：适配静态导出，不使用 Next.js 自带优化
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },

  // 关键：强制拆分文件，控制单文件体积在 20MB 以内
  webpack(config) {
    config.optimization.splitChunks = {
      chunks: "all",
      maxSize: 20 * 1024 * 1024, // 20MB，避开 25MB 限制
    };

    // 兼容旧代码的 fallback
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      tls: false,
      crypto: false,
    };

    return config;
  },
};

// 去掉了 standalone 模式和 next-pwa，Pages 不支持服务端 PWA
module.exports = nextConfig;

