import React from 'react';
import './App.css';
import NavBar from "./NavBar/NavBar";
import LoginPanel from "./LoginPanel/LoginPanel";
import FlightBooking from "./FlightBooking/FlightBooking"

class App extends React.Component {
  
    state = {
      message: null,
      errorsList: "",
      isActiveLogPanel: false,
      email: "",
      password: "",
    };
    
    handleShowLoginPanel = () => {
      this.setState({
        isActiveLogPanel: !this.state.isActiveLogPanel,
      });
    };
  handleLoginChange = (e) => {
      
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value)
      this.setState({
        [name]: value,
      });
    };
  
    handleLoginSubmit = (e) => {
      e.preventDefault();
  
      fetch("https://http://localhost:3000/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.authenticated) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("accessLevel", data.accessLevel);
            localStorage.setItem("islogged", data.islogged);
            localStorage.setItem("user", JSON.stringify(data.user));
          }
          this.setState({
            errorsList: data.errors,
            message: data.message,
            islogged: data.islogged,
            accessLevel: data.accessLevel,
            email: data.email,
            password: "",
          });
        });
    };
    handleLogout = () => {
      fetch("https://http://localhost:3000/users/logout", {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw Error(response.status);
        })
        .then((response) => response.json())
        .then((data) => {
          localStorage.clear();
          this.setState({
            message: data.message,
            islogged: data.islogged,
            accessLevel: data.accessLevel,
          });
        })
        .catch((error) => console.log(error));
    };
  
  
    render(){
      return (
      <>
          <NavBar
            handleShowLoginPanel={this.handleShowLoginPanel} />
         
      {this.state.isActiveLogPanel ? (
        <LoginPanel
          handleLogout={this.handleLogout}
          islogged={this.state.islogged}
          message={this.state.message}
          errorsList={this.state.errorsList}
          handleShowLoginPanel={this.handleShowLoginPanel}
          email={this.state.email}
          password={this.state.password}
          handleLoginChange={this.handleLoginChange}
          handleLoginSubmit={this.handleLoginSubmit}
        />
          ) : null}
           <FlightBooking />
    </>
    );
  };
};

export default App;
