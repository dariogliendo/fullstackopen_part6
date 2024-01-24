import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
  initialState: null,
  name: 'notification',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const notify = (message, timeout = 5000) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
  }
}

export default notificationSlice.reducer