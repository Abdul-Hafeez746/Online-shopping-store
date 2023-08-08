import React from "react";

function About() {
  return (
    <>
      <div class="about-section paddingTB60 gray-bg">
        <div class="container">
          <div class="row">
            <div class="col-md-7 col-sm-6">
              <div class="about-title clearfix">
                <h1>
                  About <span>ONLINE SHOPPING STORE</span>
                </h1>
                <h3>Your Desires,Our Efforts</h3>
                <p class="about-paddingB">
                  Welcome to our online shopping store, where shopping is made
                  easy and convenient for you! Our store was created with the
                  goal of providing customers with a hassle-free shopping
                  experience from the comfort of their own homes. We understand
                  that our customers have busy lives and may not always have the
                  time to physically visit a store. That's why we offer a wide
                  range of products, from clothing to Essential wears, and
                  everything in between, all available at your fingertips. Our
                  team is dedicated to providing top-notch customer service and
                  ensuring that you are completely satisfied with your purchase.
                  We pride ourselves on offering competitive prices and frequent
                  promotions to make sure you get the best deals possible.Thank
                  you for choosing our online shopping store and we look forward
                  to serving you!{" "}
                </p>
                <p>
                  Moreover, This Store Provides The Facility to the lower Class Peoples
                  so That they can also Wear Classy.
                </p>
                <p>
                  You Can Follow Us on Following Social Media Platformss
                </p>
                <div class="about-icons">
                  <ul>
                    <li>
                      <a href="https://www.facebook.com/">
                        <i
                          id="social-fb"
                          class="fa fa-facebook-square fa-3x social"
                        ></i>
                      </a>{" "}
                    </li>
                    <li>
                      <a href="https://twitter.com/">
                        <i
                          id="social-tw"
                          class="fa fa-twitter-square fa-3x social"
                        ></i>
                      </a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="https://plus.google.com/">
                        <i
                          id="social-gp"
                          class="fa fa-google-plus-square fa-3x social"
                        ></i>
                      </a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="mailto:bootsnipp@gmail.com">
                        <i
                          id="social-em"
                          class="fa fa-envelope-square fa-3x social"
                        ></i>
                      </a>{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-5 col-sm-6">
              <div class="about-img">
         <img src="./images/slider1.webp" className="card-img-top abt" height={170} width={140} alt="data.name" />      
         <img src="./images/slider1.webp" className="card-img-top abt" height={170} width={140} alt="data.name" />      
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
