import { NextResponse } from "next/server";


export async function proxy(request) {

    const token = request.cookies.get("accessToken");

    const pathname = request.nextUrl.pathname;


    // Protect dashboard routes
    if (
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/forbidden")
    ) {

        if (!token) {
            return NextResponse.redirect(
                new URL("/login", request.url)
            );
        }


        try {

            const url = new URL("/api/auth/authme", request.url);

            const response = await fetch(url, {
                headers: {
                    Cookie: `${token.name}=${token.value}`,
                },
            });


            if (!response.ok) {
                return NextResponse.redirect(
                    new URL("/login", request.url)
                );
            }


        } catch(error) {

            return NextResponse.redirect(
                new URL("/login", request.url)
            );

        }
    }



    // Prevent logged-in users from accessing register page
    if (pathname == "/register" || pathname == "/login") {
        if (token) {
// console.log(token, "Token")
            try {

                const url = new URL("/api/auth/authme", request.url);

                const response = await fetch(url, {
                    headers: {
                        Cookie: `${token.name}=${token.value}`,
                    },
                });


                // token valid
                if(response.ok) {
                  return NextResponse.redirect(
        new URL("/dashboard", request.url)
    );
                }


            } catch(error) {

                // invalid token, allow register
                return NextResponse.next();

            }

        }

    }


    return NextResponse.next();
}



export const config = {
    matcher: [
        "/dashboard/:path*",
        "/forbidden/:path*",
        "/register",
        "/login"
    ]
};