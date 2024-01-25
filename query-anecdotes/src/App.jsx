import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { updateAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './notificationContext'

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(m => m.id !== updatedAnecdote.id ? m : updatedAnecdote))
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get("http://localhost:3001/anecdotes").then(res => res.data),
  })



  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch({
      type: 'SET-NOTIFICATION',
      payload: `You voted for ${anecdote.content}`
    })
    setTimeout(() => {
      dispatch({ type: 'CLEAR-NOTIFICATION' })
    }, 5000)
  }
  
  if (result.isLoading) return <div>Loading data...</div>
  if (result.isError) return <div style={{color: 'red'}}>Error fetching data</div>
  const anecdotes = result.data
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
