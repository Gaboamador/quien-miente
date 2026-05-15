import { useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog/ConfirmDialog";
import styles from "./SetupScreen.module.scss";

export function SetupScreen({ game }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

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
    setConfirmClearOpen(true);
  };

  const confirmClearSavedGame = () => {
    game.clearSavedGame();
    setName("");
    setMessage("");
    setConfirmClearOpen(false);
  };

  return (
    <section className={styles.screen}>
      <div className={styles.top}>
        <p className={styles.kicker}>Preparar partida</p>
        <h2>Armá el grupo</h2>
        <p>
          Agregá entre <strong>{game.minPlayers}</strong> y{" "}
          <strong>{game.maxPlayers}</strong> jugadores para empezar.
        </p>
      </div>

      <div className={styles.stage}>
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
            {game.players.map((player, index) => (
              <li key={player.id}>
                <span className={styles.playerBadge}>{index + 1}</span>
                <span className={styles.playerName}>{player.name}</span>
                <button
                  className={styles.removeButton}
                  type="button"
                  onClick={() => game.removePlayer(player.id)}
                >
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
            className={styles.startButton}
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
            Borrar partida guardada
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmClearOpen}
        title="¿Borrar partida?"
        message="Se van a borrar los jugadores y la partida guardada. El historial de preguntas usadas también se reiniciará."
        confirmLabel="Borrar partida"
        cancelLabel="Cancelar"
        danger
        onConfirm={confirmClearSavedGame}
        onCancel={() => setConfirmClearOpen(false)}
      />
    </section>
  );
}