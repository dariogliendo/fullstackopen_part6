import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

const anecdoteSlicer = createSlice({
  initialState: [],
  name: 'anecdotes',
  reducers: {
    // vote(state, action) {
    //   const id = action.payload
    //   const anecdote = state.find(a => a.id === id)
    //   const changed = {
    //     ...anecdote,
    //     votes: anecdote.votes + 1
    //   }
    //   return state.map(m => m.id !== id ? m : changed)
    // },
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      return state.map(m => m.id !== action.payload.id ? m : action.payload)
    }
  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlicer.actions

// Async Action Creators
export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = (id) => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState()
    const currentValue = anecdotes.find(a => a.id === id)
    const updated = await anecdoteService.updateAnecdote({
      ...currentValue,
      votes: currentValue.votes + 1
    })
    dispatch(updateAnecdote(updated))
  }
}

export default anecdoteSlicer.reducer