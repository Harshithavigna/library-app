// BookCard component
// Displays a book's cover, title, author, category, and rating
// Used on both the Home page and the Browse Books page

import { Link } from 'react-router-dom'
import styles from './BookCard.module.css'

// Helper: render star rating as filled/half/empty stars
function StarRating({ rating }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)

  return (
    <span className={styles.stars} aria-label={`Rating: ${rating} out of 5`}>
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(empty)}
      <span className={styles.ratingNum}>{rating}</span>
    </span>
  )
}

function BookCard({ book }) {
  return (
    <div className={styles.card}>
      {/* Book cover — colored rectangle with title overlay */}
      <div className={styles.cover} style={{ background: book.color || '#4a3a2a' }}>
        <div className={styles.coverSpine} />
        <div className={styles.coverTitle}>{book.title}</div>
        <div className={styles.coverAuthor}>{book.author}</div>
      </div>

      {/* Book info */}
      <div className={styles.info}>
        <span className={styles.category}>{book.category}</span>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>by {book.author}</p>
        <StarRating rating={book.rating} />

        {/* Link to Book Details page */}
        <Link to={`/book/${book.id}`} className={styles.detailsLink}>
          View Details →
        </Link>
      </div>
    </div>
  )
}

export default BookCard
