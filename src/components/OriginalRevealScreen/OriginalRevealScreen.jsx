import styles from "./OriginalRevealScreen.module.scss";

export function OriginalRevealScreen({ game }) {
  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <h2>Pregunta original</h2>
        <p>
          Ahora todos conocen la pregunta principal. Cada jugador tiene que
          defender la respuesta que mostró.
        </p>
      </div>

      <div className={styles.questionBox}>
        <h3>La pregunta era:</h3>
        <p>{game.round?.questionPair?.normal}</p>
      </div>

      <p className={styles.hint}>
        Voten a mano alzada quién creen que recibió una pregunta diferente.
      </p>

      <button type="button" onClick={game.revealFakeQuestion}>
        Revelar pregunta falsa
      </button>
    </section>
  );
}