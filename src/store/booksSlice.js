// Redux slice for managing the books state
// Handles adding new books to the library collection

import { createSlice } from '@reduxjs/toolkit'
import { INITIAL_BOOKS } from '../data/books'

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    // Load initial dummy books as the starting collection
    list: INITIAL_BOOKS,
  },
  reducers: {
    // Action: add a new book to the beginning of the list
    addBook: (state, action) => {
      const newBook = {
        ...action.payload,
        id: Date.now(), // Use timestamp as unique ID
      }
      // Prepend to list so new book appears first on browse page
      state.list = [newBook, ...state.list]
    },
  },
})

export const { addBook } = booksSlice.actions
export default booksSlice.reducer
