import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../notificationContext'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const newNoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({
        type: 'SET-NOTIFICATION',
        payload: `Added anecdote ${newAnecdote.content}`
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR-NOTIFICATION' })
      }, 5000)
    },
    onError: (error) => {
      dispatch({
        type: 'SET-NOTIFICATION',
        payload: `Failed to create anecdote. Error: ${error.response.data.error}`
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR-NOTIFICATION' })
      }, 5000)
    },
    retry: false,
  })


  const onCreate = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    newNoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
