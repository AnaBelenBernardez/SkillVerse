import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useServer from "../hooks/useServer";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./deletewhatever.css";
import "./confirmdialog.css";

function DeleteComment({ commentId, onDelete }) {
  const { delete: deleteComment, get } = useServer();
  const { id: idService } = useParams();
  const [serviceOwner, setServiceOwner] = useState({});
  const [commentOwner, setcommentOwner] = useState({});
  const { user } = useAuth();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteComment({
        url: `/service/${idService}/comments/${commentId}/delete`,
      });
      toast.success("Comentario borrado exitosamente");
      closeConfirmDialog();
      // onDelete();
    } catch (error) {
      toast.error("Error al borrar el comentario");
    }
  };

  const fetchServiceOwner = async () => {
    try {
      const { data } = await get({ url: `/service/${idService}` });
      setServiceOwner(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchServiceOwner();
  }, []);

  const fetchCommentOwner = async () => {
    try {
      const { data } = await get({ url: `/service/${idService}` });
      setServiceOwner(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCommentOwner();
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
    <>
      {user.user.admin || serviceOwner.user_id === user.user.id ? (
        <>
          <button
            id="delete-comment"
            className="delete-whatever"
            onClick={openConfirmDialog}
          >
            <img
              className="trash-icon-button"
              src={"/icons/trash.svg"}
              alt="trash"
            />
          </button>
          {showConfirmDialog && (
            <div className="modal-overlay">
              <div className="confirm-dialog">
                <p>¿Seguro que quieres borrar este comentario?</p>
                <button className="confirm-delete" onClick={handleDelete}>
                  Borrar
                </button>
                <button className="confirm-cancel" onClick={closeConfirmDialog}>
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default DeleteComment;
