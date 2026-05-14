import { pickRandom } from "./pickRandom";

export function createRound({ players, questionPairs, usedQuestionIds = [] }) {
  const availableQuestions = questionPairs.filter(
    (pair) => !usedQuestionIds.includes(pair.id)
  );

  const pool = availableQuestions.length > 0 ? availableQuestions : questionPairs;

  const questionPair = pickRandom(pool);
  const liar = pickRandom(players);

  if (!questionPair || !liar) {
    return null;
  }

  return {
    id: crypto.randomUUID(),
    questionPairId: questionPair.id,
    liarPlayerId: liar.id,
    questionPair,
    currentQuestionPlayerIndex: 0,
    playersWhoReadQuestion: [],
    answers: {},
    votes: {},
    revealed: false,
  };
}