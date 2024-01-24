import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return {
        message: action.payload.message
      }
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer