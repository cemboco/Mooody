export const getPersonalizedRecommendation = (moodHistory, activities) => {
  if (moodHistory.length < 2) return null;

  const recentMoods = moodHistory.slice(-5);
  const averageMood = recentMoods.reduce((sum, entry) => sum + entry.mood, 0) / recentMoods.length;

  if (!Array.isArray(activities)) {
    console.warn('Activities is not an array:', activities);
    return activities; // Return the activities object as is
  }

  if (averageMood < 5) {
    return activities.find(activity => activity.mood.includes('Sad') || activity.mood.includes('Anxious')) || activities;
  } else if (averageMood >= 5 && averageMood < 7) {
    return activities.find(activity => activity.mood.includes('Neutral') || activity.mood.includes('Happy')) || activities;
  } else {
    return activities.find(activity => activity.mood.includes('Happy') || activity.mood.includes('Excited')) || activities;
  }
};