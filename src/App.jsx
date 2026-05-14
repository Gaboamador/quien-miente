import { useState } from "react";
import { SCREENS, useLocalGame } from "@/hooks/useLocalGame";
import { SetupScreen } from "@/components/SetupScreen/SetupScreen";
import { QuestionPassScreen } from "@/components/QuestionPassScreen/QuestionPassScreen";
import { QuestionViewScreen } from "@/components/QuestionViewScreen/QuestionViewScreen";
import { ResponsesRevealScreen } from "@/components/ResponsesRevealScreen/ResponsesRevealScreen";
import { OriginalRevealScreen } from "@/components/OriginalRevealScreen/OriginalRevealScreen";
import { FakeRevealScreen } from "@/components/FakeRevealScreen/FakeRevealScreen";
import { ConfirmDialog } from "@/components/ConfirmDialog/ConfirmDialog";
import "./styles/global.scss";

function App() {
  const game = useLocalGame();

  const [confirmNewRoundOpen, setConfirmNewRoundOpen] = useState(false);

  const isSetupScreen = game.screen === SCREENS.SETUP;
  const isFinalScreen = game.screen === SCREENS.FAKE_REVEAL;
  const showNewRoundButton = !isSetupScreen && !isFinalScreen;

  const handleNewRound = () => {
    setConfirmNewRoundOpen(true);
  };

  const confirmNewRound = () => {
    game.nextRound();
    setConfirmNewRoundOpen(false);
  };

  return (
    <div className={`game ${showNewRoundButton ? "game--with-footer" : ""}`}>
      <main className="app">
        {isSetupScreen && (
          <header className="app__hero">
            <p className="app__eyebrow">Party game</p>
            <h1>¿Quién miente?</h1>
            <p>Descubrí quién recibió la pregunta diferente.</p>
          </header>
        )}

        {game.screen === SCREENS.SETUP && <SetupScreen game={game} />}

        {game.screen === SCREENS.QUESTION_PASS && (
          <QuestionPassScreen game={game} />
        )}

        {game.screen === SCREENS.QUESTION_VIEW && (
          <QuestionViewScreen game={game} />
        )}

        {game.screen === SCREENS.RESPONSES_REVEAL && (
          <ResponsesRevealScreen game={game} />
        )}

        {game.screen === SCREENS.ORIGINAL_REVEAL && (
          <OriginalRevealScreen game={game} />
        )}

        {game.screen === SCREENS.FAKE_REVEAL && <FakeRevealScreen game={game} />}
      </main>

      {showNewRoundButton && (
        <footer className="gameFooter">
          <button type="button" onClick={handleNewRound}>
            Nueva ronda
          </button>
        </footer>
      )}

      <ConfirmDialog
        open={confirmNewRoundOpen}
        title="¿Nueva ronda?"
        message="Se va a terminar la ronda actual y comienza una nueva con los mismos jugadores."
        confirmLabel="Nueva ronda"
        cancelLabel="Seguir jugando"
        onConfirm={confirmNewRound}
        onCancel={() => setConfirmNewRoundOpen(false)}
      />
    </div>
  );
}

export default App;