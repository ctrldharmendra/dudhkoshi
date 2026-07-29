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
          {
        protocol: "https",
        hostname: "dudhkoshi.gyanbato.com",
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
            // : "https://api.aayumalunhydro.com.np/api/:path*",
            : "http://localhost:5001/api/:path*",
      },
            {
        source: "/uploads/:path*",
        destination: "http://localhost:5001/uploads/:path*",
      },
    ];
  },

};

export default nextConfig;