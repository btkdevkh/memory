import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function Alert({ children }: Props) {  
  return (
    <div className="alert">
      { children }
    </div>
  )
}
