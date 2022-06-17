import React, { useContext } from "react";
import SearchForm from "./Search-form";
import CountryNameContext from "../CountryNameContext";

const Hero = () => {
  const { countries } = useContext(CountryNameContext);

  const heroSmall = "images/hero-small.jpg";
  const heroMedium = "images/hero-medium.jpg";
  const heroFull = "images/hero-Full.jpg";

  return (
    <React.Fragment>
      <section className="hero-section">
        <img src={heroSmall} srcSet={`${heroSmall} 600w, ${heroMedium} 1400w, ${heroFull} 1920w`} alt="" />
        <div className="center">
          <h1 className="hero-title">Travel.Anywhere</h1>
          <SearchForm countries={countries} />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Hero;
