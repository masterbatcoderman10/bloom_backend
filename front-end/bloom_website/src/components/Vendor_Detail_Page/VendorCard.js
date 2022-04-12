import "./StartupCard.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../img4.jpg"
import { Button } from "../Button";

export default function VendorCard(props) {
  const navigate = useNavigate();
  console.log(props);
  return (
  <html style="font-size: 16px;">
    <body class="u-body u-xl-mode">
      <header class="u-clearfix u-header u-header" id="sec-02ad">
        <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            <img src="images/default-logo.png" class="u-logo-image u-logo-image-1"/>
        </div>
      </header>
      <section class="u-align-center u-clearfix u-image u-shading u-section-1" src="" data-image-width="256" data-image-height="256" id="sec-389a">
        <div class="u-clearfix u-sheet u-sheet-1">
          <h1 class="u-text u-text-default u-title u-text-1">
            name
          </h1>
          <p class="u-large-text u-text u-text-variant u-text-2">
            category
          </p>
          <p class="u-large-text u-text u-text-variant u-text-3">
            description
          </p>
          <a href="#" class="u-border-none u-btn u-button-style u-hover-palette-1-dark-2 u-palette-1-light-1 u-btn-1">
            Visit website
          </a>
          <a href="#" class="u-border-none u-btn u-button-style u-hover-palette-1-dark-2 u-palette-1-light-1 u-btn-2">
            Account page
          </a>
        </div>
      </section>
      <section class="u-align-center u-clearfix u-section-2" id="sec-871c">
        <div class="u-clearfix u-sheet u-sheet-1">
          <h2 class="u-custom-font u-font-montserrat u-text u-text-1">
            Features
          </h2>
          <div class="u-expanded-width u-list u-list-1">
            <div class="u-repeater u-repeater-1">
              <div class="u-align-center u-container-style u-list-item u-repeater-item">
                <div class="u-container-layout u-similar-container u-container-layout-1">
                  <span class="u-icon u-icon-circle u-palette-1-light-1 u-spacing-20 u-icon-1">
                    <svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 512.002 512.002" style="">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-628e"></use>
                    </svg>
                    <svg class="u-svg-content" viewBox="0 0 512.002 512.002" x="0px" y="0px" id="svg-628e" style="enable-background:new 0 0 512.002 512.002;">
                      <g>
                        <g>
                          <path d="M512.001,255.969c-0.011-5.193-2.708-10.011-7.129-12.737l-52.034-32.076l52.089-32.421    c4.393-2.734,7.066-7.539,7.074-12.712c0.008-5.174-2.651-9.987-7.036-12.734l-241-151c-4.871-3.052-11.058-3.052-15.929,0    l-241,151c-4.384,2.747-7.043,7.56-7.036,12.734c0.008,5.174,2.681,9.979,7.074,12.712l51.732,32.198L7.051,243.282    c-4.39,2.744-7.055,7.557-7.05,12.734c0.005,5.177,2.679,9.985,7.074,12.721l51.732,32.198L7.051,333.282    c-4.383,2.74-7.047,7.543-7.05,12.712s2.656,9.975,7.036,12.719l241,151c2.436,1.526,5.2,2.289,7.964,2.289    c2.764,0,5.529-0.763,7.964-2.289l241-151c4.394-2.753,7.055-7.581,7.036-12.766c-0.019-5.185-2.715-9.993-7.129-12.714    l-52.034-32.076l52.089-32.421C509.336,265.992,512.012,261.162,512.001,255.969z M43.32,165.96L256.001,32.703L468.682,165.96    c-2.044,1.272-206.586,128.58-212.681,132.374L43.32,165.96z M468.584,346.106L256.001,479.301L43.278,346.018l43.889-27.431    l160.908,100.15c2.426,1.51,5.176,2.265,7.926,2.265c2.75,0,5.5-0.755,7.926-2.265l160.464-99.874L468.584,346.106z     M256.001,388.334L43.345,255.976l43.822-27.389l160.908,100.15c2.426,1.51,5.176,2.265,7.926,2.265c2.75,0,5.5-0.755,7.926-2.265    l160.464-99.874l44.125,27.2C467.297,256.822,261.631,384.829,256.001,388.334z">
                          </path>
                        </g>
                      </g>
                    </svg>
            </span>
                  <p class="u-text u-text-default u-text-2">
                    features
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="u-align-center u-clearfix u-section-3" id="carousel_7d19">
        <div class="u-clearfix u-sheet u-sheet-1">
          <h2 class="u-custom-font u-font-montserrat u-text u-text-1">Pricing</h2>
          <div class="u-expanded-width u-list u-list-1">
            <div class="u-repeater u-repeater-1">
              <div class="u-align-center u-container-style u-list-item u-repeater-item">
                <div class="u-container-layout u-similar-container u-container-layout-1"><span class="u-file-icon u-icon u-icon-circle u-palette-1-light-1 u-spacing-20 u-text-white u-icon-1"><img src="images/5.png" alt=""/></span>
                  <p class="u-text u-text-default u-text-2">pricing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>
  </html>
  );
}
