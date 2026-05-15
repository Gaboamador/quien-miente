import { useEffect, useRef, useState } from "react";
import { getScreenAnimation, screenTransitionVariants } from "@/utils/screenAnimations";
import { SCREENS, useLocalGame } from "@/hooks/useLocalGame";
import { AnimatePresence, motion } from "framer-motion";
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

  const previousScreenRef = useRef(game.screen);
  const previousScreen = previousScreenRef.current;

  useEffect(() => {
    previousScreenRef.current = game.screen;
  }, [game.screen]);

  const activeScreenAnimation = getScreenAnimation({
    previousScreen,
    currentScreen: game.screen,
  });

  const renderScreen = () => {
    switch (game.screen) {
      case SCREENS.SETUP:
        return <SetupScreen game={game} />;

      case SCREENS.QUESTION_PASS:
        return <QuestionPassScreen game={game} />;

      case SCREENS.QUESTION_VIEW:
        return <QuestionViewScreen game={game} />;

      case SCREENS.RESPONSES_REVEAL:
        return <ResponsesRevealScreen game={game} />;

      case SCREENS.ORIGINAL_REVEAL:
        return <OriginalRevealScreen game={game} />;

      case SCREENS.FAKE_REVEAL:
        return <FakeRevealScreen game={game} />;

      default:
        return null;
    }
  };

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

        <AnimatePresence
          mode="wait"
          initial={false}
          custom={activeScreenAnimation}
        >
          <motion.div
            key={game.screen}
            className="screenTransition"
            custom={activeScreenAnimation}
            variants={screenTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
        {/* {game.screen === SCREENS.SETUP && <SetupScreen game={game} />}

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

        {game.screen === SCREENS.FAKE_REVEAL && <FakeRevealScreen game={game} />} */}
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
        message="Se va a terminar la ronda actual y comenzar una nueva con los mismos jugadores."
        confirmLabel="Nueva ronda"
        cancelLabel="Seguir jugando"
        onConfirm={confirmNewRound}
        onCancel={() => setConfirmNewRoundOpen(false)}
      />
    </div>
  );
}

export default App;