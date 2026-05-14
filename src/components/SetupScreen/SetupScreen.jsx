import { useState } from "react";
import styles from "./SetupScreen.module.scss";

export function SetupScreen({ game }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleAddPlayer = (event) => {
    event.preventDefault();

    const result = game.addPlayer(name);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    setName("");
    setMessage("");
  };

  const handleStartRound = () => {
    const result = game.startRound();

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    setMessage("");
  };

  const handleClearSavedGame = () => {
    const confirmed = window.confirm(
      "Esto va a borrar todos los datos guardados de este dispositivo: jugadores, ronda actual y preguntas ya usadas. ¿Querés continuar?"
    );

    if (!confirmed) return;

    game.clearSavedGame();
    setName("");
    setMessage("");
  };

  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <h2>Jugadores</h2>
        <p>
          Agregá entre {game.minPlayers} y {game.maxPlayers} jugadores para
          empezar.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleAddPlayer}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nombre del jugador"
        />
        <button type="submit">Agregar</button>
      </form>

      {message && <p className={styles.message}>{message}</p>}

      {game.players.length > 0 && (
        <ul className={styles.list}>
          {game.players.map((player) => (
            <li key={player.id}>
              <span>{player.name}</span>
              <button type="button" onClick={() => game.removePlayer(player.id)}>
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className={styles.counter}>
        Jugadores: {game.players.length}/{game.maxPlayers}
      </p>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleStartRound}
          disabled={!game.canStartRound}
        >
          Empezar ronda
        </button>

        <button
          className={styles.dangerButton}
          type="button"
          onClick={handleClearSavedGame}
        >
          Borrar datos guardados
        </button>
      </div>
    </section>
  );
}