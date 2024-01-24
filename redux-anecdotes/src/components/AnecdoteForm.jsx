/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    dispatch(createAnecdote(content))
    event.target.content.value = ''
    dispatch(notify(`you created '${content}'`))
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