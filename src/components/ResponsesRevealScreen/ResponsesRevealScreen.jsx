import styles from "./ResponsesRevealScreen.module.scss";

export function ResponsesRevealScreen({ game }) {
  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <h2>Mostrar respuestas</h2>
        <p>
          Todos ya escribieron su respuesta. Ahora cada jugador muestra lo que
          escribió, pero todavía no se revela la pregunta original.
        </p>
      </div>

      <div className={styles.box}>
        <h3>Dinámica</h3>
        <p>
          Muestren las respuestas al mismo tiempo o léanlas en voz alta. Cuando
          todos hayan visto las respuestas, pasen a revelar la pregunta original.
        </p>
      </div>

      <button type="button" onClick={game.showOriginalQuestion}>
        Mostrar pregunta original
      </button>
    </section>
  );
}