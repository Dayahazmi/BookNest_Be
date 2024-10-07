import bcyrpt from 'bcrypt';
import { Context, Next } from 'hono';
import { Jwt, JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

const secret = 'your_secret_key';

export interface CustomContext extends Context {
    user?: JwtPayload; // Adjust this to match your JWT payload structure
}

export const generateToken = (user: any): string => {
    return jwt.sign(user, secret, { expiresIn: '1d' });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return false;
    }
};

export const refreshToken = (token: any): string => {
    return jwt.sign(token, secret, { expiresIn: '1d' });
};

// Middleware to set the user in context
export const tokenMiddleware = async (c: CustomContext, next: Next) => {
    const authorizationHeader = c.req.header('authorization');
    console.log(authorizationHeader)
    const token = authorizationHeader?.split(' ')[1];

    if (c.req.path === '/signin' || c.req.path === '/signup') {
        await next();
        return;
    }

    if (!token) {
        return c.text('Unauthorized: No token provided', 401);
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return c.text('Unauthorized: Invalid token', 401);
    } else if (!decoded.userId) {
        return c.text('Forbidden: Invalid token', 403);
    }

    c.user = decoded; // Use the extended context type here
    await next();
};

export const comparePassword = (
    plainPassword: string,
    hashedPassword: string
): boolean => {
    return bcyrpt.compareSync(plainPassword, hashedPassword)
}

export const hashPassword = (password: string): string => {
    const salt = bcyrpt.genSaltSync(10);
    return bcyrpt.hashSync(password, salt)
}


