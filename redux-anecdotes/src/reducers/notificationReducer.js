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
export default notificationSlice.reducer