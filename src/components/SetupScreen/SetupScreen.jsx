import { useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog/ConfirmDialog";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./SetupScreen.module.scss";

export function SetupScreen({ game }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const playersCount = game.players.length;
  const missingPlayers = Math.max(game.minPlayers - playersCount, 0);
  const isFull = playersCount >= game.maxPlayers;

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
      <div className={styles.hero}>
        <div>
          <p className={styles.kicker}>Preparar partida</p>
          <h2>Armá la mesa</h2>
          <p>
            Sumá entre <strong>{game.minPlayers}</strong> y{" "}
            <strong>{game.maxPlayers}</strong> jugadores para empezar.
          </p>
        </div>

        <div className={styles.playerCounter} aria-label="Cantidad de jugadores">
          <span>{playersCount}</span>
          <small>/{game.maxPlayers}</small>
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.statusCard}>
          <span className={styles.statusIcon}>
            {game.canStartRound ? "✓" : "!"}
          </span>

          <div>
            <strong>
              {game.canStartRound
                ? "La mesa está lista"
                : `Faltan ${missingPlayers} jugador${missingPlayers === 1 ? "" : "es"}`}
            </strong>
            <p>
              {game.canStartRound
                ? "Cuando quieran, pueden empezar la primera ronda."
                : "Agregá más jugadores para habilitar la ronda."}
            </p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleAddPlayer}>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={isFull ? "Mesa completa" : "Nombre del jugador"}
            disabled={isFull}
          />
          <button type="submit" disabled={isFull}>
            Agregar
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}

        <div className={styles.playersPanel}>
          <div className={styles.playersHeader}>
            <div className={styles.playersTitle}>
              <h3>Jugadores</h3>
              <span>
                {playersCount}/{game.maxPlayers}
              </span>
            </div>

            <button
              className={styles.clearButton}
              type="button"
              onClick={handleClearSavedGame}
              aria-label="Borrar partida guardada"
              title="Borrar partida guardada"
            >
              <FaTrashAlt aria-hidden="true" />
            </button>
          </div>

          {playersCount > 0 ? (
            <div className={styles.playerGrid}>
              {game.players.map((player, index) => (
                <article className={styles.playerCard} key={player.id}>
                  <span className={styles.playerBadge}>{index + 1}</span>

                  <span className={styles.playerName}>{player.name}</span>

                  <button
                    className={styles.removeButton}
                    type="button"
                    onClick={() => game.removePlayer(player.id)}
                    aria-label={`Quitar a ${player.name}`}
                  >
                    ×
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span>?</span>
              <p>Todavía no hay nadie en la mesa.</p>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.startButton}
            onClick={handleStartRound}
            disabled={!game.canStartRound}
          >
            Empezar ronda
          </button>

          {/* <button
            className={styles.dangerButton}
            type="button"
            onClick={handleClearSavedGame}
            aria-label="Borrar partida guardada"
            title="Borrar partida guardada"
          >
            <FaTrashAlt aria-hidden="true" />
          </button> */}
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