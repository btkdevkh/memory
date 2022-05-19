type Props = {
  title: string
}

export default function MainTitle(props: Props) {
  return (
    <h1 className="main-title">{props.title}</h1>
  )
}
