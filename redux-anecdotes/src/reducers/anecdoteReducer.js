import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlicer = createSlice({
  initialState: [],
  name: 'anecdotes',
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      const changed = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(m => m.id !== id ? m : changed)
    },
    createAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, createAnecdote, setAnecdotes } = anecdoteSlicer.actions
export default anecdoteSlicer.reducer