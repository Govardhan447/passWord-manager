import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import DisplayInputItems from '../DisplayInputItems'
import './index.css'

const passwordManagerList = []
const classnamesList = [
  {
    id: 1,
    classname: 'green',
  },
  {
    id: 2,
    classname: 'red',
  },
  {
    id: 3,
    classname: 'orange',
  },
  {
    id: 4,
    classname: 'blue',
  },
  {
    id: 5,
    classname: 'skyblue',
  },
  {
    id: 7,
    classname: 'lightBlue',
  },
  {
    id: 8,
    classname: 'oxfordblue',
  },
  {
    id: 9,
    classname: 'merun',
  },
  {
    id: 10,
    classname: 'white',
  },
]

const constantValues = {
  noPassword: 'NOPASSWORD',
  setPassword: 'SETPASSWORD',
  searchPassword: 'SEARCHPASSWORD',
}
const searchListItems = []

class ManagerInputs extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    searchValue: '',
    passwordMangerListDetails: passwordManagerList,
    classNameDetails: classnamesList,
    isPasswordShow: false,
    searchListDetails: searchListItems,
    showPropertie: 'NOPASSWORDS',
  }

  onsubmitForm = event => {
    event.preventDefault()
    const {website, username, password, classNameDetails} = this.state
    const randomNum = Math.ceil(Math.random() * 10)
    console.log(randomNum)

    const randomclassname = classNameDetails.filter(
      eachitem => eachitem.id === randomNum,
    )

    const newList = {
      id: uuidv4(),
      website,
      username,
      password,
      classname: randomclassname[0].classname,
    }
    console.log(newList)

    this.setState(prevState => ({
      passwordMangerListDetails: [
        ...prevState.passwordMangerListDetails,
        newList,
      ],
      website: '',
      username: '',
      password: '',
    }))
  }

  updatePasswordList = id => {
    console.log(id)
    const {passwordMangerListDetails} = this.state

    const updateList = passwordMangerListDetails.filter(item => item.id !== id)

    this.setState({searchList: updateList})
  }

  onchangeSearch = event => {
    const {passwordMangerListDetails} = this.state
    const searchvalue = event.target.value

    const searchList = passwordMangerListDetails.filter(item =>
      item.website.toLowerCase().includes(searchvalue.toLowerCase()),
    )
    this.setState({
      searchListDetails: searchList,
      searchValue: searchvalue,
    })
  }

  onchangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onchangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  onclickCheckBox = () => {
    this.setState(prevState => ({isPasswordShow: !prevState.isPasswordShow}))
  }

  getInputsContainer = () => {
    const {website, username, password} = this.state
    return (
      <div className="password-manager-container">
        <form className="inputs-container" onSubmit={this.onsubmitForm}>
          <h1 className="heading">Add New Password</h1>
          <div className="input-container">
            <div className="logo-container">
              <img
                className="logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
            </div>
            <input
              className="input"
              type="text"
              value={website}
              onChange={this.onchangeWebsite}
              placeholder="Enter Website"
            />
          </div>
          <div className="input-container">
            <div className="logo-container">
              <img
                className="logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
            </div>
            <input
              className="input"
              type="text"
              value={username}
              onChange={this.onchangeUsername}
              placeholder="Enter Username"
            />
          </div>
          <div className="input-container">
            <div className="logo-container">
              <img
                className="logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
            </div>
            <input
              className="input"
              type="password"
              value={password}
              onChange={this.onchangePassword}
              placeholder="Enter Password"
            />
          </div>
          <button className="button" type="submit">
            Add
          </button>
        </form>
        <img
          className="password-image"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          alt="password manager"
        />
      </div>
    )
  }

  getPasswordListItems = () => {
    const {
      passwordMangerListDetails,
      searchListDetails,
      showPropertie,
      isPasswordShow,
    } = this.state
    if (passwordManagerList.length !== 0) {
      this.setState({showPropertie: constantValues.setPassword})
    } else if (searchListDetails !== 0) {
      this.setState({showPropertie: constantValues.searchPassword})
    } else {
      this.setState({showPropertie: constantValues.noPassword})
    }
    switch (showPropertie) {
      case constantValues.noPassword:
        return this.getNoPasswordImage()
      case constantValues.setPassword:
        return (
          <>
            {passwordMangerListDetails.map(item => (
              <DisplayInputItems
                passwordDetails={item}
                key={item.id}
                updatePasswordList={this.updatePasswordList}
                isPasswordShow={isPasswordShow}
              />
            ))}
          </>
        )
      case constantValues.searchPassword:
        return (
          <>
            {searchListDetails.map(item => (
              <DisplayInputItems
                passwordDetails={item}
                key={item.id}
                updatePasswordList={this.updatePasswordList}
                isPasswordShow={isPasswordShow}
              />
            ))}
          </>
        )
      default:
        return null
    }
  }

  getNoPasswordImage = () => (
    <div className="nopassword-container">
      <img
        className="nopassword-image"
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
      />
      <p className="password-heading">No Passwords</p>
    </div>
  )

  render() {
    const {searchValue, passwordMangerListDetails} = this.state
    return (
      <div className="bg-container">
        <div>
          <img
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
        </div>
        {this.getInputsContainer()}
        <div className="password-items-container">
          <div className="password-search-container">
            <p className="password-heading">
              Your Passwords{' '}
              <span className="password-counts">
                {passwordMangerListDetails.length}
              </span>
            </p>
            <div className="search-container">
              <div className="search-image">
                <img
                  className="logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
              </div>
              <input
                className="search-input"
                type="search"
                value={searchValue}
                onChange={this.onchangeSearch}
                placeholder="Search"
              />
            </div>
          </div>
          <div className="checkbox-container">
            <input
              className="checkbox-input"
              type="checkbox"
              id="showPassword"
              onClick={this.onclickCheckBox}
            />
            <label className="label" htmlFor="showPassword">
              Show Passwords
            </label>
          </div>
          <ul className="password-items-container-list">
            {this.getPasswordListItems()}
          </ul>
        </div>
      </div>
    )
  }
}
export default ManagerInputs
