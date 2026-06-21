import { NextResponse } from "next/server";


export async function proxy(request){

    const token =
        request.cookies.get("accessToken");

        // console.log(token.value)

    const pathname =
        request.nextUrl.pathname;


    // Protect dashboard routes
    if(pathname.startsWith("/dashboard")){


        if(!token){
            return NextResponse.redirect(
                new URL("/login", request.url)
            );

        }


        try{


          const url = new URL("/api/auth/authme", request.url);

const response = await fetch(url, {
  headers: {
    Cookie: `${token.name}=${token.value}`,
  },
});
// console.log(response, "res")

            if(!response.ok){

                return NextResponse.redirect(
                    new URL("/login",request.url)
                );

            }


        }catch(error){

            return NextResponse.redirect(
                new URL("/login",request.url)
            );

        }

    }


    return NextResponse.next();

}


export const config={

    matcher:[
        "/dashboard/:path*"
    ]

};