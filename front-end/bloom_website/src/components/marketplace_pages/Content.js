import React from "react";
import mp from "../marketplace.jpg";
import tw from "../Teamwork.png";
import Categories from "./Categories";
function Content() {
  return (
    <>
      <div>
        <section className=""></section>
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src={mp}
                alt="Our Marketplace Background"
                style={{ height: "auto" }}
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100 "
                src={tw}
                alt="Illustration of teamwork"
                style={{ height: "auto" }}
              />
            </div>
          </div>
        </div>

        <section className="bg-light" id="marketplace">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-12">
                <h1 className="text-center mt-4 text-secondary">
                  Welcome To Our Marketplace
                </h1>
              </div>
            </div>
            <div className="row">
              <p className="text-center text-secondary mt-4">
                Our marketplace will assist you in finding the best vendors for
                all the services you require for your business. Have a look at
                the services provided by the vendors, their costs as well as
                their ratings by our clients.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Categories></Categories>
    </>
  );
}

export default Content;
