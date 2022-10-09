import React from "react";

export default function Footer() {
  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>about us</h3>
          <a href="#">
            <i className="fas fa-map-marker-alt"></i>&nbsp;Bim Tower, Hoang Quoc
            Viet, Ha Long, Quang Ninh
          </a>
          <a href="tel:+84982556100">
            <i class="fas fa-phone-alt"></i>&nbsp;0982 556 100
          </a>
          <a href="#">
            {" "}
            <i class="fas fa-envelope"></i>&nbsp;info@vietnamjoytravel.com
          </a>
        </div>
        {/* <div className="box">
          <h3>branch locations</h3>
          <a href="#">india</a>
          <a href="#">USA</a>
          <a href="#">japan</a>
          <a href="#">france</a>
        </div> */}
        <div className="box">
          <h3>follow us</h3>
          <div
            class="fb-page"
            data-href="https://www.facebook.com/vietnamjoytravel"
            data-tabs="timeline"
            data-width=""
            data-height="100"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
          >
            <blockquote
              cite="https://www.facebook.com/vietnamjoytravel"
              class="fb-xfbml-parse-ignore"
            >
              <a
                href="https://www.facebook.com/vietnamjoytravel"
                target="_blank"
              >
                Vietnam Joy Travel
              </a>
            </blockquote>
          </div>
          {/* <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fvietnamjoytravel&tabs=timeline&width=340&height=100&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="340"
            height="100"
            style="border:none;overflow:hidden"
            scrolling="no"
            frameborder="0"
            allowfullscreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe> */}
        </div>
        <div className="box">
          <h3>follow us</h3>
          <a href="https://www.facebook.com/vietnamjoytravel" target="_blank">
            facebook
          </a>
          <a href="#">instagram</a>
          <a href="#">twitter</a>
          <a href="#">linkedin</a>
        </div>
      </div>

      <h1 className="credit">
        {" "}
        created by <span> vietnamjoytravel 2022 </span> | all rights reserved!{" "}
      </h1>
    </section>
  );
}
