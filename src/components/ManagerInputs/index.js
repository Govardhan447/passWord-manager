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
    showPropertie: constantValues.noPassword,
  }

  onsubmitForm = event => {
    event.preventDefault()
    const {website, username, password, classNameDetails} = this.state

    const randomNum = Math.ceil(Math.random() * 10)

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

    this.setState(prevState => ({
      passwordMangerListDetails: [
        ...prevState.passwordMangerListDetails,
        newList,
      ],
      website: '',
      username: '',
      password: '',
      showPropertie: constantValues.setPassword,
    }))
  }

  updatePasswordList = id => {
    console.log(id)
    const {passwordMangerListDetails} = this.state

    const updateList = passwordMangerListDetails.filter(item => item.id !== id)

    this.setState({
      passwordMangerListDetails: updateList,
      showPropertie: constantValues.setPassword,
    })
  }

  onchangeSearch = event => {
    const {passwordMangerListDetails} = this.state
    const searchvalue = event.target.value
    this.setState({searchValue: searchvalue})

    console.log('searching')
    const searchList = passwordMangerListDetails.filter(item =>
      item.website.toLowerCase().includes(searchvalue.toLowerCase()),
    )
    console.log(searchList)
    if (searchList.length === 0) {
      this.setState({showPropertie: constantValues.noPassword})
    } else if (event.target.value === '') {
      this.setState({
        showPropertie: constantValues.setPassword,
        searchListDetails: searchListItems,
      })
    } else {
      this.setState({
        searchListDetails: searchList,
        showPropertie: constantValues.searchPassword,
      })
    }
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

  getPasswordListStatus = () => {
    const {passwordMangerListDetails} = this.state
    if (passwordMangerListDetails.length === 0) {
      this.setState({showPropertie: constantValues.noPassword})
    } else {
      this.setState({showPropertie: constantValues.setPassword})
    }
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

    const passwordlistItems = passwordMangerListDetails.length

    switch (showPropertie) {
      case constantValues.noPassword:
        console.log('no Password')
        return this.getNoPasswordImage()
      case constantValues.setPassword:
        return passwordlistItems === 0 ? (
          this.getNoPasswordImage()
        ) : (
          <ul className="password-items-container-list">
            {passwordMangerListDetails.map(item => (
              <DisplayInputItems
                passwordDetails={item}
                key={item.id}
                updatePasswordList={this.updatePasswordList}
                isPasswordShow={isPasswordShow}
              />
            ))}
          </ul>
        )
      case constantValues.searchPassword:
        return (
          <ul className="password-items-container-list">
            {searchListDetails.map(item => (
              <DisplayInputItems
                passwordDetails={item}
                key={item.id}
                updatePasswordList={this.updatePasswordList}
                isPasswordShow={isPasswordShow}
              />
            ))}
          </ul>
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
      <p className="noPassword-heading">No Passwords</p>
    </div>
  )

  render() {
    const {
      searchValue,
      passwordMangerListDetails,
      showPropertie,
      searchListDetails,
    } = this.state

    const passwordsItems =
      showPropertie === constantValues.setPassword
        ? passwordMangerListDetails
        : searchListDetails
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
            <h1 className="password-heading">
              Your Passwords
              <p className="password-counts">{passwordsItems.length}</p>
            </h1>
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
          <ul>{this.getPasswordListItems()}</ul>
        </div>
      </div>
    )
  }
}
export default ManagerInputs
