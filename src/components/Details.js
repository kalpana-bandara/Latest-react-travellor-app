import React, { useContext, useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import CountryNameContext from "../CountryNameContext";

const Details = () => {
  const {
    country: [countryName],
    population: [populationNumber],
    currency: [currencyName],
    capital: [capitalName],
  } = useContext(CountryNameContext);

  const images = [];
  const [image, setImage] = useState([]);

  image.forEach((i) => {
    images.push(i.urls.regular);
  });
  useEffect(() => {
    function getCountryImages() {
      const unsplash = createApi({
        accessKey: "gdm_-u4ujXDDMlp9metg0Jyg5tKhCtNMIueL0kkl8fE",
      });
      unsplash.search
        .getPhotos({
          query: `${countryName}`,
          page: 1,
          perPage: 2,
        })
        .then((result) => {
          if (result.errors) {
            // handle error here
            console.log("error occurred: ", result.errors[0]);
          } else {
            // handle success here
            const photo = result.response;
            setImage(photo.results);
          }
        });
    }
    getCountryImages();
  }, [countryName]);

  if (countryName === "") {
    return null;
  } else {
    return (
      <section className="page-section">
        <div className="wrapper">
          <div className="detail-box">
            <div className="left">
              <h2>{countryName}</h2>

              <div className="facts-box">
                <div className="facts">
                  <div className="factsHead">
                    <p>Popuation</p>
                    <p>Currency</p>
                    <p>Capital</p>
                    <p>No. of crimes in last month</p>
                  </div>
                  <div className="factsDetails">
                    <p>{populationNumber ? populationNumber : "loading"}</p>
                    <p>{currencyName ? currencyName : "loading"}</p>
                    <p>{capitalName ? capitalName : "loading"}</p>
                    <p>10 crimes</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="image-one">
                <img src={images[0]} alt="" />
              </div>
              <div className="image-two">
                <img src={images[1]} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Details;
