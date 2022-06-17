import React, { useContext } from "react";
import SearchForm from "./Search-form";
import CountryNameContext from "../CountryNameContext";

const Hero = () => {
  const { countries } = useContext(CountryNameContext);

  return (
    <React.Fragment>
      <section className="hero-section">
        <picture>
          <source media="(max-width:600px)" srcset="images/hero-small.jpg" />
          <source media="(max-width:1200px)" srcset="images/hero-medium.jpg" />
          <img src="images/hero-full.jpg" alt="beautifull place with boats" />
        </picture>
        <div className="center">
          <h1 className="hero-title">Travel.Anywhere</h1>
          <SearchForm countries={countries} />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Hero;
