/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: '/hejo',
  // assetPrefix: '/hejo_static/',
  experimental: {
    appDir: true,
  },
  // serverComponentsExternalPackages: ["prisma", "@prisma/client"],
  async rewrites() {
    const ret = [
      {
        source: "/api/proxy/:path*",
        destination: "https://api.openai.com/:path*",
      },
      {
        source: "/google-fonts/:path*",
        destination: "https://fonts.googleapis.com/:path*",
      },
    ];

    const apiUrl = process.env.API_URL;
    if (apiUrl) {
      console.log("[Next] using api url ", apiUrl);
      ret.push({
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`,
      });
    }

    return {
      beforeFiles: ret,
    };
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qcloud.dpfile.com',
        port: "",
        pathname: "**"
      },
    ]
  },
  transpilePackages: ["antd-mobile"],

  output: "standalone",
};

export default nextConfig;
