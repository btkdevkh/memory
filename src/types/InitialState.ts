import ICard from "./Card"

interface IInitialState {
  cards: ICard[],
  chosenFirstCard: ICard | null,
  chosenSecondCard: ICard | null,
  count: number,
  intervalId: any,
  isWinner: boolean,
  isLooser: boolean,
  disabledCard: boolean,
  isError: boolean,
  isSucess: boolean,
  isLoading: boolean,
  message: string
}

export default IInitialState
