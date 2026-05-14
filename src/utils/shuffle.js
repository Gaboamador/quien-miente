export function shuffle(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return [...items].sort(() => Math.random() - 0.5);
}