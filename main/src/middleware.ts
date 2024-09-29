import { NextResponse, type NextRequest } from 'next/server'
import { RateLimiterMemory } from "rate-limiter-flexible";
const limiter = new RateLimiterMemory({
    points:50,
    duration:300,
    blockDuration:10
})
export async function middleware(request: NextRequest) {
    const ip = request.headers.get("x-forwarded-for") || "abc"
    console.log(ip);
    try {
        await limiter.consume(ip)
        return NextResponse.next()
    } catch (error) {
        return new NextResponse("Rate limit Exceeded")
    }
}
 
export const config = {
  matcher: '/api/:path*',
}