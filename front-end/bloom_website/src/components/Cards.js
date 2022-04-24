import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import IntroCard from "./IntroCard";
import IntroCardRev from "./IntroCardRev";
import img1 from "./img1.jpg";
import mkt from "./mkt.jpg";
import img3 from "./img3.jpg";

let headings = [
  {
    heading: "Find what's most important to your business",
    text: "Welcome to Bloom! It is a one stop destination which caters to all your business needs, from marketing services to accounting analysis. Join our committee to find the best services globally, specially tailored to meet your requirements.",
    imgPath: img1,
    alt_tag: "Picture of a field"
  },
  {
    heading: "Marketplace for vendors",
    text: "At Bloom there exists an extensive marketplace of globally established vendors providing top tier services. We cut down the time you have to spend trying to find the right vendor, enabling you to spend time on what's important - your business.",
    imgPath: mkt,
    alt_tag: "Marketplace illustrion"
  },
  {
    heading: "A Hub for your Ideas",
    text: "Are you an innovator? Do you have ideas you would like to see in place? If yes, you have come to the right platform. Start building your creative ideas on our application, which ultimately also provides businesses with the best services internationally.",
    imgPath: img3,
    alt_tag: "Time lapse image of a highway"
  },
];

function Cards() {
  return (
    <div className="cards">
      
      <div className="cards__container">
        <div className="cards__wrapper">
          <IntroCard props={headings[0]} />
          <IntroCardRev props={headings[1]} />
          <IntroCard props={headings[2]} />
          <h2 className="service-heading">Check out our TOP services</h2>
          <ul className="cards__items">
            <CardItem
              src="images/img-10.png"
              text="Unravel the secrets of the market and speed up your growth."
              label="Market Analysis"
              path="/marketplace"
            />
            <CardItem
              src="images/img-12.png"
              text="Promote your product/services to your intended audience."
              label="Digital Marketing"
              path="/marketplace"
            />
            <CardItem
              src="images/img-11.png"
              text="Improve productivity and optimize your team's performance"
              label="Team Management"
              path="/marketplace"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
