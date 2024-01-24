import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

export const addAnecdote = async (content) => {
  const newAnecdote = {
    content,
    id: getId(),
    votes: 0
  }
  const { data } = await axios.post(baseUrl, newAnecdote)
  return data
}

export const updateAnecdote = async (newAnecdote) => {
  const { data } = await axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote)
  return data
}

export default { getAll, addAnecdote, updateAnecdote }