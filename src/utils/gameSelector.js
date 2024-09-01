const activities = [
  { name: "Bubble Wrap zerplatzen", mood: ["Gestresst", "Wütend", "Ängstlich"] },
  { name: "Kurze Meditation", mood: ["Gestresst", "Wütend", "Traurig", "Ängstlich"] },
  { name: "Lustiges Video schauen", mood: ["Traurig", "Müde", "Ängstlich"] },
  { name: "Dankbarkeitstagebuch schreiben", mood: ["Traurig", "Gestresst", "Ängstlich"] },
  { name: "Tanzpause einlegen", mood: ["Müde", "Traurig", "Ängstlich"] },
  { name: "Wortspiele lösen", mood: ["Müde", "Glücklich"] },
  { name: "Positive Affirmationen sprechen", mood: ["Traurig", "Gestresst", "Wütend", "Ängstlich"] },
  { name: "Schnelles Zeichnen üben", mood: ["Glücklich", "Gestresst"] },
  { name: "Tiefes Atmen üben", mood: ["Ängstlich", "Gestresst"] },
];

export const selectActivity = (mood) => {
  const suitableActivities = activities.filter(activity => activity.mood.includes(mood));
  return suitableActivities[Math.floor(Math.random() * suitableActivities.length)];
};
