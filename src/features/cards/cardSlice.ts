import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import IInitialState from '../../types/InitialState'
import cardService from './cardService'

// Initial State
const initialState: IInitialState = {
  cards: [],
  isError: false,
  isSucess: false,
  isLoading: false,
  message: ''
}

// Service
export const getCards = createAsyncThunk('cards/all', async(_, thunkApi) => {
  try {
    return await cardService.getCards()
  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()

    return thunkApi.rejectWithValue(message)
  }
})

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    reset: (state) => initialState,
    handleChosenCard: (state, action) => {      
      const matchedCards = state.cards.map(c => {
        if(c.filePath === action.payload.filePath) {
          return { ...c, matched: true }
        } else {
          return c
        }
      })

      state.cards = matchedCards
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCards.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.cards = action.payload
      })
      .addCase(getCards.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
      })
  }
})

export const { reset, handleChosenCard } = cardSlice.actions
export default cardSlice.reducer
