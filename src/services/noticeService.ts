import useSound from "use-sound";

// Sound file imports
import boopSfx from "../../sounds/chanjoin.mp3";

const soundContextProvider = () => {
  const [play] = useSound(boopSfx);
};

const playCustomSound = (sound: string) => {};

const exportObject = {
  playCustomSound,
};

export default exportObject;
