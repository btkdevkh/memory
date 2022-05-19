import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store'
import { getCards, handleChosenCard } from '../../features/cards/cardSlice';
import ICard from '../../types/Card';
import Alert from '../Alert';
import Progressbar from '../Progressbar';
import OostaooCard from './OostaooCard';

// initial time(s)
let TIME_IN_SECOND = 60

export default function OostaooCards() {
  // redux state
  const dispatch = useDispatch<AppDispatch>()
  const { cards } = useSelector((state: RootState) => state.cards) 
  
  // component states
  const [chosenFirstCard, setChosenFirstCard] = useState<ICard | null>(null)
  const [chosenSecondCard, setChosenSecondCard] = useState<ICard | null>(null)
  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState<any>(0);
  const [isWinner, setIsWinner] = useState(false)
  const [isLooser, setIsLooser] = useState(false)
  const [disabledCard, setDisabledCard] = useState(false)

  const resetLocalState = () => {
    setChosenFirstCard(null)
    setChosenSecondCard(null)

    setIsWinner(false)
    setIsLooser(false)
    setDisabledCard(false)
  }

  const startTimer = () => {
    if(intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }

    const newIntervalId = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    setIntervalId(newIntervalId);
  }

  const allMatchedCards = (element: ICard) => {
    return element.matched
  }

  const handleClickChooseCard = (card: ICard) => {
    startTimer()

    chosenFirstCard ? 
    setChosenSecondCard(card) : 
    setChosenFirstCard(card)
  }

  const handleClickRestart = () => {
    dispatch(getCards())
    resetLocalState()
  }

  // useEffect 4
  useEffect(() => {
    if(count > TIME_IN_SECOND) {
      if(intervalId) {
        clearInterval(intervalId);
        setIntervalId(0);
        setCount(0)

        setIsLooser(true)
        setDisabledCard(true)
      }
    }   
  }, [count])

  // useEffect 3
  useEffect(() => {
    if(cards.every(allMatchedCards)) {
      clearInterval(intervalId);
      setIntervalId(0);
      setCount(0)

      setIsWinner(true)
      setDisabledCard(true)
    }
  }, [cards])

  // useEffect 2
  useEffect(() => {
    if(chosenFirstCard && chosenSecondCard) {   
      setDisabledCard(true)

      if(chosenFirstCard.filePath === chosenSecondCard.filePath) {
        dispatch(handleChosenCard(chosenFirstCard))

        resetLocalState()
      } else {
        setTimeout(() => resetLocalState(), 1000)
      }
    }
  }, [chosenFirstCard, chosenSecondCard])

  // useEffect 1
  useEffect(() => {
    dispatch(getCards())
    resetLocalState()
  }, [dispatch])
  
  return (
    <Fragment>
      { 
        isWinner && (
          <Alert>
            <p>Bravo ! <br /> Vous avez gangé</p>
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
          cards.map((card) => (
            <OostaooCard  
              key={card.id}
              card={card}
              handleClickChooseCard={handleClickChooseCard}
              matched={
                card === chosenFirstCard || 
                card === chosenSecondCard ||
                card.matched as boolean
              }
              disabledCard={disabledCard}
            />
          ))
        }
      </div>
    </Fragment>
  )
}
