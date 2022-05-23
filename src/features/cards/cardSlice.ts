import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import IInitialState from '../../types/InitialState'
import cardService from './cardService'

// Initial State
const initialState: IInitialState = {
  cards: [],
  chosenFirstCard: null,
  chosenSecondCard: null,
  count: 0,
  intervalId: 0,
  isWinner: false,
  isLooser: false,
  disabledCard: false,

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
    resetCertainState: (state) => {
      state.chosenFirstCard = null
      state.chosenSecondCard = null   
      state.isWinner = false
      state.isLooser = false
      state.disabledCard = false
    },
    resetTimerIsLost: (state) => {
      clearInterval(state.intervalId);
      state.intervalId = 0
      state.count = 0
      state.isLooser = true
      state.disabledCard = true
    },
    resetTimerIsWon: (state) => {
      clearInterval(state.intervalId);
      state.intervalId = 0
      state.count = 0
      state.isWinner = true
      state.disabledCard = true
    },
    setDisabledCard: (state, action) => {
      state.disabledCard = action.payload
    },
    setIntervalId: (state, action) => {
      state.intervalId = action.payload
    },
    startTimer: (state) => {
      state.count += 1
    },
    handleChosenCard: (state, action) => {   
      state.chosenFirstCard ?
      state.chosenSecondCard = action.payload :
      state.chosenFirstCard = action.payload 
    },
    handleMatchedCards: (state, action) => {
      const matchedCards = state.cards.map(card => {
        if(card.filePath === action.payload.filePath) {
          return { ...card, matched: true }
        } else {          
          return card
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

export const { 
  reset, 
  handleChosenCard, 
  handleMatchedCards,
  resetCertainState,
  setDisabledCard,
  startTimer,
  resetTimerIsLost,
  resetTimerIsWon,
  setIntervalId
 } = cardSlice.actions
 
export default cardSlice.reducer
