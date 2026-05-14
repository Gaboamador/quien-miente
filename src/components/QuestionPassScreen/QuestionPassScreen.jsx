import styles from "./QuestionPassScreen.module.scss";

export function QuestionPassScreen({ game }) {
  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <h2>Pasá el dispositivo</h2>
        <p>
          Pasale el dispositivo a{" "}
          <strong>{game.currentQuestionPlayer?.name}</strong>.
        </p>
      </div>

      <div className={styles.box}>
        <p>
          Cuando sea su turno, puede tocar el botón para ver su pregunta privada.
        </p>
      </div>

      <button type="button" onClick={game.showCurrentQuestion}>
        Ver mi pregunta
      </button>
    </section>
  );
}