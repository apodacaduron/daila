import '../../assets/styles/common.scss'

interface Props {
  primary: string
  secondary: string
}

const TitleBar: React.FC<Props> = (props) => {
  return (
    <div className="title-bar">
      <div className="title-bar__text">
        <div className="title-bar__text__primary">{props.primary}</div>
        <div className="title-bar__text__secondary">{props.secondary}</div>
      </div>
      <div className="title-bar__actions">{props.children}</div>
    </div>
  )
}

export default TitleBar
