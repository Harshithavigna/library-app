// App component
// Sets up React Router routes and wraps the app in Redux Provider
// Routes:
//   /              → Home
//   /books         → Browse Books (all)
//   /books/:category → Browse Books (filtered by category)
//   /book/:id      → Book Details
//   /add-book      → Add Book
//   *              → 404 Not Found

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BrowseBooks from './pages/BrowseBooks'
import BookDetails from './pages/BookDetails'
import AddBook from './pages/AddBook'
import NotFound from './pages/NotFound'

function App() {
  return (
    // Provide Redux store to all components
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* 404 page — no Navbar, handled separately */}
          <Route path="*" element={<NotFound />} />

          {/* Main layout routes — all include Navbar */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route
            path="/books"
            element={
              <>
                <Navbar />
                <BrowseBooks />
              </>
            }
          />
          {/* Dynamic route: filter books by category */}
          <Route
            path="/books/:category"
            element={
              <>
                <Navbar />
                <BrowseBooks />
              </>
            }
          />
          {/* Dynamic route: individual book details */}
          <Route
            path="/book/:id"
            element={
              <>
                <Navbar />
                <BookDetails />
              </>
            }
          />
          <Route
            path="/add-book"
            element={
              <>
                <Navbar />
                <AddBook />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
