import { Hono } from 'hono';
import { comparePassword, CustomContext, generateToken, hashPassword, tokenMiddleware } from './utils/authutils';
import { decode, sign as JWTSign, verify } from 'hono/jwt'
import { nanoid } from 'nanoid';
import prisma from './utils/db';

const JWT_SECRET = 'dayahazmi'

const authRouter = new Hono();
// authRouter.use('*', tokenMiddleware);

// async function main() {
//     const sample = await prisma.user.findMany()
//     console.log(sample)
// }

// main()

authRouter.get('/testing', (c) => {
    return c.text('Hello this is Auth!')
})




authRouter.post('/registration', async (c) => {
    const { name, email, password } = await c.req.json();

    const hash = hashPassword(password)
    console.log(hash)

    try {
        const user = await prisma.user.create({
            data: {
                id: nanoid(), userId: nanoid(), name, email, password: hash
            },
            select: {
                name: true,
                email: true
            }
        })

        console.log('Registration Success');
        return c.json({ message: "Registration Success" });
    } catch (error) {
        console.error("Error during REGISTRATION:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
})


authRouter.post('/login', async (c) => {
    const { name, email, password } = await c.req.json();

    console.log(name, email, password)

    if (!email || !password) {
        console.log('Missing email or password');
        return c.json({ error: 'Email and password are required.' }, 400);
    }

    try {
        const user = await prisma.user.findFirst({
            where: { email },
            select: { id: true, name: true, email: true, password: true },
        });

        if (!user) {
            return c.json({ error: "User does not exist" }, 404);
        }

        const isValid = comparePassword(password, user?.password);

        if (!isValid) {
            return c.json({ error: "Invalid email or password" }, 401);
        }

        if (!user) {
            return c.json({ error: "User does not exist" }, 404);
        }

        const token = generateToken({ email, userId: user.id });
        //console.log('Login Success');
        return c.json({ success: true, token });
    } catch (error) {
        console.error("Error during sign-in:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
});






export default authRouter;
