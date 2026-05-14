import { SCREENS, useLocalGame } from "@/hooks/useLocalGame";
import { SetupScreen } from "@/components/SetupScreen/SetupScreen";
import { QuestionPassScreen } from "@/components/QuestionPassScreen/QuestionPassScreen";
import { QuestionViewScreen } from "@/components/QuestionViewScreen/QuestionViewScreen";
import { ResponsesRevealScreen } from "@/components/ResponsesRevealScreen/ResponsesRevealScreen";
import { OriginalRevealScreen } from "@/components/OriginalRevealScreen/OriginalRevealScreen";
import { FakeRevealScreen } from "@/components/FakeRevealScreen/FakeRevealScreen";
import "./styles/global.scss";

function App() {
  const game = useLocalGame();

  return (
    <main className="app">
      <header className="app__header">
        <h1>¿Quién miente?</h1>
        <p>Juego local para descubrir quién recibió la pregunta diferente.</p>
      </header>

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
  );
}

export default App;