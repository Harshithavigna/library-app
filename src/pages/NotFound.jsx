// 404 Not Found Page
// Shown for any undefined/invalid routes
// Displays the invalid URL that was accessed
// Does NOT include the Header/Navbar component
// Includes a link back to the Home page

import { Link, useLocation } from 'react-router-dom'
import styles from './NotFound.module.css'

function NotFound() {
  // Get the current URL path that caused the 404
  const location = useLocation()

  
  return (
    // Note: No <Navbar /> here — intentionally excluded per requirements
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Large 404 display */}
        <div className={styles.code}>404</div>

        <h1 className={styles.title}>Page Not Found</h1>

        {/* Display the invalid route URL */}
        <p className={styles.urlLabel}>The route you tried to visit:</p>
        <code className={styles.url}>{location.pathname}</code>

        <p className={styles.message}>
          This page doesn't exist in our library. Perhaps it was moved, deleted,
          or you typed the address incorrectly.
        </p>

        {/* Link back to Home */}
        <Link to="/" className={styles.homeLink}>
          ← Return to Home Page
        </Link>
      </div>
    </div>
  )
}

export default NotFound
