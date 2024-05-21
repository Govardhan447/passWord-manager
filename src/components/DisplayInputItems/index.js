import {Component} from 'react'
import './index.css'

class DisplayInputItems extends Component {
  onclickDelete = () => {
    const {updatePasswordList, passwordDetails} = this.props
    const {id} = passwordDetails
    updatePasswordList(id)
  }

  render() {
    const {passwordDetails, isPasswordShow} = this.props
    const {username, website, password, classname} = passwordDetails

    console.log(classname)
    const classNaming = `initial-heading ${classname}`

    const passWord = isPasswordShow ? (
      <p className="paragraph">{password}</p>
    ) : (
      <img
        className="stars"
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        alt="stars"
      />
    )

    return (
      <li className="details-container">
        <div className="intial-container">
          <h1 className={classNaming}>{website[0].toUpperCase()}</h1>
        </div>
        <div className="password-Details-container">
          <p className="paragraph">{website}</p>
          <p className="paragraph">{username}</p>
          {passWord}
        </div>
        <div className="delete-container">
          <button
            className="btn-delete"
            type="button"
            onClick={this.onclickDelete}
            testid="delete"
          >
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
}
export default DisplayInputItems
