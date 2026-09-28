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
        dangerouslyAllowLocalIP: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
  {
      protocol: "http",
      hostname: "localhost",
      port: "5001",
           pathname: '/uploads/**',
    },
  {
      protocol: "http",
      hostname: "localhost",
      port: "3000",
           pathname: '/uploads/**',
    },
  {
      protocol: "http",
      hostname: "127.0.0.1",
      port: "5001",
           pathname: '/uploads/**',
    },
  {
      protocol: "https",
      hostname: "thumbs.dreamstime.com",
    },
  {
      protocol: "https",
      hostname: "dudhkoshihydro.aayumalunhydro.com.np",
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
            : "https://dudhkoshihydro.aayumalunhydro.com.np/api/:path*",
      },
      //   {
      //   source: "/uploads/:path*",
      //   destination: "https://dudhkoshihydro.aayumalunhydro.com.np/uploads/:path*",
      // },
            {
        source: "/uploads/:path*",

        // Local development
        destination:
          process.env.NODE_ENV === "development"
            ? "http://localhost:5001/uploads/:path*"

            // Production backend
            : "https://dudhkoshihydro.aayumalunhydro.com.np/uploads/:path*",
      },
    ];
  },

};

export default nextConfig;