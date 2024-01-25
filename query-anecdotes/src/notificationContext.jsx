import { createContext, useReducer } from 'react'
import { PropTypes } from 'prop-types'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET-NOTIFICATION': {
      return action.payload
    }
    case 'CLEAR-NOTIFICATION': {
      return null
    }
    default: {
      return state
    }
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.any
}

export default NotificationContext