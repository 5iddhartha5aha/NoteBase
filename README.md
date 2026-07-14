# NotesBase

NotesBase is a full-stack notes application built with React on the frontend and Express plus MongoDB on the backend. It lets users create, view, edit, delete, and pin notes, while also supporting search and sorting for easier organization.

## Features

- Create new notes with a title and content
- View all notes on the home page
- Open a note to edit or delete it
- Pin important notes to the top of the list
- Search notes by title
- Sort notes by newest or oldest first
- API rate limiting to reduce abuse
- Responsive UI built with Tailwind CSS and DaisyUI

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Tailwind CSS
- DaisyUI
- Axios
- React Hot Toast
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Upstash Redis for rate limiting
- dotenv

## Project Structure

```text
NotesBase/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── main.jsx
│   └── package.json
└── package.json
```

## Prerequisites

Before running the project locally, make sure you have:

- Node.js installed
- npm installed
- A MongoDB database available
- An Upstash Redis account (or equivalent Redis-compatible service) for rate limiting

## Environment Variables

Create a `.env` file inside the backend folder with the following variables:

```env
PORT=1337
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

> If you do not configure Upstash, the rate limiting middleware may fail to initialize correctly.

## Installation

From the project root, install dependencies for both the frontend and backend:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Running the Application

### Start the backend

```bash
cd backend
npm run dev
```

The backend will run on:

```text
http://localhost:1337
```

### Start the frontend

In a separate terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## API Endpoints

The backend exposes the following note-related routes:

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /api/notes | Get all notes |
| GET | /api/notes/:id | Get a single note by ID |
| POST | /api/notes | Create a new note |
| PUT | /api/notes/:id | Update an existing note |
| PUT | /api/notes/:id/pin | Toggle the pinned status of a note |
| DELETE | /api/notes/:id | Delete a note |

## Usage

1. Open the frontend in your browser.
2. Create a note from the Create page.
3. View your notes on the home page.
4. Click a note to edit or delete it.
5. Use the search box and sort dropdown to organize your notes.

## Notes

- The frontend sends API requests to the backend at `http://localhost:1337`.
- The backend currently allows requests from the Vite frontend origin `http://localhost:5173`.
- Rate limiting is enabled globally for API requests.

## Future Improvements

Potential enhancements for the project include:

- User authentication
- Cloud storage and deployment
- Dark/light theme switching
- Drag-and-drop note organization
- Rich text editing
- Note categories or tags

## License

This project is distributed for educational and personal use.
