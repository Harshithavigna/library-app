# Librarium — Online Library System

A React-based online library application built with Vite, React Router, and Redux Toolkit.

## Features

- **Home Page** — Welcome banner, book categories, and popular books
- **Browse Books** — Filter by category, search by title or author
- **Dynamic Routing** — `/books/:category` for category filtering, `/book/:id` for details
- **Book Details** — Full info: title, author, description, rating, pages, year
- **Add Book** — Form with validation, Redux state management, redirects on success
- **404 Page** — Shows the invalid URL with a link back to Home

## Tech Stack

- React 18
- Vite 5
- React Router DOM v6
- Redux Toolkit + React Redux
- CSS Modules

## Getting Started

### Prerequisites

- Node.js v18 or later
- npm

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd library-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/
    Navbar.jsx          # Navigation bar (Home, Browse, Add Book)
    BookCard.jsx        # Reusable book card with cover, rating, and link
  pages/
    Home.jsx            # Landing page with categories + popular books
    BrowseBooks.jsx     # Browse with search and category filter
    BookDetails.jsx     # Individual book detail view
    AddBook.jsx         # Add book form with Redux dispatch
    NotFound.jsx        # 404 page (no Navbar)
  store/
    store.js            # Redux store configuration
    booksSlice.js       # Books reducer with addBook action
  data/
    books.js            # Initial dummy book data and categories
  styles/
    global.css          # Global styles and CSS variables
  App.jsx               # Router setup
  main.jsx              # App entry point
```

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/books` | Browse All Books |
| `/books/:category` | Browse by Category |
| `/book/:id` | Book Details |
| `/add-book` | Add a Book |
| `*` | 404 Not Found |
