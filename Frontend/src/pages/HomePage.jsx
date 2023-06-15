import React from "react";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import Header from "../components/Header";

function HomePage() {
  return (
    <>
      <Header />
      <PageTitle />
      <SearchBar />
      {/* <div>Contenido de la página, logo, fotos, etc</div> */}
      <Footer />
    </>
  );
}

export default HomePage;
