import styles from "./OriginalRevealScreen.module.scss";

export function OriginalRevealScreen({ game }) {
  return (
    <section className={styles.screen}>
      <div className={styles.top}>
        <p className={styles.kicker}>Revelación</p>
        <h2>Pregunta original</h2>
        <p>
          Ahora todos conocen la pregunta principal. Cada jugador tiene que
          defender la respuesta que mostró.
        </p>
      </div>

      <div className={styles.stage}>
        <article className={styles.questionCard}>
          <p className={styles.cardLabel}>La pregunta era</p>
          <p className={styles.questionText}>
            {game.round?.questionPair?.normal}
          </p>
        </article>

        <p className={styles.hint}>
          Voten a mano alzada quién creen que recibió una pregunta diferente.
        </p>

        <button type="button" onClick={game.revealFakeQuestion}>
          Revelar pregunta falsa
        </button>
      </div>
    </section>
  );
}