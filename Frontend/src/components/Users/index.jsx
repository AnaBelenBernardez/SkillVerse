import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useServer from "../../hooks/useServer";
import "./style.css";

function Users() {
  const { get } = useServer();
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const { data } = await get({ url: `/users` });
      setUsers(data.userData);
    } catch (e) {
      console.log("Error al obtener los usuarios:", e.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <ul role="list" className="users-list">
      {users.map((user) => (
        <li key={user.email}>
          <div className="users-list-info">
            <Link to={`/user/${user.nickname}`}>
              <img src={user.userPhoto} alt={`Foto de ${user.nickname}`} />
            </Link>
            <div className="users-list-data">
              <Link to={`/user/${user.nickname}`}>
                <p className="users-list-nickname">{user.nickname}</p>
              </Link>
              <Link
                to="#"
                onClick={() => {
                  window.location = `mailto: ${user.email}`;
                }}
              >
                <p className="users-list-email">{user.email}</p>
              </Link>
              {user.ko_fi && (
                <a
                  href={user.ko_fi}
                  target="_blank"
                  rel="noopener noreferrer"
                  alt="Support me on Ko-fi"
                >
                  <div className="ko-fi-container">
                    <img
                      src="/icons/ko-fi-icon.svg"
                      alt="Ko-fi"
                      className="ko-fi-icon small"
                    />
                  </div>
                </a>
              )}
            </div>
          </div>
          <div className="users-list-role">
            {user.admin ? (
              <div className="role-container">
                <div className="role-admin-outside">
                  <div className="role-admin-inside" />
                </div>
                <p className="role-admin">Admin</p>
              </div>
            ) : (
              <div className="role-container">
                <div className="role-user-outside">
                  <div className="role-user-inside" />
                </div>
                <p className="role-user">Usuario</p>
              </div>
            )}
          </div>
          {}
        </li>
      ))}
    </ul>
  );
}

export default Users;
