import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { api } from "../../api";
import video1 from "../../images/vid-1.mp4";
import video2 from "../../images/vid-2.mp4";
import video3 from "../../images/vid-3.mp4";
import video4 from "../../images/vid-4.mp4";
import video5 from "../../images/vid-5.mp4";
import bookImg from "../../images/book-img.svg";
import contactImg from "../../images/Asset 2.svg";
import { useToast, Circle, Box, CircularProgress } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  const toast = useToast({});

  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [srcVideo, setSrcVideo] = useState(video1);
  const [emailData, setEmailData] = useState({
    name: "",
    subject: "",
    number: "",
    email: "",
    message: "",
    type: "contact",
  });
  const onVideoChange = (e) => {
    document.querySelector(".controls .active").classList.remove("active");
    e.target.classList.add("active");
    const src = e.target.dataset.src;
    setSrcVideo(src);
  };

  const getData = async () => {
    try {
      const data = await axios({
        method: "POST",
        data: {
          limit: 7,
        },
        url: `${api}/posts`,
      });
      setList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const validate = () => {
    if (
      !emailData.name ||
      !emailData.subject ||
      !emailData.email ||
      !emailData.message ||
      !emailData.number
    ) {
      toast({
        containerStyle: {
          fontSize: "1.8rem",
          maxWidth: "100%",
        },
        position: "top",
        title: "Fail",
        description: "Please fill out all field",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const onSendEmail = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const check = validate();
    if (check) {
      try {
        const sendEmail = await axios({
          method: "POST",
          data: emailData,
          url: `${api}/email`,
        });
        toast({
          containerStyle: {
            marginTop: "10%",
            fontSize: "1.8rem",
            maxWidth: "100%",
          },
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
          render: () => (
            <Circle size="100px" bg="green" color="white" textAlign="center">
              <Box>
                <CheckIcon />
                <br />
                SENT
              </Box>
            </Circle>
          ),
        });
        setEmailData({
          name: "",
          subject: "",
          number: "",
          email: "",
          message: "",
          type: "contact",
        });
      } catch (error) {
        console.log(error);
      }
    }
    setIsLoading(false);
  };

  const onNavigate = (e, slug) => {
    e.preventDefault();
    window.location.href = `/detail/${slug}`;
  };

  window.onscroll = () => {
    document.querySelector("#search-btn").classList.remove("fa-times");
    document.querySelector(".search-bar-container").classList.remove("active");
    document.querySelector("#menu-bar").classList.remove("fa-times");
    document.querySelector(".navbar").classList.remove("active");
    document.querySelector(".login-form-container").classList.remove("active");
  };

  return (
    <>
      <Header
        title="Vietnam Joy Travel"
        desc1="Vietnamjoytravel"
        desc2="Vietnam Joy Travel"
        page="home"
      />

      <section className="home" id="home">
        <div className="content">
          <h3>adventure is worthwhile</h3>
          <p>discover new places with us, adventure awaits</p>
          <a href="#" className="btn">
            discover more
          </a>
        </div>

        <div className="controls">
          <span
            className="vid-btn active"
            data-src={video1}
            onClick={(e) => onVideoChange(e)}
          ></span>
          <span
            className="vid-btn"
            data-src={video2}
            onClick={(e) => onVideoChange(e)}
          ></span>
          <span
            className="vid-btn"
            data-src={video3}
            onClick={(e) => onVideoChange(e)}
          ></span>
          <span
            className="vid-btn"
            data-src={video4}
            onClick={(e) => onVideoChange(e)}
          ></span>
          <span
            className="vid-btn"
            data-src={video5}
            onClick={(e) => onVideoChange(e)}
          ></span>
        </div>

        <div className="video-container">
          <video
            src={srcVideo}
            id="video-slider"
            loop
            autoPlay
            muted
            type="video/mp4"
          ></video>
        </div>
      </section>
      {/* 
      <section className="book" id="book">
        <h1 className="heading">
          <span>b</span>
          <span>o</span>
          <span>o</span>
          <span>k</span>
          <span className="space"></span>
          <span>n</span>
          <span>o</span>
          <span>w</span>
        </h1>

        <div className="row">
          <div className="image">
            <img src={bookImg} alt="" />
          </div>

          <form action="">
            <div className="inputBox">
              <h3>where to</h3>
              <input type="text" placeholder="place name" />
            </div>
            <div className="inputBox">
              <h3>how many</h3>
              <input type="number" placeholder="number of guests" />
            </div>
            <div className="inputBox">
              <h3>arrivals</h3>
              <input type="date" />
            </div>
            <div className="inputBox">
              <h3>leaving</h3>
              <input type="date" />
            </div>
            <input type="submit" className="btn" value="book now" />
          </form>
        </div>
      </section> */}

      <section className="packages" id="packages">
        <h1 className="heading">
          <span>p</span>
          <span>a</span>
          <span>c</span>
          <span>k</span>
          <span>a</span>
          <span>g</span>
          <span>e</span>
          <span>s</span>
        </h1>

        <div className="box-container">
          {list.map((line, i) => (
            <div className="box">
              <img src={line.imgTitle} alt="imgTitel" />
              <div className="content">
                <h3>
                  {" "}
                  <i className="fas fa-map-marker-alt"></i> {line.type}
                </h3>
                <p className="title" title={line.title}>
                  {line.title}
                </p>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
                <div className="price">
                  {" "}
                  ${line.price}
                  {/* <span>$120.00</span>{" "} */}
                </div>
                <a onClick={(e) => onNavigate(e, line.slug)} className="btn">
                  book now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="services" id="services">
        <h1 className="heading">
          <span>s</span>
          <span>e</span>
          <span>r</span>
          <span>v</span>
          <span>i</span>
          <span>c</span>
          <span>e</span>
          <span>s</span>
        </h1>

        <div className="box-container">
          <div className="box">
            <i className="fas fa-hotel"></i>
            <h3>affordable hotels</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore commodi earum, quis voluptate exercitationem ut minima
              itaque iusto ipsum corrupti!
            </p>
          </div>
          <div className="box">
            <i className="fas fa-utensils"></i>
            <h3>food and drinks</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore commodi earum, quis voluptate exercitationem ut minima
              itaque iusto ipsum corrupti!
            </p>
          </div>
          <div className="box">
            <i className="fas fa-bullhorn"></i>
            <h3>safty guide</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore commodi earum, quis voluptate exercitationem ut minima
              itaque iusto ipsum corrupti!
            </p>
          </div>
          <div className="box">
            <i className="fas fa-globe-asia"></i>
            <h3>around the world</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore commodi earum, quis voluptate exercitationem ut minima
              itaque iusto ipsum corrupti!
            </p>
          </div>
          <div className="box">
            <i className="fas fa-plane"></i>
            <h3>fastest travel</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore commodi earum, quis voluptate exercitationem ut minima
              itaque iusto ipsum corrupti!
            </p>
          </div>
          <div className="box">
            <i className="fas fa-hiking"></i>
            <h3>adventures</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore commodi earum, quis voluptate exercitationem ut minima
              itaque iusto ipsum corrupti!
            </p>
          </div>
        </div>
      </section>
      {/* 
      <section className="gallery" id="gallery">
        <h1 className="heading">
          <span>g</span>
          <span>a</span>
          <span>l</span>
          <span>l</span>
          <span>e</span>
          <span>r</span>
          <span>y</span>
        </h1>

        <div className="box-container">
          <div className="box">
            <img src="images/g-1.jpg" alt="" />
            <div className="content">
              <h3>amazing places</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ducimus, tenetur.
              </p>
              <a href="#" className="btn">
                see more
              </a>
            </div>
          </div>
          <div className="box">
            <img src="images/g-2.jpg" alt="" />
            <div className="content">
              <h3>amazing places</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ducimus, tenetur.
              </p>
              <a href="#" className="btn">
                see more
              </a>
            </div>
          </div>
          <div className="box">
            <img src="images/g-3.jpg" alt="" />
            <div className="content">
              <h3>amazing places</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ducimus, tenetur.
              </p>
              <a href="#" className="btn">
                see more
              </a>
            </div>
          </div>
          <div className="box">
            <img src="images/g-4.jpg" alt="" />
            <div className="content">
              <h3>amazing places</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ducimus, tenetur.
              </p>
              <a href="#" className="btn">
                see more
              </a>
            </div>
          </div>
          <div className="box">
            <img src="images/g-5.jpg" alt="" />
            <div className="content">
              <h3>amazing places</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ducimus, tenetur.
              </p>
              <a href="#" className="btn">
                see more
              </a>
            </div>
          </div>
          <div className="box">
            <img src="images/g-6.jpg" alt="" />
            <div className="content">
              <h3>amazing places</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ducimus, tenetur.
              </p>
              <a href="#" className="btn">
                see more
              </a>
            </div>
          </div>
          <div className="box">
            <img src="images/g-7.jpg" alt="" />
            <div className="content">
              <h3>amazing places</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ducimus, tenetur.
              </p>
              <a href="#" className="btn">
                see more
              </a>
            </div>
          </div>
          <div className="box">
            <img src="images/g-8.jpg" alt="" />
            <div className="content">
              <h3>amazing places</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ducimus, tenetur.
              </p>
              <a href="#" className="btn">
                see more
              </a>
            </div>
          </div>
          <div className="box">
            <img src="images/g-9.jpg" alt="" />
            <div className="content">
              <h3>amazing places</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ducimus, tenetur.
              </p>
              <a href="#" className="btn">
                see more
              </a>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="review" id="review">
        <h1 className="heading">
          <span>r</span>
          <span>e</span>
          <span>v</span>
          <span>i</span>
          <span>e</span>
          <span>w</span>
        </h1>

        <div className="swiper-container review-slider">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="box">
                <img src="images/pic1.png" alt="" />
                <h3>john deo</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                  adipisci quisquam sunt nesciunt fugiat odit minus illum
                  asperiores dolorum enim sint quod ipsam distinctio molestias
                  consectetur ducimus beatae, reprehenderit exercitationem!
                </p>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="box">
                <img src="images/pic2.png" alt="" />
                <h3>john deo</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                  adipisci quisquam sunt nesciunt fugiat odit minus illum
                  asperiores dolorum enim sint quod ipsam distinctio molestias
                  consectetur ducimus beatae, reprehenderit exercitationem!
                </p>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="box">
                <img src="images/pic3.png" alt="" />
                <h3>john deo</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                  adipisci quisquam sunt nesciunt fugiat odit minus illum
                  asperiores dolorum enim sint quod ipsam distinctio molestias
                  consectetur ducimus beatae, reprehenderit exercitationem!
                </p>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="box">
                <img src="images/pic4.png" alt="" />
                <h3>john deo</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                  adipisci quisquam sunt nesciunt fugiat odit minus illum
                  asperiores dolorum enim sint quod ipsam distinctio molestias
                  consectetur ducimus beatae, reprehenderit exercitationem!
                </p>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="contact" id="contact">
        <h1 className="heading">
          <span>c</span>
          <span>o</span>
          <span>n</span>
          <span>t</span>
          <span>a</span>
          <span>c</span>
          <span>t</span>
        </h1>

        <div className="row">
          <div className="image">
            <img src={contactImg} alt="" />
          </div>

          <form onSubmit={onSendEmail}>
            <div className="inputBox">
              <input
                type="text"
                value={emailData.name}
                placeholder="name"
                onChange={(e) =>
                  setEmailData({ ...emailData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="email"
                value={emailData.email}
                onChange={(e) =>
                  setEmailData({ ...emailData, email: e.target.value })
                }
              />
            </div>
            <div className="inputBox">
              <input
                type="number"
                value={emailData.number}
                placeholder="number"
                onChange={(e) =>
                  setEmailData({ ...emailData, number: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="subject"
                value={emailData.subject}
                onChange={(e) =>
                  setEmailData({ ...emailData, subject: e.target.value })
                }
              />
            </div>
            <textarea
              placeholder="message"
              value={emailData.message}
              name=""
              id=""
              cols="30"
              rows="10"
              onChange={(e) =>
                setEmailData({ ...emailData, message: e.target.value })
              }
            ></textarea>
            <input type="submit" className="btn" value="send message" />
            {isLoading && (
              <CircularProgress isIndeterminate color="green.300" ml="2rem" />
            )}
          </form>
        </div>
      </section>

      {/* <section className="brand-container">
        <div className="swiper-container brand-slider">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <img src="images/1.jpg" alt="" />
            </div>
            <div className="swiper-slide">
              <img src="images/2.jpg" alt="" />
            </div>
            <div className="swiper-slide">
              <img src="images/3.jpg" alt="" />
            </div>
            <div className="swiper-slide">
              <img src="images/4.jpg" alt="" />
            </div>
            <div className="swiper-slide">
              <img src="images/5.jpg" alt="" />
            </div>
            <div className="swiper-slide">
              <img src="images/6.jpg" alt="" />
            </div>
          </div>
        </div>
      </section> */}

      <Footer />
    </>
  );
}
