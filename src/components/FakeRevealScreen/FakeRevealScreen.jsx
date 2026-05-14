import styles from "./FakeRevealScreen.module.scss";

export function FakeRevealScreen({ game }) {
  return (
    <section className={styles.screen}>
      <div className={styles.top}>
        <p className={styles.kicker}>Cierre de ronda</p>
        <h2>Era {game.liarPlayer?.name}</h2>
        <p>Ese jugador recibió la pregunta diferente.</p>
      </div>

      <div className={styles.stage}>
        <article className={styles.questionCard}>
          <p className={styles.cardLabel}>Pregunta original</p>
          <p className={styles.questionText}>
            {game.round?.questionPair?.normal}
          </p>
        </article>

        <article className={styles.fakeCard}>
          <p className={styles.cardLabel}>Pregunta falsa</p>
          <p className={styles.questionText}>
            {game.round?.questionPair?.fake}
          </p>
        </article>

        <button type="button" onClick={game.nextRound}>
          Nueva ronda
        </button>
      </div>
    </section>
  );
}