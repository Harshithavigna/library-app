// Browse Books Page
// Supports:
//   - /books        → show all books
//   - /books/:category → filter by category via dynamic routing
// Features search bar to filter by title or author

import { useState, useMemo } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BookCard from '../components/BookCard'
import { CATEGORIES } from '../data/books'
import styles from './BrowseBooks.module.css'

function BrowseBooks() {
  const { category } = useParams() // dynamic route param: /books/:category
  const navigate = useNavigate()
  const books = useSelector((state) => state.books.list)

  // Local state for the search input
  const [search, setSearch] = useState('')

  // Filter books based on: selected category (from URL) AND search text
  const filteredBooks = useMemo(() => {
    let result = books

    // Filter by category if a category is specified in the route
    if (category) {
      result = result.filter(
        (b) => b.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Filter by search query (checks title and author)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      )
    }

    return result
  }, [books, category, search])

  // Handle category tab click — navigate to dynamic route
  const handleCategoryClick = (cat) => {
    setSearch('') // Clear search when switching categories
    if (cat === 'All') {
      navigate('/books')
    } else {
      navigate(`/books/${cat}`)
    }
  }

  const activeCategory = category || 'All'

  return (
    <main className={styles.page}>
      <div className="container">
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Browse Books</h1>
          <p className={styles.pageSubtitle}>
            {category
              ? `Showing ${filteredBooks.length} books in "${category}"`
              : `${filteredBooks.length} books in the collection`}
          </p>
        </div>

        {/* Search Bar */}
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search books"
          />
          {search && (
            <button
              className={styles.clearSearch}
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className={styles.tabs}>
          {['All', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              className={`${styles.tab} ${activeCategory === cat ? styles.tabActive : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className={styles.grid}>
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          // Empty state
          <div className={styles.empty}>
            <p className={styles.emptyIcon}>📭</p>
            <p className={styles.emptyText}>No books found.</p>
            <p className={styles.emptyHint}>
              Try a different search or{' '}
              <Link to="/add-book" className={styles.emptyLink}>
                add a new book
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default BrowseBooks
