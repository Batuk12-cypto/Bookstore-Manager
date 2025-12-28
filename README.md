# Bookstore Manager

Full-stack MERN app to add, edit, list and delete books (React + Tailwind frontend, Express + Node backend, MongoDB storage).

## Quick overview

- Frontend: React (Vite) + Tailwind CSS in the `client/` folder.
- Backend: Express + Node in the `server/` folder. Uses Mongoose to talk to MongoDB.
- API base (frontend expects): `http://localhost:8000/book` (server mounts routes under `/book`).

## Project structure

```
root
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── axiosinstance.js
│   └── package.json
├── server/          # Express backend
│   ├── controller/
│   ├── models/
│   ├── routes/
│   ├── database.js
│   └── index.js
└── README.md
```

## Local setup

Prerequisites: Node.js (LTS), npm (or yarn), and MongoDB (local or Atlas).

1) Start backend

```bash
cd server
npm install
# ensure MongoDB is running and database config in database.js is correct
node index.js
```

The server listens on port `8000` by default and exposes routes under `/book`.

2) Start frontend

```bash
cd client
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Environment variables

- The server connects to MongoDB inside `server/database.js`. If you prefer environment variables, create `server/.env` and update `database.js` to read `process.env.MONGODB_URI`.

## API reference

Base: `http://localhost:8000/book`

- `GET /booklist` — list all books (`GET /book/booklist` full path)
- `POST /addbook` — add a book (`POST /book/addbook`)
- `PUT /updatebook/:id` — update (PUT `/book/updatebook/:id`)
- `DELETE /deletebook/:id` — delete (DELETE `/book/deletebook/:id`)

Request/response bodies use JSON. See `server/controller/book.controller.js` for expected fields.

## Frontend notes

- The client uses `client/axiosinstance.js` which currently sets `baseURL` to `http://localhost:8000/book`.
- Navigate between pages via the simple history-based router in `App.jsx`.
- ManageBooks supports create, edit (PUT `/updatebook/:id`) and delete.

## Tests & verification

- Manual test flow:
  1. Run server and client.
  2. Open the app, go to ManageBooks.
  3. Add a book — it should appear in the table.
  4. Click Edit on a row, change data, click Update — change should persist.
  5. Click Delete — row should be removed.

- You can use `curl` or Postman to exercise the API endpoints.

## Deployment notes

- Change the API base URL in `client/axiosinstance.js` to your deployed server URL.
- Use environment variables for MongoDB connection and server port.

## Next suggestions

- Add authentication (admin vs normal user).
- Add pagination/search for large book lists.
- Add image upload for book covers (S3 or Cloudinary).
- Add unit/integration tests and CI.

---

If you want, I can:
- Move the client README to the repository root or merge both client and root README into a single file with screenshots.
- Add example curl commands or a Postman collection.
