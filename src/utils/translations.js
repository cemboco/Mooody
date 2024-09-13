const baseTranslations = {
  title: 'Moody',
  subtitle: {
    en: 'Because "How are you?" is often not enough.',
    de: 'Weil "Wie geht´s?" oft nicht ausreicht.',
    fr: 'Parce que "Comment allez-vous ?" ne suffit souvent pas.',
    es: 'Porque "¿Cómo estás?" a menudo no es suficiente.'
  },
  notificationButton: {
    en: 'How are you feeling?',
    de: 'Wie fühlst du dich?',
    fr: 'Comment vous sentez-vous ?',
    es: '¿Cómo te sientes?'
  },
  homePageText: {
    en: "Your feelings are more than fleeting moments of emotion; they are the whispers of your inner self, guiding you toward your truest path. In a world that often encourages us to think, analyze, and rationalize, we sometimes forget to pause and listen to the quiet voice of our hearts. But your feelings—whether they are of joy, sadness, fear, or excitement—are powerful messengers, each carrying a truth that your mind alone cannot comprehend.",
    de: "Deine Gefühle sind mehr als flüchtige Momente der Emotion; sie sind das Flüstern deines inneren Selbst, das dich auf deinen wahrhaftigsten Weg führt. In einer Welt, die uns oft ermutigt zu denken, zu analysieren und zu rationalisieren, vergessen wir manchmal innezuhalten und auf die leise Stimme unseres Herzens zu hören. Aber deine Gefühle – ob Freude, Traurigkeit, Angst oder Aufregung – sind mächtige Botschafter, die jeweils eine Wahrheit in sich tragen, die dein Verstand allein nicht erfassen kann.",
    fr: "Vos sentiments sont plus que des moments fugaces d'émotion ; ils sont les murmures de votre moi intérieur, vous guidant vers votre chemin le plus vrai. Dans un monde qui nous encourage souvent à penser, analyser et rationaliser, nous oublions parfois de faire une pause et d'écouter la voix calme de notre cœur. Mais vos sentiments - qu'ils soient de joie, de tristesse, de peur ou d'excitation - sont de puissants messagers, chacun portant une vérité que votre esprit seul ne peut comprendre.",
    es: "Tus sentimientos son más que momentos fugaces de emoción; son los susurros de tu yo interior, guiándote hacia tu camino más verdadero. En un mundo que a menudo nos anima a pensar, analizar y racionalizar, a veces olvidamos hacer una pausa y escuchar la voz silenciosa de nuestro corazón. Pero tus sentimientos, ya sean de alegría, tristeza, miedo o emoción, son poderosos mensajeros, cada uno portando una verdad que tu mente por sí sola no puede comprender."
  },
  // Add other translations here...
};

const emotions = ['happy', 'sad', 'tired', 'angry', 'stressed', 'anxious', 'confident', 'numb', 'calm', 'worried', 'optimistic'];

const emotionTranslations = {
  de: {
    happy: 'Glücklich',
    sad: 'Traurig',
    tired: 'Müde',
    angry: 'Wütend',
    stressed: 'Gestresst',
    anxious: 'Ängstlich',
    confident: 'Selbstsicher',
    numb: 'Gefühllos',
    calm: 'Ruhig',
    worried: 'Besorgt',
    optimistic: 'Optimistisch'
  },
  fr: {
    happy: 'Heureux',
    sad: 'Triste',
    tired: 'Fatigué',
    angry: 'En colère',
    stressed: 'Stressé',
    anxious: 'Anxieux',
    confident: 'Confiant',
    numb: 'Engourdi',
    calm: 'Calme',
    worried: 'Inquiet',
    optimistic: 'Optimiste'
  },
  es: {
    happy: 'Feliz',
    sad: 'Triste',
    tired: 'Cansado',
    angry: 'Enojado',
    stressed: 'Estresado',
    anxious: 'Ansioso',
    confident: 'Seguro',
    numb: 'Insensible',
    calm: 'Tranquilo',
    worried: 'Preocupado',
    optimistic: 'Optimista'
  }
};

export const translations = Object.keys(baseTranslations.subtitle).reduce((acc, lang) => {
  acc[lang] = {
    ...baseTranslations,
    ...Object.keys(baseTranslations).reduce((innerAcc, key) => {
      innerAcc[key] = typeof baseTranslations[key] === 'object' ? baseTranslations[key][lang] : baseTranslations[key];
      return innerAcc;
    }, {}),
    ...emotions.reduce((emotionAcc, emotion) => {
      emotionAcc[emotion] = lang === 'en' ? emotion : emotionTranslations[lang][emotion];
      return emotionAcc;
    }, {})
  };
  return acc;
}, {});
