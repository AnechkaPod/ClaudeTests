# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal monorepo for building and testing web apps. Contains a React + C# Todo app and standalone HTML experiments.

## Workflow
- After every change, always commit with a descriptive message and push to GitHub so no work is lost.
- Whenever the project structure changes (new files, folders, or architectural shifts), update the Architecture section in this file as part of the same commit.

## Preferences
- Build standalone experiments as single self-contained HTML files (e.g. `tictactoe.html`)
- Keep code simple and beginner-friendly
- No frameworks unless explicitly requested
- Use vanilla HTML, CSS, and JavaScript for standalone files

## Running the Todo App

Both processes must run simultaneously. The Vite dev server proxies `/api/*` to the C# backend.

**Server** (C# .NET 9, port 5000):
```bash
cd server/TodoApi
dotnet run
```

**Client** (React + Vite, port 5173):
```bash
cd client
npm run dev
```

Other client commands:
```bash
npm run build   # production build → dist/
npm run lint    # ESLint
npm run preview # serve the production build locally
```

## Architecture

### Client (`client/`)
Single-page React 19 app with no routing. All state and API calls live in `src/App.jsx` — there are no separate service or context files. Styling is done with inline style objects defined at the bottom of `App.jsx`. `src/main.jsx` is the entry point.

### Server (`server/TodoApi/`)
ASP.NET Core 9 MVC controller-based API. `Program.cs` only handles service registration and middleware (`AddControllers`, `AddCors`, `MapControllers`). Business logic lives in `Controllers/TodosController.cs` (`[ApiController]`, `[Route("api/todos")]`). State is in-memory static fields on the controller — data resets on server restart. The model is in `Models/TodoItem.cs` (`Id`, `Title`, `IsComplete`).

### API contract
| Method | Route | Body | Description |
|--------|-------|------|-------------|
| GET | `/api/todos` | — | Get all todos |
| POST | `/api/todos` | `{ "title": "..." }` | Create a todo |
| PUT | `/api/todos/{id}` | `{ "id", "title", "isComplete" }` | Update a todo |
| DELETE | `/api/todos/{id}` | — | Delete a todo |
| DELETE | `/api/todos/completed` | — | Remove all completed todos |

The C# API uses camelCase JSON serialization by default in ASP.NET Core, matching the React client's expectations.

### Client API calls (`client/src/App.jsx`)
All fetch calls use the `/api/todos` base path (proxied by Vite to `http://localhost:5000`). When adding a new endpoint, add the fetch call as an `async function` in `App.jsx` alongside the existing ones (`addTodo`, `toggleTodo`, `deleteTodo`, `clearCompleted`).
