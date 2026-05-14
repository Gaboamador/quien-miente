import styles from "./FakeRevealScreen.module.scss";

export function FakeRevealScreen({ game }) {
  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <h2>Cierre de ronda</h2>
        <p>
          El jugador que recibió la pregunta diferente era:{" "}
          <strong>{game.liarPlayer?.name}</strong>
        </p>
      </div>

      <div className={styles.questionBox}>
        <h3>Pregunta original</h3>
        <p>{game.round?.questionPair?.normal}</p>
      </div>

      <div className={styles.questionBox}>
        <h3>Pregunta falsa</h3>
        <p>{game.round?.questionPair?.fake}</p>
      </div>

      <button type="button" onClick={game.nextRound}>
        Jugar otra ronda
      </button>
    </section>
  );
}