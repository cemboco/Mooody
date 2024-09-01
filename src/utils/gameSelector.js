const games = [
  { name: "Bubble Wrap Popping", mood: ["Gestresst", "Wütend"] },
  { name: "Kurze Meditation", mood: ["Gestresst", "Wütend", "Traurig"] },
  { name: "Lustiges Video schauen", mood: ["Traurig", "Müde"] },
  { name: "Dankbarkeitstagebuch", mood: ["Traurig", "Gestresst"] },
  { name: "Tanzpause", mood: ["Müde", "Traurig"] },
  { name: "Wortspiele", mood: ["Müde", "Glücklich"] },
  { name: "Positive Affirmationen", mood: ["Traurig", "Gestresst", "Wütend"] },
  { name: "Schnelles Zeichnen", mood: ["Glücklich", "Gestresst"] },
];

export const selectGame = (mood) => {
  const suitableGames = games.filter(game => game.mood.includes(mood));
  return suitableGames[Math.floor(Math.random() * suitableGames.length)];
};