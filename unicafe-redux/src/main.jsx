import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const giveFeedback = (type) => {
    store.dispatch({ type })
  }
  const reset = () => {
    store.dispatch({type: 'RESET'})
  }

  return (
    <div>
      <button onClick={() => giveFeedback('GOOD')}>good</button> 
      <button onClick={() => giveFeedback('OK')}>ok</button> 
      <button onClick={() => giveFeedback('BAD')}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good: {store.getState().good}</div>
      <div>ok: {store.getState().ok}</div>
      <div>bad: {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
