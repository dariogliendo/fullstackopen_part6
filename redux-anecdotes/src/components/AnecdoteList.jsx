import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({anecdotes, filter}) => anecdotes.filter(f => f.content.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.votes - a.votes))

  const voteNote = (id) => {
    dispatch(vote(id))
    dispatch(notify(`you voted for '${anecdotes.find(note => note.id === id).content}'`, 3000))
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteNote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList