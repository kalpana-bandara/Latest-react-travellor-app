import { createContext, useState, useEffect } from "react";
import axios from "axios";

const CountryNameContext = createContext();

export function CountryNameProvider({ children }) {
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState([]);
  const [populationNumber, setPopulationNumber] = useState();
  const [currencyName, setCurrencyName] = useState();
  const [capitalName, setCapitalName] = useState();

  useEffect(() => {
    function getCountries() {
      const config = {
        method: "get",
        url: "https://countriesnow.space/api/v0.1/countries/capital",
        headers: {},
      };
      axios(config)
        .then(function (response) {
          const data = response.data.data;
          const countriesAndCapitals = [];
          for (let i = 0; i < data.length; i++) {
            countriesAndCapitals.push(data[i]);
          }
          setCountries(countriesAndCapitals);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    getCountries();
  }, []);
  return <CountryNameContext.Provider value={{ countries, capital: [capitalName, setCapitalName], currency: [currencyName, setCurrencyName], country: [countryName, setCountryName], population: [populationNumber, setPopulationNumber] }}>{children}</CountryNameContext.Provider>;
}

export default CountryNameContext;
