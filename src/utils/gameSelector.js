let activities = [
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
  if (suitableActivities.length === 0) {
    return { name: "Entspannen und reflektieren", mood: [mood] };
  }
  return suitableActivities[Math.floor(Math.random() * suitableActivities.length)];
};

export const addCustomMood = (newMood) => {
  activities.forEach(activity => {
    if (Math.random() > 0.5) {
      activity.mood.push(newMood);
    }
  });
};
