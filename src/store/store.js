// Redux store configuration
// Combines all reducers and exports the configured store

import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './booksSlice'

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
})

export default store
