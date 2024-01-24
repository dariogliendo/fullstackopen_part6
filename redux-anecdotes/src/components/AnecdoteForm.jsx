/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { addAnecdote } from '../services/anecdoteService'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    const newAnecdote = await addAnecdote(content)
    dispatch(createAnecdote(newAnecdote))
    event.target.content.value = ''
    dispatch(setNotification(`you created '${content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <form onSubmit={newAnecdote}>
      <h2>create new</h2>
      <div><input name={"content"} /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm