import React from "react";
import ServicesList from "../../components/ServiceList/index.jsx";
import ScrollToTop from "../../components/ScrollToTop/index.jsx";
import useAuth from "../../hooks/useAuth.js";
import { Link } from "react-router-dom";
import "./style.css";

function AllServicesPage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <main>
        <h2 className="title main-title ">SERVICIOS</h2>
        {!isAuthenticated && (
          <div className="agregar-servicios">
            <p>
              <Link className="agregar-auth" to="/signup">
                Regístrate
              </Link>{" "}
              o{" "}
              <Link className="agregar-auth" to="/login">
                inicia sesión
              </Link>{" "}
              para agregar servicios.
            </p>
          </div>
        )}
        <ScrollToTop />

        <ServicesList />
      </main>
    </>
  );
}

export default AllServicesPage;
