import { Hono } from 'hono';
import { comparePassword, CustomContext, generateToken, hashPassword, tokenMiddleware } from './utils/authutils';
import { PrismaClient } from "@prisma/client";// Import the connection function

const profileRouter = new Hono();
const prisma = new PrismaClient;
profileRouter.use('*', tokenMiddleware);

profileRouter.post('/getProfile', async (c: CustomContext) => {
    const user = c.user; // Access the user from the context
    console.log(user);

    if (!user || !user.userId) {
        return c.json({ error: 'User not authenticated' }, 401);
    }

    try {
        const profile = await prisma.user.findUnique({
            where: {
                id: user.userId
            },
            select: {
                name: true,
            }
        });
        console.log(profile);
        return c.json({ profile });
    } catch (error) {
        console.error('Error during get profile user:', error); // Log the actual error object
        return c.json({ message: 'Error during get profile detail' }, 500);
    }
});

export default profileRouter;