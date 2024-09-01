import { useLanguage } from '../contexts/LanguageContext';

const activities = {
  de: [
    { name: "Bubble Wrap zerplatzen", mood: ["Gestresst", "Wütend", "Ängstlich"] },
    { name: "Kurze Meditation", mood: ["Gestresst", "Wütend", "Traurig", "Ängstlich"] },
    { name: "Lustiges Video schauen", mood: ["Traurig", "Müde", "Ängstlich"] },
    { name: "Dankbarkeitstagebuch schreiben", mood: ["Traurig", "Gestresst", "Ängstlich"] },
    { name: "Tanzpause einlegen", mood: ["Müde", "Traurig", "Ängstlich"] },
    { name: "Wortspiele lösen", mood: ["Müde", "Glücklich"] },
    { name: "Positive Affirmationen sprechen", mood: ["Traurig", "Gestresst", "Wütend", "Ängstlich"] },
    { name: "Schnelles Zeichnen üben", mood: ["Glücklich", "Gestresst"] },
    { name: "Tiefes Atmen üben", mood: ["Ängstlich", "Gestresst"] },
  ],
  en: [
    { name: "Pop bubble wrap", mood: ["Stressed", "Angry", "Anxious"] },
    { name: "Short meditation", mood: ["Stressed", "Angry", "Sad", "Anxious"] },
    { name: "Watch a funny video", mood: ["Sad", "Tired", "Anxious"] },
    { name: "Write in a gratitude journal", mood: ["Sad", "Stressed", "Anxious"] },
    { name: "Take a dance break", mood: ["Tired", "Sad", "Anxious"] },
    { name: "Solve word puzzles", mood: ["Tired", "Happy"] },
    { name: "Speak positive affirmations", mood: ["Sad", "Stressed", "Angry", "Anxious"] },
    { name: "Practice speed drawing", mood: ["Happy", "Stressed"] },
    { name: "Practice deep breathing", mood: ["Anxious", "Stressed"] },
  ]
};

export const selectActivity = (mood, language) => {
  const languageActivities = activities[language] || activities.en;
  const suitableActivities = languageActivities.filter(activity => activity.mood.includes(mood));
  if (suitableActivities.length === 0) {
    return { name: language === 'de' ? "Entspannen und reflektieren" : "Relax and reflect", mood: [mood] };
  }
  return suitableActivities[Math.floor(Math.random() * suitableActivities.length)];
};

export const addCustomMood = (newMood, language) => {
  const languageActivities = activities[language] || activities.en;
  languageActivities.forEach(activity => {
    if (Math.random() > 0.5) {
      activity.mood.push(newMood);
    }
  });
};

export const addCustomActivity = (activityName, language) => {
  const newActivity = { name: activityName, mood: ["Custom"] };
  activities[language].push(newActivity);
  return newActivity;
};

export const deleteCustomActivity = (activityToDelete, language) => {
  activities[language] = activities[language].filter(activity => activity.name !== activityToDelete.name);
};