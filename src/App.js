import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  let [countriesList, setCountriesList] = useState([]);
  let [selectedCountry, setSelectedCountry] = useState("");
  let [statesList, setStatesList] = useState([]);
  let [selectedState, setSelectedState] = useState("");
  let [cityList, setCityList] = useState([]);
  let [selectedCity, setSelectedCity] = useState("");

  let getCountries = ()=>{
    fetch('https://crio-location-selector.onrender.com/countries')
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        setCountriesList(data);
      })
      .catch((err)=>{
        console.log("error is ", err); })
  }
  
  let handleCountryChange = (e)=>{
    setSelectedCountry(e.target.value);
    fetch(`https://crio-location-selector.onrender.com/country=${e.target.value}/states`)
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        setStatesList(data);
      })
      .catch((err)=>{
        console.log("error is ", err);
      })

    setCityList([]);
  }
  let handleStateChange = (e)=>{
    setSelectedState(e.target.value);
    // if(selectedState === ""){
    //   return;
    // }
    let url = `HTTPS://crio-location-selector.onrender.com/country=${selectedCountry}/state=${e.target.value}/cities`;
    fetch(`HTTPS://crio-location-selector.onrender.com/country=${selectedCountry}/state=${e.target.value}/cities`)
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        setCityList(data);
      })
      .catch((err)=>{
        console.log("error is ", err);
      })

  }

  let handleCityChange = (e)=>{
    setSelectedCity(e.target.value);
  }

  useEffect(()=>{
    getCountries();
  },[])

  useEffect(()=>{

  },[selectedCountry,selectedState])
  
  return (
    <div className="App">
      <h1>Select Location</h1>
      <select onChange={handleCountryChange} name="countries" id="countries">
        <option hidden disabled>Select Country</option>
        {countriesList.map((country)=>{
          return <option value={country}>{country}</option>
        })}
      </select>
      <select onChange={handleStateChange} name="state" id="state">
        <option hidden disabled>Select State</option>
        {statesList.map((state)=>{
          return <option value={state}>{state}</option>
        })}
      </select>
      <select onChange={handleCityChange} name="city" id="city">
        <option hidden disabled>Select City</option>
        {cityList.map((country)=>{
          return <option value={country}>{country}</option>
        })}
      </select>
      {selectedCity &&
        <p style={{fontWeight:"bold"}}>You selected {selectedCity}, <span style={{color:"gray"}} >{selectedState}, {selectedCountry}</span>  </p>
      }

    </div>
  );
}

export default App;
