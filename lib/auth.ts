import { SignJWT, jwtVerify } from "jose";

const ALG = "HS256";
const EXPIRATION = "30d";

function getSecret() {
    const secret = process.env.APP_PASSWORD;
    if (!secret) throw new Error("APP_PASSWORD not set");
    return new TextEncoder().encode(secret);
}

export async function createToken() {
    return new SignJWT({ auth: true })
        .setProtectedHeader({ alg: ALG })
        .setIssuedAt()
        .setExpirationTime(EXPIRATION)
        .sign(getSecret());
}

export async function verifyToken(token: string): Promise<boolean> {
    try {
        await jwtVerify(token, getSecret());
        return true;
    } catch {
        return false;
    }
}
