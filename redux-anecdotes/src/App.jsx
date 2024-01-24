import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import SearchFilter from './components/SearchFilter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { getAll } from './services/anecdoteService'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    getAll().then(data => {
      dispatch(setAnecdotes(data))
    })
  }, [dispatch])

  return (
    <div>
      <SearchFilter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App