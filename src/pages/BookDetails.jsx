// Book Details Page
// Dynamic route: /book/:id
// Shows full details about a selected book including title, author, description, and rating
// Includes a "Back to Browse" button

import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './BookDetails.module.css'

function BookDetails() {
  const { id } = useParams() // Get book ID from the URL
  const navigate = useNavigate()

  // Find the book from Redux store by matching the ID
  const book = useSelector((state) =>
    state.books.list.find((b) => b.id === parseInt(id) || b.id === Number(id) || String(b.id) === id)
  )

  // If book not found, show a fallback message
  if (!book) {
    return (
      <main className={styles.page}>
        <div className="container">
          <div className={styles.notFound}>
            <p className={styles.notFoundIcon}>📕</p>
            <h2 className={styles.notFoundTitle}>Book Not Found</h2>
            <p className={styles.notFoundText}>
              We couldn't find a book with that ID.
            </p>
            <Link to="/books" className="btn-primary">
              Back to Browse
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // Render filled/half/empty stars for the rating
  const renderStars = (rating) => {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5
    const empty = 5 - full - (half ? 1 : 0)
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty)
  }

  return (
    <main className={styles.page}>
      <div className="container">
        {/* Back Button */}
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back to Browse
        </button>

        <div className={styles.detailCard}>
          {/* Book Cover */}
          <div
            className={styles.cover}
            style={{ background: book.color || '#4a3a2a' }}
          >
            <div className={styles.coverSpine} />
            <div className={styles.coverContent}>
              <h2 className={styles.coverTitle}>{book.title}</h2>
              <p className={styles.coverAuthor}>{book.author}</p>
            </div>
          </div>

          {/* Book Info */}
          <div className={styles.info}>
            <span className={styles.category}>{book.category}</span>
            <h1 className={styles.title}>{book.title}</h1>
            <p className={styles.author}>by {book.author}</p>

            {/* Rating */}
            <div className={styles.ratingRow}>
              <span className={styles.stars}>{renderStars(book.rating)}</span>
              <span className={styles.ratingNum}>{book.rating} / 5</span>
            </div>

            {/* Meta info */}
            <div className={styles.meta}>
              {book.year && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Published</span>
                  <span className={styles.metaValue}>{book.year}</span>
                </div>
              )}
              {book.pages && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Pages</span>
                  <span className={styles.metaValue}>{book.pages}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className={styles.descriptionBlock}>
              <h3 className={styles.descLabel}>About this book</h3>
              <p className={styles.description}>{book.description}</p>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <Link to="/books" className="btn-outline">
                ← Browse More Books
              </Link>
              <Link to={`/books/${book.category}`} className="btn-primary">
                More {book.category}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default BookDetails
