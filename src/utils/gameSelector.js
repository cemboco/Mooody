const activities = [
  { name: "Bubble Wrap zerplatzen", mood: ["Gestresst", "Wütend"] },
  { name: "Kurze Meditation", mood: ["Gestresst", "Wütend", "Traurig"] },
  { name: "Lustiges Video schauen", mood: ["Traurig", "Müde"] },
  { name: "Dankbarkeitstagebuch schreiben", mood: ["Traurig", "Gestresst"] },
  { name: "Tanzpause einlegen", mood: ["Müde", "Traurig"] },
  { name: "Wortspiele lösen", mood: ["Müde", "Glücklich"] },
  { name: "Positive Affirmationen sprechen", mood: ["Traurig", "Gestresst", "Wütend"] },
  { name: "Schnelles Zeichnen üben", mood: ["Glücklich", "Gestresst"] },
];

export const selectActivity = (mood) => {
  const suitableActivities = activities.filter(activity => activity.mood.includes(mood));
  return suitableActivities[Math.floor(Math.random() * suitableActivities.length)];
};
