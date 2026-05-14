import styles from "./ResponsesRevealScreen.module.scss";

export function ResponsesRevealScreen({ game }) {
  return (
    <section className={styles.screen}>
      <div className={styles.top}>
        <p className={styles.kicker}>Momento de sospechar</p>
        <h2>Mostrar respuestas</h2>
        <p>
          Todos ya escribieron. Ahora revelan las respuestas, pero todavía no se
          muestra la pregunta original.
        </p>
      </div>

      <div className={styles.stage}>
        <article className={styles.card}>
          <p className={styles.cardLabel}>Dinámica</p>
          <p className={styles.cardText}>
            Muestren las respuestas al mismo tiempo o léanlas en voz alta.
            Después, pasen a revelar la pregunta original.
          </p>
        </article>

        <button type="button" onClick={game.showOriginalQuestion}>
          Mostrar pregunta original
        </button>
      </div>
    </section>
  );
}