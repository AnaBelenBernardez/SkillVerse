import { NavLink } from "react-router-dom";
import HomeButton from "../HomeButton";
import useAuth from "../../hooks/useAuth";
import "./style.css";
import AvatarHeader from "../AvatarHeader";

function NavBar() {
  const { isAuthenticated } = useAuth();

  const user = useAuth();

  return (
    <div className="navbar">
      <nav>
        <HomeButton />
        <NavLink className="animation" to="/about">
          Conócenos
        </NavLink>
        <NavLink className="animation" to="/services">
          Servicios
        </NavLink>
        {!isAuthenticated && (
          <NavLink className="animation" to="/signup">
            Regístrate
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink className="animation" to="/users">
            Usuarios
          </NavLink>
        )}
        {!isAuthenticated && (
          <NavLink className="animation" to="/login">
            Inicia sesión
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink className="animation" to="/logout">
            Cerrar sesión
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink
            to={{ pathname: `/profile/${user.user.user.nickname}` }}
            className="avatar-nav-container sin_animacion"
          >
            <AvatarHeader user={`${user.user.user.nickname}`} />
          </NavLink>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
