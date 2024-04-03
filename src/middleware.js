import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
export async function middleware(request) {
    const SECRET = process.env.COOKIE_SECRET
    const path = request.nextUrl.pathname
    console.log("path",path);
    const jwt = request.cookies.get('temporalURL')?.value;
    try {
        if (path && jwt) {
            const separatePath = path.split('/').filter(Boolean);//eliminar los elementos falsy de un array. falsy:(false, null, undefined, 0, '' y Nan) 
            const { payload } = await jwtVerify(jwt, new TextEncoder().encode(SECRET))
            if (payload.temp === separatePath[1]) {
                return NextResponse.next()
            }
        }
        throw new Error('Url invalida')
    } catch (error) {
        return NextResponse.redirect(new URL("/", request.url))
    }
}
export const config = {
    matcher: '/shoppingCart/:path*',
}