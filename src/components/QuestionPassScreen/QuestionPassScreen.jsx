import styles from "./QuestionPassScreen.module.scss";

export function QuestionPassScreen({ game }) {
  return (
    <section className={styles.screen}>
      <div className={styles.top}>
        <p className={styles.kicker}>Turno secreto</p>
        <h2>{game.currentQuestionPlayer?.name}</h2>
        <p>Pasale el dispositivo a este jugador.</p>
      </div>

      <div className={styles.stage}>
        <article className={styles.card}>
          <p className={styles.cardLabel}>No mires si no sos vos</p>
          <p className={styles.cardText}>
            Cuando estés listo, tocá el botón para ver tu pregunta privada.
          </p>
        </article>

        <button type="button" onClick={game.showCurrentQuestion}>
          Ver mi pregunta
        </button>
      </div>
    </section>
  );
}