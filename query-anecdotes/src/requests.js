import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const createAnecdote = async (content) => {
  const { data } = await axios.post(baseUrl, { content, votes: 0, id: Math.floor(Math.random() * 1000) })
  return data
}

export const updateAnecdote = async (updatedNote) => {
  const { data } = await axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote)
  return data
}

export default {
  createAnecdote,
  updateAnecdote,
}