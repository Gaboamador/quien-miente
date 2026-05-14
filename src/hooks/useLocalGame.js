import { useEffect, useMemo, useState } from "react";
import { QUESTION_PAIRS } from "@/data/questionPairs";
import { createRound } from "@/utils/createRound";

export const SCREENS = {
  SETUP: "setup",
  QUESTION_PASS: "question_pass",
  QUESTION_VIEW: "question_view",
  RESPONSES_REVEAL: "responses_reveal",
  ORIGINAL_REVEAL: "original_reveal",
  FAKE_REVEAL: "fake_reveal",
};

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 8;

const STORAGE_KEY = "quien_miente_game_state";

const createPlayer = (name) => ({
  id: crypto.randomUUID(),
  name: name.trim(),
});

const getInitialState = () => {
  const fallbackState = {
    players: [],
    round: null,
    screen: SCREENS.SETUP,
    usedQuestionIds: [],
  };

  try {
    const rawState = localStorage.getItem(STORAGE_KEY);

    if (!rawState) {
      return fallbackState;
    }

    const parsedState = JSON.parse(rawState);

    const hasPlayers = Array.isArray(parsedState.players);
    const hasUsedQuestions = Array.isArray(parsedState.usedQuestionIds);

    if (!hasPlayers || !hasUsedQuestions) {
      return fallbackState;
    }

    const hasActiveRound = Boolean(parsedState.round);

    return {
      players: parsedState.players,
      round: parsedState.round ?? null,
      usedQuestionIds: parsedState.usedQuestionIds,
      screen: hasActiveRound
        ? normalizeRestoredScreen(parsedState.screen)
        : SCREENS.SETUP,
    };
  } catch {
    return fallbackState;
  }
};

const normalizeRestoredScreen = (screen) => {
  const validScreens = Object.values(SCREENS);

  if (!validScreens.includes(screen)) {
    return SCREENS.SETUP;
  }

  // Si se refresca justo mientras alguien estaba viendo su pregunta privada,
  // no restauramos la pregunta abierta. Volvemos al paso previo.
  if (screen === SCREENS.QUESTION_VIEW) {
    return SCREENS.QUESTION_PASS;
  }

  return screen;
};

