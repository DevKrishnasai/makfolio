import React, { useEffect, useState } from "react";
import Hero from "../components/Hero/Hero";
import Projects from "../components/Projects/Projects";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/SocialIcon/ScrollToTop";
import { useParams } from "react-router-dom";
import "../index.css";
import NoPage from "./NoPage";

function Home() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await fetch(`http://localhost:5000/portfolio/${id}`);
        const data = await response.json();
        console.log(data);
        if (data["status"] === 200) {
          setUserData(data);
        } else {
          setUserData(null);
        }

        setLoading(false);
      } catch (e) {
        console.error("Error fetching user data:", e);
      }
    };
    getUserById();
    setLoading(true);
  }, [id]);
  const [loading, setLoading] = useState(false);
  return (
    <>
      {userData === null ? (
        <NoPage />
      ) : loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div class="wrapper">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
          </div>
        </div>
      ) : (
        <>
          <Hero data={userData["portfolioData"]} />
          <About data={userData["portfolioData"]} />
          <Projects data={userData["portfolioData"]} />
          <Contact data={userData["portfolioData"]} />
          <Footer />
          <ScrollToTop />
        </>
      )}
    </>
  );
}

export default Home;
