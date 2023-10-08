import "react-slideshow-image/dist/styles.css";
import { Fade } from "react-slideshow-image";
import "./style.css";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const images = [
  "../../../public/icons/icono1.svg",
  "../../../public/icons/icono2.svg",
  "../../../public/icons/icono3.svg",
  "../../../public/icons/icono4.svg",
  "../../../public/icons/icono5.svg",
  "../../../public/icons/icono6.svg",
  "../../../public/icons/icono7.svg",
  "../../../public/icons/icono8.svg",
  "../../../public/icons/icono9.svg",
  "../../../public/icons/icono10.svg",
  "../../../public/icons/icono11.svg",
  "../../../public/icons/icono12.svg",
];

const arrow = "../../../public/icons/arrow-narrow-right.png";

function HomePageComponent() {
  const { isAuthenticated } = useAuth();
  return (
    <main className="home-component-main">
      <div className="home-component">
        <h2>SkillVerse</h2>
        <p>
          Conectamos a personas con profesionales talentosos de todo el mundo.
        </p>
        <Link to="/services">
          <span id="div-container">
            Descubre más
            <img src={arrow} width={30} alt="arrow" />
          </span>
        </Link>
        <Fade arrows="" transitionDuration={1000} duration={3500}>
          {images.map((image, index) => (
            <div id="car-home" key={index}>
              <img src={image} alt="" />
            </div>
          ))}
        </Fade>
      </div>
    </main>
  );
}

export default HomePageComponent;
