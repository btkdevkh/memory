import ICard from "../../types/Card"
import cover from '../../assets/img/cover.png'

type Props = {
  card: ICard,
  handleClickChooseCard: Function,
  matched: boolean,
  disabledCard: boolean
}

export default function OostaooCard({ card, handleClickChooseCard, matched, disabledCard }: Props) {
  const { title, filePath } = card

  const handleClickOnCard = (card: ICard) => {
    if(!disabledCard) handleClickChooseCard(card)
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
