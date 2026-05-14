import styles from "./QuestionViewScreen.module.scss";

export function QuestionViewScreen({ game }) {
  return (
    <section className={styles.screen}>
      <div className={styles.top}>
        <p className={styles.kicker}>Pregunta privada</p>
        <h2>{game.currentQuestionPlayer?.name}</h2>
        <p>Leé tu consigna sin mostrarla.</p>
      </div>

      <div className={styles.stage}>
        <article className={styles.questionCard}>
          <p className={styles.cardLabel}>Tu pregunta</p>
          <p className={styles.questionText}>{game.currentQuestion}</p>
        </article>

        <p className={styles.hint}>
          Escribí tu respuesta en un papel o en tu teléfono. No se la muestres a
          nadie todavía.
        </p>

        <button type="button" onClick={game.confirmQuestionRead}>
          Ya escribí mi respuesta
        </button>
      </div>
    </section>
  );
}