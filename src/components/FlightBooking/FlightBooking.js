import React from "react";
// import moment from "moment";
import "./FlightBooking.css";


class FlightBooking extends React.Component {
  state = {
    startDate: "",
    minStartDate: "",
    maxStartDate:"",
    returnDate: "",
    minReturnDate: "",
  };
  componentDidMount() {
    this.setStartDate();
    this.setReturnDate();
  }
  setStartDate = () => {
    let currentDate = new Date();
    let dd = currentDate.getDate();
    let mm = currentDate.getMonth()+1;
    let yyyy = currentDate.getFullYear();
    let yyyyMax = yyyy + 1;
    if (dd < 10) {
      dd = "0" + dd
    }
    if (mm < 10) {
      mm = "0" + mm
    }
    let maxStartDate=`${yyyyMax}-${mm}-${dd}`
    let startDate= `${yyyy}-${mm}-${dd}`
    this.setState({
      startDate: startDate,
      minStartDate: startDate,
      maxStartDate: maxStartDate,
    })
  };
  setReturnDate = () => {
    let currentDate = new Date();
    let dd = currentDate.getDate()+1;
    let mm = currentDate.getMonth()+1;
    let yyyy = currentDate.getFullYear();
    if (dd < 10) {
      dd = "0" + dd
    }
    if (mm < 10) {
      mm = "0" + mm
    }
    let returnDate= `${yyyy}-${mm}-${dd}`
    
    this.setState({
      returnDate: returnDate,
      minReturnDate: returnDate,

    })
  };

  handleStartDateChange = (e) => {
    
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value)

    
      let day = new Date(value);
      let dd = day.getDate();
      let mm = day.getMonth();
      let yyyy = day.getFullYear();
      let minReturnDate = `${yyyy}-${mm}-${dd}`;
     console.log("minimlany dzien powrotu",minReturnDate, typeof(minReturnDate))
    
      this.setState({
        startDate: value,
        returnDate: value,
        minReturnDate: value,
      });
  };
  
  handleReturnDateChange = (e) => {
    
    const name = e.target.name;
    const value = e.target.value;
    console.log("w return: ",name, value)

  

      this.setState({
        [name]: value,
      });
    };
  
  render() {
    console.log("Data startu", this.state.startDate,typeof(this.state.startDate));
    console.log("Data powrotu", this.state.returnDate, typeof(this.state.returnDate));
    console.log("Min data powrotu:",this.state.minReturnDate, typeof(this.state.minReturnDate))
    
    
    return (
      <div className={"FlightBooking"}>
        <form onSubmit={this.props.handleLoginSubmit}>
            <h2>
              Wybierz rezerwacje
            </h2>
            <div className="departure">
                  <label for="departureCity">Wylot:</label>
                  <select name="departureCity" id="departureCity" form="departureCity">
                  <option value="Kraków">Kraków</option>
                  <option value="Warszawa">Warszawa</option>
                  <option value="Tokio">Tokio</option>
                  <option value="Paryż">Paryż</option>
                  </select>
              </div>
            <div className="arrival">
                <label for="arrivalCity">Przylot:</label>
                <select name="arrivalCity" id="arrivalCity" form="arrivalCity">
                <option value="Kraków">Kraków</option>
                <option value="Warszawa">Warszawa</option>
                <option value="Tokio">Tokio</option>
                <option value="Paryż">Paryż</option>
                </select>
            </div>
            <div className={"departureDate"}>
              <label for="start">Data wylotu:</label>
              <input type="date"
                id="startDate"
                name="startDate"
                value={this.state.startDate}
                onChange={this.handleStartDateChange}
                min={this.state.minStartDate}
                max={this.state.maxStartDate}
            />
          </div>
          <div className={"arrivalDate"}>
              <label for="return">Data powrotu:</label>
              <input type="date"
                id="returnDate"
                name="returnDate"
                value={this.state.returnDate}
                onChange={this.handleReturnDateChange}
                min={this.state.minReturnDate}
                max={this.state.maxStartDate}
              />
            </div>
        </form>
      </div>
        
    );
  }
}
export default FlightBooking;

