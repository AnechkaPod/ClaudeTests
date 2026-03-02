# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal monorepo for building and testing web apps. Contains a React + C# Todo app and standalone HTML experiments.

## Workflow
- After every change, always commit with a descriptive message and push to GitHub so no work is lost.

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
ASP.NET Core 9 minimal API. All endpoints are defined directly in `Program.cs` with no controllers. State is in-memory (`List<TodoItem>`) — data resets on server restart. The model is in `Models/TodoItem.cs` (`Id`, `Title`, `IsComplete`).

### API contract
| Method | Route | Body |
|--------|-------|------|
| GET | `/api/todos` | — |
| POST | `/api/todos` | `{ "title": "..." }` |
| PUT | `/api/todos/{id}` | `{ "id", "title", "isComplete" }` |
| DELETE | `/api/todos/{id}` | — |

The C# API uses camelCase JSON serialization by default in ASP.NET Core, matching the React client's expectations.
