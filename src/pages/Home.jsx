// Home Page
// Displays: welcome banner, book categories, and popular books as cards

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BookCard from '../components/BookCard'
import { CATEGORIES } from '../data/books'
import styles from './Home.module.css'

// Category icons for visual interest
const CATEGORY_ICONS = {
  Fiction: '📖',
  'Non-Fiction': '🔍',
  'Sci-Fi': '🚀',
  Mystery: '🕵️',
  Romance: '💌',
  Biography: '👤',
}

function Home() {
  // Get books from Redux store
  const books = useSelector((state) => state.books.list)

  // Show first 4 books as "popular" on home page
  const popularBooks = books.slice(0, 4)

  return (
    <main>
      {/* ── Hero / Welcome Banner ── */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.heroEyebrow}>Welcome to</p>
          <h1 className={styles.heroTitle}>Librarium</h1>
          <p className={styles.heroSubtitle}>
            Discover your next great read. Browse thousands of books across
            every genre and add your own to the collection.
          </p>
          <div className={styles.heroActions}>
            <Link to="/books" className="btn-primary">
              Browse Library
            </Link>
            <Link to="/add-book" className="btn-outline">
              + Add a Book
            </Link>
          </div>
        </div>
        {/* Decorative book stack */}
        <div className={styles.heroDecor} aria-hidden="true">
          {['#8b2040', '#1a4a6b', '#4a6741', '#8b6914'].map((c, i) => (
            <div
              key={i}
              className={styles.decorBook}
              style={{ background: c, transform: `rotate(${(i - 1.5) * 4}deg)` }}
            />
          ))}
        </div>
      </section>

      {/* ── Book Categories ── */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Browse by Category</h2>
          <p className={styles.sectionSub}>Pick a genre and dive in</p>
          <div className={styles.categoriesGrid}>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={`/books/${cat}`}
                className={styles.categoryCard}
              >
                <span className={styles.catIcon}>{CATEGORY_ICONS[cat] || '📚'}</span>
                <span className={styles.catName}>{cat}</span>
                <span className={styles.catCount}>
                  {books.filter((b) => b.category === cat).length} books
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Books ── */}
      <section className={`${styles.section} ${styles.popularSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Popular Books</h2>
              <p className={styles.sectionSub}>Highly rated picks from our collection</p>
            </div>
            <Link to="/books" className={styles.viewAll}>
              View all →
            </Link>
          </div>
          <div className={styles.booksGrid}>
            {popularBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
