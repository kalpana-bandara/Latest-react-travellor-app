import React, { useState, useContext } from "react";
import $ from "jquery";
import axios from "axios";
import CountryNameContext from "../CountryNameContext";

const SearchForm = () => {
  //get All countries and capitals
  const {
    countries,
    population: [, setPopulationNumber],
    country: [, setCountryName],
    currency: [, setCurrencyName],
    capital: [, setCapitalName],
  } = useContext(CountryNameContext);

  const [matchedCountries, setMatchedCountries] = useState([]);

  const countriess = [];
  countries.forEach((countryAndCapital) => {
    const countries = countryAndCapital.name;
    countriess.push(countries);
  });

  let timeOut;

  function openCountries(e) {
    let countryName = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);

    if (countryName === "") {
      $(".countryList").hide();
    } else {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        setMatchedCountries(countriess.filter((name) => name.includes(countryName)));
        $(".countryList").show();
      }, 500);
    }
  }

  function assignValue(e) {
    $("#place").val(e.target.innerText);
    $(".countryList").hide();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (countriess.includes($("#place").val())) {
      setCountryName($("#place").val());
    }
    const config = {
      method: "post",
      url: "https://countriesnow.space/api/v0.1/countries/population",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        country: `${$("#place").val()}`,
      }),
    };
    axios(config)
      .then(function (response) {
        let populationCount = response.data.data.populationCounts;
        populationCount = populationCount[populationCount.length - 1].value;
        setPopulationNumber(populationCount);
      })
      .catch(function (error) {
        console.log(error);
      });

    var configg = {
      method: "post",
      url: "https://countriesnow.space/api/v0.1/countries/currency",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        country: `${$("#place").val()}`,
      }),
    };

    axios(configg)
      .then(function (response) {
        setCurrencyName(response.data.data.currency);
      })
      .catch(function (error) {
        console.log(error);
      });

    var configggg = {
      method: "post",
      url: "https://countriesnow.space/api/v0.1/countries/capital",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        country: `${$("#place").val()}`,
      }),
    };

    axios(configggg)
      .then(function (response) {
        setCapitalName(response.data.data.capital);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <React.Fragment>
      <div className="searchForm">
        <form action="#" method="post">
          <div className="searchField">
            <input type="text" name="place" id="place" placeholder="where do you want to go?" onKeyUp={openCountries} autoComplete="off" />
            <div className="countryList" id="countryList">
              <ul>
                {matchedCountries.length > 0 ? (
                  matchedCountries.map((country, index) => {
                    return (
                      <li key={index} onClick={assignValue}>
                        {country}
                      </li>
                    );
                  })
                ) : (
                  <li>No Country found</li>
                )}
              </ul>
            </div>
            <button type="submit" onClick={handleSubmit}>
              <img className="forwardBtn" src="images/Forward-button.png" alt="" />
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default SearchForm;
