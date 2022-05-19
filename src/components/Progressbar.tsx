import { useEffect, useRef, Fragment } from "react"

type Props = {
  count: number
  timeInSecond: number
}

export default function Progressbar({ count, timeInSecond }: Props) {
  const progressbarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if(count > timeInSecond) {
      progressbarRef.current!.style.width = `0%`
    } else {
      const percents = `${Math.ceil((count / timeInSecond * 100))}%`      
      progressbarRef.current!.style.width = percents
    }
  }, [count])
  
  return (
    <Fragment>
      <div className='progressbar-container'>
        <i className="fa-solid fa-clock"></i>
        <div 
          ref={progressbarRef}
          className='progressbar'
        >
        </div>
      </div>
    </Fragment>
  )
}
