import '../../assets/styles/common.scss'

interface Props {
  primary: string
  secondary?: string
}

const FeedbackCard: React.FC<Props> = (props) => {
  return (
    <div className="feedback-card">
      <div className="feedback-card__container">
        <div className="feedback-card__container__image">{props.children}</div>
        <div className="feedback-card__container__text">
          <div className="feedback-card__container__text__primary">
            {props.primary}
          </div>
          <div className="feedback-card__container__text__secondary">
            {props.secondary}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackCard
