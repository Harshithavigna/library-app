// Navbar component
// Displays the site logo and navigation links to Home, Browse Books, and Add Book

import { Link, NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        {/* Logo / Brand */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>📚</span>
          <span className={styles.logoText}>Librarium</span>
        </Link>

        {/* Navigation Links */}
        <ul className={styles.links}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Browse Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-book"
              className={({ isActive }) =>
                isActive
                  ? `${styles.addLink} ${styles.addActive}`
                  : styles.addLink
              }
            >
              + Add Book
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
