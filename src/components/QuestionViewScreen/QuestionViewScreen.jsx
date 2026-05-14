import styles from "./QuestionViewScreen.module.scss";

export function QuestionViewScreen({ game }) {
  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <h2>Pregunta privada</h2>
        <p>
          Jugador: <strong>{game.currentQuestionPlayer?.name}</strong>
        </p>
      </div>

      <div className={styles.questionBox}>{game.currentQuestion}</div>

      <p className={styles.hint}>
        Escribí tu respuesta en un papel o en tu teléfono. No se la muestres a
        nadie todavía.
      </p>

      <button type="button" onClick={game.confirmQuestionRead}>
        Ya escribí mi respuesta
      </button>
    </section>
  );
}