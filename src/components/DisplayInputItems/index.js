import './index.css'

const DisplayInputItems = props => {
  const {passwordDetails, updatePasswordList, isPasswordShow} = props
  const {id, username, website, password, classname} = passwordDetails

  console.log(classname)
  const classNaming = `initial-heading ${classname}`

  const passWord = isPasswordShow ? password : '***********'

  const onclickDelete = () => {
    updatePasswordList(id)
    console.log(id)
  }

  return (
    <li className="details-container">
      <div className="intial-container">
        <h1 className={classNaming}>{website[0].toUpperCase()}</h1>
      </div>
      <div className="password-Details-container">
        <p className="paragraph">{website}</p>
        <p className="paragraph">{username}</p>
        <p className="paragraph">{passWord}</p>
      </div>
      <div className="delete-container" data-testid="delete">
        <button className="btn-delete" type="button" onClick={onclickDelete}>
          <img
            className="delete-icon"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default DisplayInputItems
