import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client";
import { nanoid } from 'nanoid';
import { tokenMiddleware, CustomContext } from "./utils/authutils";


const bookRouter = new Hono();
bookRouter.use('*', tokenMiddleware);

const prisma = new PrismaClient;

bookRouter.get('/testing', (c) => {
    return c.text('Hello this is Book!')
})

bookRouter.post('/BookCount', async (c: CustomContext) => {
    const user = c.user; // Access the user from the context

    if (!user || !user.userId) {
        return c.json({ error: 'User not authenticated' }, 401);
    }
    try {
        // Count books for the specific user
        const count = await prisma.book.count({
            where: {
                userId: user.userId // Filter books by userId
            }
        });
        console.log(user)
        console.log('Book count:', count);
        return c.json({ count });
    } catch (error) {
        console.error('Error during get book count:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
});




bookRouter.post('/create', async (c: CustomContext) => {
    const { isbn, author, Title } = await c.req.json();

    const user = c.user; // Access the user from the context

    if (!user || !user.userId) {
        return c.json({ error: 'User not authenticated' }, 401);
    }

    try {
        const book = await prisma.book.create({
            data: {
                id: nanoid(),
                isbn,
                author,
                Title,
                user: { connect: { id: user.userId } }, // Use userId from the token
            },
            select: {
                isbn: true,
                author: true,
                Title: true,
            },
        });

        console.log('Registration Book Success', book);
        return c.json({ message: 'Registration Book Success', book });
    } catch (error) {
        console.error('Error during book registration:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
});


export default bookRouter;
