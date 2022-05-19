import { cards } from '../../data/cards'
import { v4 as uuidv4 } from 'uuid';
import ICard from '../../types/Card';

const getCards = async () => {
  const res = await cards  
  return shuffleCards(res)
}

const shuffleCards = (cards: ICard[]) => {
  const suffledCards = [...cards, ...cards]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: uuidv4() }))
  return suffledCards
}

const cardService = {
  getCards,
  shuffleCards,
}

export default cardService
