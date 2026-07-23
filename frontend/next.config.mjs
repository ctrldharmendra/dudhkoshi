// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [

//         {
//         protocol: 'https',
//         hostname: 'randomuser.me',
//       },
//      { protocol: 'http',
//       hostname: 'localhost',}
//     ],
//   },
// };
// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
  {
      protocol: "http",
      hostname: "localhost",
      port: "5001",
    },
    ],
  },


  // Proxy API requests to backend
  async rewrites() {
    return [
      {
        source: "/api/:path*",

        // Local development
        destination:
          process.env.NODE_ENV === "development"
            ? "http://localhost:5001/api/:path*"

            // Production backend
            : "https://test.aayumalunhydro.com.np/api/:path*",
      },
    ];
  },

};

export default nextConfig;