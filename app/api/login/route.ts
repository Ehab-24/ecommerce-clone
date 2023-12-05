import { NextRequest, NextResponse } from "next/server";
// import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
    const { email, password } = await request.json()
    if (email !== process.env.ROOT_EMAIL) {
        return NextResponse.json({ message: 'Email not found' })
    }
    if (password !== process.env.ROOT_PASSWORD) {
        return NextResponse.json({ message: 'Invalid Password' })
    }

    // TODO: first fix middleware issue (can't use crypto module)
    // const token = jwt.sign({ email }, process.env.JWT_SECRET || "", { expiresIn: "14d" });

    const response = NextResponse.redirect(new URL('/', request.url))
    response.cookies.set({
        name: 'x-access-token',
        value: JSON.stringify({ email, password }),
        path: '/',
        maxAge: 60 * 60 * 24 * 365 * 10,
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    })

    return response
}
