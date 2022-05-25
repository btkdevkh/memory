import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store'
import { 
  getCards, 
  handleMatchedCards, 
  resetCertainState, 
  resetTimerIsLost, 
  resetTimerIsWon,
  setDisabledCard, 
} from '../../features/cards/cardSlice';
import ICard from '../../types/Card';
import Alert from '../Alert';
import Progressbar from '../Progressbar';
import GameCard from './GameCard';

// initial time(s)
let TIME_IN_SECOND = 60

export default function GameCards() {
  // redux state
  const dispatch = useDispatch<AppDispatch>()
  const { 
    cards, 
    chosenFirstCard, 
    chosenSecondCard,
    count,
    intervalId,
    isWinner,
    isLooser,
  } = useSelector((state: RootState) => state.cards) 

  const allMatchedCards = (card: ICard) => card.matched

  const handleClickRestart = () => {
    dispatch(getCards())
    dispatch(resetCertainState())
  }

  // useEffect 4
  useEffect(() => {
    if(count > TIME_IN_SECOND) {
      if(intervalId) dispatch(resetTimerIsLost())
    }   
  }, [count, intervalId, dispatch])

  // useEffect 3
  useEffect(() => {
    if(cards.every(allMatchedCards)) dispatch(resetTimerIsWon())
  }, [cards, dispatch])

  // useEffect 2
  useEffect(() => {
    if(chosenFirstCard && chosenSecondCard) {  
      dispatch(setDisabledCard(true)) 

      if(chosenFirstCard.filePath === chosenSecondCard.filePath) {        
        dispatch(handleMatchedCards(chosenFirstCard))
        dispatch(resetCertainState())
      } else {
        setTimeout(() => dispatch(resetCertainState()), 1000)
      }
    }
  }, [chosenFirstCard, chosenSecondCard, dispatch])

  // useEffect 1
  useEffect(() => {
    dispatch(getCards())
    dispatch(resetCertainState())
  }, [dispatch])
  
  return (
    <Fragment>
      { 
        isWinner && (
          <Alert>
            <p>Bravo ! <br /> Vous avez gagné</p>
            <button onClick={handleClickRestart}>Rejouer</button>
          </Alert>
        )
      }

      {
        isLooser && (
          <Alert>
            <p>Perdu ! <br /> Ce n'est pas grave, réessayez</p>
            <button onClick={handleClickRestart}>Rejouer</button>
          </Alert>
        )
      }
      <Progressbar 
        count={count} 
        timeInSecond={TIME_IN_SECOND} 
      />
      <div className='oostaoo-cards'>
        {
          cards &&
          cards.length > 0 &&
          cards.map((card: ICard) => (
            <GameCard  
              key={card.id}
              card={card}
            />
          ))
        }
      </div>
    </Fragment>
  )
}