export function useLocalGame() {
  const initialState = useMemo(() => getInitialState(), []);

  const [players, setPlayers] = useState(initialState.players);
  const [round, setRound] = useState(initialState.round);
  const [screen, setScreen] = useState(initialState.screen);
  const [usedQuestionIds, setUsedQuestionIds] = useState(
    initialState.usedQuestionIds
  );

  useEffect(() => {
    const stateToSave = {
      players,
      round,
      screen,
      usedQuestionIds,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [players, round, screen, usedQuestionIds]);

  const currentQuestionPlayer = useMemo(() => {
    if (!round || !players.length) return null;

    return players[round.currentQuestionPlayerIndex] ?? null;
  }, [players, round]);

  const currentQuestion = useMemo(() => {
    if (!round || !currentQuestionPlayer) return "";

    const isLiar = currentQuestionPlayer.id === round.liarPlayerId;

    return isLiar ? round.questionPair.fake : round.questionPair.normal;
  }, [currentQuestionPlayer, round]);

  const liarPlayer = useMemo(() => {
    if (!round) return null;

    return players.find((player) => player.id === round.liarPlayerId) ?? null;
  }, [players, round]);

  const canStartRound =
    players.length >= MIN_PLAYERS && players.length <= MAX_PLAYERS;

  const addPlayer = (name) => {
    const cleanName = name.trim();

    if (!cleanName) {
      return {
        ok: false,
        message: "Ingresá un nombre.",
      };
    }

    if (players.length >= MAX_PLAYERS) {
      return {
        ok: false,
        message: `El máximo es ${MAX_PLAYERS} jugadores.`,
      };
    }

    const alreadyExists = players.some(
      (player) => player.name.toLowerCase() === cleanName.toLowerCase()
    );

    if (alreadyExists) {
      return {
        ok: false,
        message: "Ya hay un jugador con ese nombre.",
      };
    }

    setPlayers((prev) => [...prev, createPlayer(cleanName)]);

    return {
      ok: true,
      message: "",
    };
  };

  const removePlayer = (playerId) => {
    setPlayers((prev) => prev.filter((player) => player.id !== playerId));
  };

  const renamePlayer = (playerId, nextName) => {
    const cleanName = nextName.trim();

    if (!cleanName) {
      return {
        ok: false,
        message: "Ingresá un nombre.",
      };
    }

    const alreadyExists = players.some(
      (player) =>
        player.id !== playerId &&
        player.name.toLowerCase() === cleanName.toLowerCase()
    );

    if (alreadyExists) {
      return {
        ok: false,
        message: "Ya hay otro jugador con ese nombre.",
      };
    }

    setPlayers((prev) =>
      prev.map((player) =>
        player.id === playerId ? { ...player, name: cleanName } : player
      )
    );

    return {
      ok: true,
      message: "",
    };
  };

  const startRound = () => {
    if (!canStartRound) {
      return {
        ok: false,
        message: `Se necesitan entre ${MIN_PLAYERS} y ${MAX_PLAYERS} jugadores.`,
      };
    }

    const nextRound = createRound({
      players,
      questionPairs: QUESTION_PAIRS,
      usedQuestionIds,
    });

    if (!nextRound) {
      return {
        ok: false,
        message: "No se pudo crear la ronda.",
      };
    }

    setRound(nextRound);
    setScreen(SCREENS.QUESTION_PASS);

    return {
      ok: true,
      message: "",
    };
  };

  const showCurrentQuestion = () => {
    if (!round || !currentQuestionPlayer) return;

    setScreen(SCREENS.QUESTION_VIEW);
  };

  const confirmQuestionRead = () => {
    if (!round || !currentQuestionPlayer) return;

    const isLastPlayer = round.currentQuestionPlayerIndex >= players.length - 1;

    if (isLastPlayer) {
      setRound((prev) => ({
        ...prev,
        playersWhoReadQuestion: [
          ...prev.playersWhoReadQuestion,
          currentQuestionPlayer.id,
        ],
      }));

      setScreen(SCREENS.RESPONSES_REVEAL);
      return;
    }

    setRound((prev) => ({
      ...prev,
      currentQuestionPlayerIndex: prev.currentQuestionPlayerIndex + 1,
      playersWhoReadQuestion: [
        ...prev.playersWhoReadQuestion,
        currentQuestionPlayer.id,
      ],
    }));

    setScreen(SCREENS.QUESTION_PASS);
  };

  const showOriginalQuestion = () => {
    if (!round) return;

    setScreen(SCREENS.ORIGINAL_REVEAL);
  };

  const revealFakeQuestion = () => {
    if (!round) return;

    setRound((prev) => ({
      ...prev,
      revealed: true,
    }));

    setScreen(SCREENS.FAKE_REVEAL);
  };

  const nextRound = () => {
    if (!round) return;

    setUsedQuestionIds((prev) => [...prev, round.questionPairId]);
    setRound(null);
    setScreen(SCREENS.SETUP);
  };

  const clearSavedGame = () => {
    localStorage.removeItem(STORAGE_KEY);

    setPlayers([]);
    setRound(null);
    setUsedQuestionIds([]);
    setScreen(SCREENS.SETUP);
  };

  return {
    players,
    round,
    screen,
    usedQuestionIds,

    currentQuestionPlayer,
    currentQuestion,
    liarPlayer,

    minPlayers: MIN_PLAYERS,
    maxPlayers: MAX_PLAYERS,
    canStartRound,

    addPlayer,
    removePlayer,
    renamePlayer,
    startRound,

    showCurrentQuestion,
    confirmQuestionRead,

    showOriginalQuestion,
    revealFakeQuestion,
    nextRound,
    clearSavedGame,
  };
}