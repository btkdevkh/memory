import ICard from "../../types/Card"
import cover from '../../assets/img/cover.png'
import { handleChosenCard, setIntervalId, startTimer } from '../../features/cards/cardSlice';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";

type Props = {
  card: ICard
}

export default function OostaooCard({ card }: Props) {
  const { title, filePath } = card

  const dispatch = useDispatch<AppDispatch>()
  const { 
    disabledCard, 
    chosenFirstCard, 
    chosenSecondCard, 
    intervalId,
  } = useSelector((state: RootState) => state.cards) 

  const matched = 
    card === chosenFirstCard || 
    card === chosenSecondCard || 
    card.matched as boolean

  const handleClickOnCard = (card: ICard) => {  
    if(intervalId) {
      clearInterval(intervalId);
      dispatch(setIntervalId(0))
    } 
    
    const newIntervalId = setInterval(() => {
      !disabledCard && dispatch(startTimer())      
    }, 1000)

    dispatch(setIntervalId(newIntervalId))

    if(!disabledCard) dispatch(handleChosenCard(card))
  }
  
  return (
    <div className="oostaoo-card-item">
      <div className={matched ? 'flipped' : ''}>
        <img 
          className="reveal-card" 
          src={filePath} alt={title} 
        />
        <img 
          className="cover-card" 
          src={cover} alt="JS cover" 
          onClick={() => handleClickOnCard(card)}
        />
      </div>
    </div>
  )
}
