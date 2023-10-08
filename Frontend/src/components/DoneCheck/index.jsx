import React, { useState } from "react";
import "./style.css";
import "../../components/confirmdialog.css";

function DoneCheck({ handleMarkAsDone }) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setShowConfirmDialog(true);
    document.body.classList.add("no-scroll");
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    await handleMarkAsDone();
    setIsLoading(false);
    setShowConfirmDialog(false);
    document.body.classList.remove("no-scroll");
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <div className="">
      <button
        className="publish-comment"
        onClick={handleClick}
        disabled={isLoading}
        id="button-done"
      >
        Marcar como hecho
      </button>
      {showConfirmDialog && (
        <div className="modal-overlay">
          <div className="confirm-dialog">
            <p>¿Estás seguro de que quieres marcar este servicio como hecho?</p>
            <div className="confirm-dialog-buttons">
              <button className="confirm-done" onClick={handleConfirm}>
                Confirmar
              </button>
              <button className="confirm-cancel" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoneCheck;
