import React from 'react';

const TextToSpeech = () => {
  const handleTextToSpeech = () => {
    const text = 'Bienvenue dans notre banque.';
    const speechSynthesis = window.speechSynthesis;

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Diminue la vitesse de lecture
      speechSynthesis.speak(utterance);
    } else {
      console.log('La synthèse vocale n\'est pas supportée par votre navigateur.');
    }
  };

  return (
    <div>
      <button onClick={handleTextToSpeech}>Lire le texte</button>
    </div>
  );
};

export default TextToSpeech;
