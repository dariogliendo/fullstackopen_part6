const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const createAnecdote = (content) => ({
  type: 'NEW_ANECDOTE',
  payload: { content }
})


export const vote = (id) => ({
  type: 'VOTE',
  payload: { id }
})

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE': {
      const anecdote = state.find(a => a.id === action.payload.id)
      const changed = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      state = state.map(m => m.id !== action.payload.id ? m : changed);
      break;
    }
    case 'NEW_ANECDOTE': {
      state = [...state, asObject(action.payload.content)]
      break;
    }
  }

  return state.sort((a, b) => b.votes - a.votes)
}

export default reducer