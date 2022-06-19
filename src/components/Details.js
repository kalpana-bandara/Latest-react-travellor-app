import React, { useContext, useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import CountryNameContext from "../CountryNameContext";
import axios from "axios";

const Details = () => {
  const {
    country: [countryName],
    population: [populationNumber],
    currency: [currencyName],
    capital: [capitalName],
  } = useContext(CountryNameContext);

  const [image, setImage] = useState([]);
  const [violentCount, setViolentCount] = useState();

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
    function getViolencedata() {
      const config = {
        method: "post",
        url: "/violentrate",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          country: `${countryName}`,
        }),
      };
      axios(config)
        .then((res) => {
          if (Object.keys(res.data).length === 0) {
            setViolentCount("loading");
          } else {
            setViolentCount(res.data.data.violentCount);
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
    getViolencedata();
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
                    <p>Most reported no. of homicides in a year</p>
                  </div>
                  <div className="factsDetails">
                    <p>{populationNumber ? populationNumber : "loading"}</p>
                    <p>{currencyName ? currencyName : "loading"}</p>
                    <p>{capitalName ? capitalName : "loading"}</p>
                    <p>{violentCount ? violentCount : "loading"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              {image.length > 0 ? (
                <>
                  <div className="image-one">
                    <picture>
                      <source media="(max-width:600px)" srcSet={image.length > 0 ? image[0].urls.small : null} />
                      <img src={image.length > 0 ? image[0].urls.regular : null} alt="" />
                    </picture>

                    <p className="aboutImage">
                      Photo by <a href={`${image.length > 0 ? image[0].user.links.html : ""}?utm_source=travellerApp&utm_medium=referral`}>{image.length > 0 ? image[0].user.first_name : "Unknown"}</a> on <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a>
                    </p>
                  </div>
                  <div className="image-two">
                    <picture>
                      <source media="(max-width:600px)" srcSet={image.length > 0 ? image[1].urls.small : null} />
                      <img src={image.length > 0 ? image[1].urls.regular : null} alt="" />
                    </picture>
                    <p className="aboutImage">
                      Photo by <a href={`${image.length > 0 ? image[1].user.links.html : ""}?utm_source=travellerApp&utm_medium=referral`}>{image.length > 0 ? image[1].user.first_name : "Unknown"}</a> on <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a>
                    </p>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Details;
