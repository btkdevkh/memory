import ICard from "./Card"

interface IInitialState {
  cards: ICard[],
  isError: boolean,
  isSucess: boolean,
  isLoading: boolean,
  message: string
}

export default IInitialState