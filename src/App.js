import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importing uuid v4 as uuidv4

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue'];

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    latestList: [],
    isShow: false,
    searchInput: '',
  };

  // Event handlers for input fields
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Add new password entry
  addContent = (e) => {
    e.preventDefault();
    const { website, username, password } = this.state;
    const initial = website.slice(0, 1).toUpperCase();
    const classValue = colorList[Math.floor(Math.random() * colorList.length)]; // Fixed random color selection
    const newValues = {
      id: uuidv4(), // Generating unique id
      initialValue: initial,
      websiteName: website,
      userName: username,
      password: password, // Note: password field should generally not be stored in plain text like this in a real application
      classAdd: classValue,
    };
    this.setState((prevState) => ({
      latestList: [...prevState.latestList, newValues], // Using spread operator to correctly update array state
      website: '',
      username: '',
      password: '',
    }));
  };

  // Toggle show password
  showPassword = (e) => {
    this.setState({ isShow: e.target.checked });
  };

  // Handle search input
  searchList = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  // Delete password entry
  deleteItem = (id) => {
    const { latestList } = this.state;
    const newList = latestList.filter((item) => item.id !== id);
    this.setState({ latestList: newList });
  };

  render() {
    const { website, username, password, latestList, isShow, searchInput } = this.state;

    // Filtered list based on search input
    const filteredList = latestList.filter((item) =>
      item.websiteName.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Determine if no passwords match search input
    const noPasswordsMatchSearch = searchInput.trim() !== '' && filteredList.length === 0;

    return (
      <div>
        <img
          alt="app logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        />
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
          <form onSubmit={this.addContent}>
            <h1>Add New Password</h1>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                name="website"
                value={website}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">Add</button>
          </form>
          <img
            alt="password manager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          />
        </div>
        <div>
          <div>
            <div>
              <h1>Your Passwords</h1>
              <p>{filteredList.length}</p>
            </div>
            <div>
              <img
                alt="search"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              />
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.searchList}
              />
            </div>
          </div>
          <hr />
          <div>
            <input
              type="checkbox"
              id="check"
              onChange={this.showPassword}
              checked={isShow}
            />
            <label htmlFor="check">Show Passwords</label>
          </div>
          {noPasswordsMatchSearch && (
            <p>No Passwords</p>
          )}
          {!noPasswordsMatchSearch && filteredList.length > 0 && (
            <ul>
              {filteredList.map((item) => (
                <li key={item.id}>
                  <p>{item.initialValue}</p>
                  <div>
                    <p>{item.websiteName}</p>
                    <p>{item.userName}</p>
                    {!isShow && (
                      <img
                        alt="stars"
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                      />
                    )}
                    {isShow && <p>{item.password}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => this.deleteItem(item.id)}
                    data-testid="delete"
                  >
                    <img
                      alt="delete"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default App;
