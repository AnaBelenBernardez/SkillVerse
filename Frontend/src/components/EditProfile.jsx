import { useState } from "react";

import axios from "axios";
import useAuth from "../hooks/useAuth";
//import { Link } from "react-router-dom";

const validateKoFiURL = (value) => {
  if (!value || value.trim() === "") {
    return true;
  }
  const koFiURLRegex = /^https?:\/\/(?:www\.)?ko-fi\.com\/[a-zA-Z0-9]+$/;
  return koFiURLRegex.test(value);
};

const EditProfile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    email: user.email,
    userPhoto: user.userPhoto,
    nickname: user.nickname,
    name: user.name,
    surname: user.surname,

    password: "",
    biography: user.biography,
    ko_fi: "",
  });

  console.log(formData);

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [koFiURL, setKoFiURL] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "ko_fi" && value.trim() !== "") {
      if (!validateKoFiURL(value)) {
        setError("Por favor, introduce una URL válida de Ko-fi.");
      } else {
        setError("");

        setKoFiURL(value);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateKoFiURL(formData.ko_fi)) {
      setError("Por favor, introduce una URL válida de Ko-fi.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/user/${user.user.id}/edit`,
        formData,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `${user.token}`,
          },
        }
      );

      // Actualizar el estado con los datos actualizados del usuario
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: response.data.email,
        userPhoto: response.data.userPhoto,
        nickname: response.data.nickname,
        name: response.data.name,
        surname: response.data.surname,
        password: response.data.password,
        biography: response.data.biography,
        ko_fi: response.data.ko_fi,
        // Actualiza otros campos si es necesario
      }));

      setSuccessMessage("¡Perfil actualizado exitosamente!");

      if (formData.ko_fi.trim() !== "") {
        setKoFiURL(formData.ko_fi);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  console.log(formData);

  return (
    <div className="edit-profile">
      <h2
        className="text-4xl font-bold tracking-tight text-center"
        style={{ color: "#523d80" }}
      >
        Editar perfil
      </h2>
      <form onSubmit={handleSubmit} className="mt-6">
        <label className="block">
          <span className="text-gray-700">Correo electrónico:</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <br />
        <label className="block">
          <span className="text-gray-700">Avatar:</span>
          <input
            type="text"
            name="userPhoto"
            value={formData.userPhoto}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <br />
        <label className="block">
          <span className="text-gray-700">Nickname:</span>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <br />
        <label className="block">
          <span className="text-gray-700">Nombre:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <br />
        <label className="block">
          <span className="text-gray-700">Apellido:</span>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <br />
        <label className="block">
          <span className="text-gray-700">Contraseña:</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <br />
        <label className="block">
          <span className="text-gray-700">Biografía:</span>
          <textarea
            name="biography"
            value={formData.biography}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <br />
        <label className="block">
          <span className="text-gray-700">Ko-Fi:</span>
          <input
            type="URL"
            name="ko_fi"
            value={formData.ko_fi}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>

        <label className="block">
          <br />

          {koFiURL && (
            <a href={koFiURL} target="_blank" rel="noopener noreferrer">
              <img
                src="/icons/ko-fi-icon.svg"
                alt="Ko-fi"
                style={{ width: "40px", height: "40px" }}
              />
            </a>
          )}
        </label>

        <br />

        <button
          className="publish-comment text-white font-bold py-2 px-4 rounded content-center bg-indigo-500 hover:bg-indigo-700"
          type="submit"
        >
          Guardar cambios
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
      {/* {renderAdminContent()} */}

      {/* <div>
        <Link to={`/profile/${formData.nickname}`}>Volver al Servicio</Link>
          </div> */}
    </div>
  );
};

export default EditProfile;
