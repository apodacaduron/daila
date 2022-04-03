import '../../assets/styles/common.scss'

interface Props {
  actions: React.ReactNode
}

const TableToolbar: React.FC<Props> = (props) => {
  return (
    <div className="table-toolbar">
      <div className="table-toolbar__primary">{props.children}</div>
      <div className="table-toolbar__actions">{props.actions}</div>
    </div>
  )
}

export default TableToolbar
