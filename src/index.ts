import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import authRouter from './auth';
import bookRouter from './book';
import { connectToDB } from './utils/db';
import cors, { CorsRequest } from 'cors';
import profileRouter from './profile';

const app = new Hono()


app.route('/auth', authRouter);
app.route('/book', bookRouter);
app.route('/profile', profileRouter);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
