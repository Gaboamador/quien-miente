import styles from "./ConfirmDialog.module.scss";

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  danger = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className={styles.backdrop} role="presentation">
      <section
        className={`${styles.dialog} ${danger ? styles.danger : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
      >
        <p className={styles.kicker}>{danger ? "Acción irreversible" : "Confirmar"}</p>

        <h2 id="confirm-dialog-title" className={styles.title}>
          {title}
        </h2>

        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            type="button"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>

          <button
            className={styles.confirmButton}
            type="button"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}