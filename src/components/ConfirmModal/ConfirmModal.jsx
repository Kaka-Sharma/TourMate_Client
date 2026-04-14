import React from "react";
import styles from "./ConfirmModal.module.css";
const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Confirm Action</h3>
        <p>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            No
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
