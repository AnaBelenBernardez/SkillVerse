import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useServer from "../hooks/useServer";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./deletewhatever.css";
import "./confirmdialog.css";

function DeleteAccount({ user }) {
  const { delete: deleteAccount, get } = useServer();
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const { user: userLogged } = useAuth();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const fetchUser = async () => {
    try {
      const { data } = await get({ url: `/useravatar/${user}` });
      setCurrentUser(data.userAvatar);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount({ url: `/user/${currentUser.id}/delete/` });
      toast.success("Usuario borrado exitosamente");
      closeConfirmDialog();
      if (userLogged.user.id === currentUser.id) {
        navigate("/logout");
      }
      navigate("/users");
    } catch (error) {
      toast.error("Error al borrar el usuario");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const openConfirmDialog = () => {
    setShowConfirmDialog(true);
    document.body.classList.add("no-scroll");
  };

  const closeConfirmDialog = () => {
    setShowConfirmDialog(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <div className="flex justify-center">
      <button
        className="delete-whatever"
        id="delete-account"
        onClick={openConfirmDialog}
      >
        Borrar cuenta
      </button>
      {showConfirmDialog && (
        <div className="modal-overlay">
          <div className="confirm-dialog">
            <p>¿Seguro que quieres borrar esta cuenta?</p>
            <button className="confirm-delete" onClick={handleDelete}>
              Borrar
            </button>
            <button className="confirm-cancel" onClick={closeConfirmDialog}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAccount;
