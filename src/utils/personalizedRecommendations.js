export const getPersonalizedRecommendation = (moodHistory, activities) => {
  if (moodHistory.length < 2) return null;

  const recentMoods = moodHistory.slice(-5);
  const averageMood = recentMoods.reduce((sum, mood) => sum + mood, 0) / recentMoods.length;

  if (averageMood < 5) {
    return activities.find(activity => activity.mood.includes('Sad') || activity.mood.includes('Anxious'));
  } else if (averageMood >= 5 && averageMood < 7) {
    return activities.find(activity => activity.mood.includes('Neutral') || activity.mood.includes('Happy'));
  } else {
    return activities.find(activity => activity.mood.includes('Happy') || activity.mood.includes('Excited'));
  }
};