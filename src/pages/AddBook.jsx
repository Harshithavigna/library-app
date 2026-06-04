// Add Book Page
// Form for adding a new book to the library
// Uses Redux (dispatch addBook) to store the new book
// Includes form validation for all required fields
// Redirects to Browse page after successful submission

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addBook } from '../store/booksSlice'
import { CATEGORIES } from '../data/books'
import styles from './AddBook.module.css'


// Initial empty form state
const INITIAL_FORM = {
  title: '',
  author: '',
  category: '',
  description: '',
  rating: '',
  pages: '',
  year: '',
}

// Book cover color options
const COVER_COLORS = [
  '#4a6741', '#8b6914', '#5a3a5a', '#1a4a6b',
  '#8b2040', '#2a5a4a', '#4a3a2a', '#1a2a3a',
  '#2a4a2a', '#6b2a4a', '#3a3a3a', '#5a4a2a',
]

function AddBook() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [selectedColor, setSelectedColor] = useState(COVER_COLORS[0])
  const [submitted, setSubmitted] = useState(false)

  // Update form field value
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // Validate all form fields — returns an errors object
  const validate = () => {
    const newErrors = {}

    if (!form.title.trim()) newErrors.title = 'Title is required.'
    if (!form.author.trim()) newErrors.author = 'Author is required.'
    if (!form.category) newErrors.category = 'Please select a category.'
    if (!form.description.trim()) newErrors.description = 'Description is required.'
    else if (form.description.trim().length < 20)
      newErrors.description = 'Description must be at least 20 characters.'

    const rating = parseFloat(form.rating)
    if (!form.rating) newErrors.rating = 'Rating is required.'
    else if (isNaN(rating) || rating < 0 || rating > 5)
      newErrors.rating = 'Rating must be between 0 and 5.'

    if (form.pages && (isNaN(parseInt(form.pages)) || parseInt(form.pages) <= 0))
      newErrors.pages = 'Pages must be a positive number.'

    if (form.year) {
      const year = parseInt(form.year)
      if (isNaN(year) || year < 1000 || year > new Date().getFullYear())
        newErrors.year = `Year must be between 1000 and ${new Date().getFullYear()}.`
    }

    return newErrors
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      // Show validation errors
      setErrors(validationErrors)
      return
    }

    // Dispatch the addBook action to Redux store
    dispatch(
      addBook({
        title: form.title.trim(),
        author: form.author.trim(),
        category: form.category,
        description: form.description.trim(),
        rating: parseFloat(parseFloat(form.rating).toFixed(1)),
        pages: form.pages ? parseInt(form.pages) : null,
        year: form.year ? parseInt(form.year) : null,
        color: selectedColor,
      })
    )

    setSubmitted(true)

    // Redirect to Browse page after short delay so user sees success message
    setTimeout(() => {
      navigate('/books')
    }, 1200)
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Add a New Book</h1>
          <p className={styles.pageSubtitle}>
            Fill in the details below to add a book to the library.
          </p>
        </div>

        {/* Success message */}
        {submitted && (
          <div className={styles.successBanner}>
            ✓ Book added successfully! Redirecting to Browse...
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.formGrid}>
            {/* Title */}
            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label className={styles.label} htmlFor="title">
                Book Title <span className={styles.req}>*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                placeholder="e.g. The Great Gatsby"
                value={form.title}
                onChange={handleChange}
              />
              {errors.title && <p className={styles.error}>{errors.title}</p>}
            </div>

            {/* Author */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="author">
                Author <span className={styles.req}>*</span>
              </label>
              <input
                id="author"
                name="author"
                type="text"
                className={`${styles.input} ${errors.author ? styles.inputError : ''}`}
                placeholder="e.g. F. Scott Fitzgerald"
                value={form.author}
                onChange={handleChange}
              />
              {errors.author && <p className={styles.error}>{errors.author}</p>}
            </div>

            {/* Category */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="category">
                Category <span className={styles.req}>*</span>
              </label>
              <select
                id="category"
                name="category"
                className={`${styles.input} ${errors.category ? styles.inputError : ''}`}
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select a category...</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className={styles.error}>{errors.category}</p>}
            </div>

            {/* Rating */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="rating">
                Rating (0–5) <span className={styles.req}>*</span>
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                className={`${styles.input} ${errors.rating ? styles.inputError : ''}`}
                placeholder="e.g. 4.5"
                value={form.rating}
                onChange={handleChange}
              />
              {errors.rating && <p className={styles.error}>{errors.rating}</p>}
            </div>

            {/* Pages */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="pages">
                Pages <span className={styles.optional}>(optional)</span>
              </label>
              <input
                id="pages"
                name="pages"
                type="number"
                min="1"
                className={`${styles.input} ${errors.pages ? styles.inputError : ''}`}
                placeholder="e.g. 320"
                value={form.pages}
                onChange={handleChange}
              />
              {errors.pages && <p className={styles.error}>{errors.pages}</p>}
            </div>

            {/* Year */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="year">
                Publication Year <span className={styles.optional}>(optional)</span>
              </label>
              <input
                id="year"
                name="year"
                type="number"
                min="1000"
                max={new Date().getFullYear()}
                className={`${styles.input} ${errors.year ? styles.inputError : ''}`}
                placeholder="e.g. 2023"
                value={form.year}
                onChange={handleChange}
              />
              {errors.year && <p className={styles.error}>{errors.year}</p>}
            </div>

            {/* Description */}
            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label className={styles.label} htmlFor="description">
                Description <span className={styles.req}>*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className={`${styles.input} ${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                placeholder="Write a short description of the book..."
                value={form.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p className={styles.error}>{errors.description}</p>
              )}
            </div>

            {/* Cover Color Picker */}
            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label className={styles.label}>Cover Color</label>
              <div className={styles.colorPicker}>
                {COVER_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`${styles.colorSwatch} ${selectedColor === color ? styles.colorSelected : ''}`}
                    style={{ background: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select cover color ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className={styles.formActions}>
            <button
              type="button"
              className="btn-outline"
              onClick={() => navigate('/books')}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitted}>
              {submitted ? '✓ Book Added!' : 'Add to Library'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default AddBook
