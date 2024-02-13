import { useState, useEffect } from 'react';

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
}

export function usePlayWTFeeAudio() {
  const playWTFeeAudio = () => {
    const targetAudios = document.getElementById(
      'wtfeeAudio',
    ) as HTMLAudioElement;
    if (targetAudios) {
      targetAudios.play();
    }
  };

  return playWTFeeAudio;
}
