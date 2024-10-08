📚 BookNest
<!-- You can add a logo for your app here -->

BookNest is a mobile application designed for book lovers to track their reading journey, discover new books, and organize their personal libraries. The app lets users record books they've read, track reading progress, and even measure how much time they’ve spent reading. Whether it's physical books or e-books, BookNest helps you stay organized and inspired.

🚀 Features

Reading Statistics: Track how many books you've read, hours spent reading, and percentage of physical books.
Personal Library: Organize and manage your books in a personal library.
Reading Goals: Set and track personal reading goals to stay motivated.
Book Scanning: Scan books to quickly add them to your library.
Social Features: Share your reading journey with friends.


🛠️ Technologies Used

<p>Flutter: For developing the mobile application.</p>
<p>Node.js + Hono: For building the backend API.</p>
<p>MySQL: Database for storing book and user information.</p>
<p>JWT Authentication: Secure token-based authentication system.</p>
<p>Firebase: For authentication (Google Sign-In).</p>
<p>Neon: For serverless database integration.</p>

💻 Contributing
<p>We welcome contributions! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.</p>


# Project Setup

Ensure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/en/download/)

## Step 1: Start PostgreSQL with Docker

1. Start the PostgreSQL container by running:

   ```bash
   docker-compose up -d
   ```

2. Open your `.env` file (created by Prisma) and set the `DATABASE_URL` for your PostgreSQL database:

   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/book_nest"
   ```

3. Run the Prisma migration to apply your existing schema to the PostgreSQL database:

```bash
npx prisma migrate dev
```

4. Generate the Prisma client:

```bash
npx prisma generate
```

5. Start the API server:

```bash
npm run dev
```
