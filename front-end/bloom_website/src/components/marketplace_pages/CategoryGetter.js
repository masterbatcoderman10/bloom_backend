import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CategoryRenderer from "./CategoryRenderer.js";

export default function CategoryGetter({ heading, url }) {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  let dats = [];

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCategoryList(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [setCategoryList]);

  return (
    <section className="" id="vendors">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <h2 className="text-center mt-4 text-secondary">Our Vendors</h2>
          </div>
        </div>
        <div className="row">
          <CategoryRenderer isLoading={isLoading} categoryList={categoryList} />
        </div>
      </div>
    </section>
  );
}
