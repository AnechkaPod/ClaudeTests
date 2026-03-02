# ClaudeTests Project

This is a personal project for building and testing web apps.

## Preferences
- Build web apps as single self-contained HTML files unless complexity requires separate files
- Keep code simple and beginner-friendly
- No frameworks unless explicitly requested
- Use vanilla HTML, CSS, and JavaScript by default

## Project Structure

```
ClaudeTests/
├── client/          # React (Vite) frontend — runs on http://localhost:5173
├── server/TodoApi/  # C# .NET 9 Web API backend — runs on http://localhost:5000
├── tictactoe.html
├── CLAUDE.md
└── .gitignore
```

## Running the Todo App

**Server (C# .NET 9):**
```bash
cd server/TodoApi
dotnet run
# API available at http://localhost:5000/api/todos
```

**Client (React + Vite):**
```bash
cd client
npm run dev
# UI available at http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`, so both must be running simultaneously.
