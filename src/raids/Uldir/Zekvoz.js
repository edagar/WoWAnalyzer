import Background from './Images/Backgrounds/Zekvoz.jpg';
import Headshot from './Images/Headshots/Zekvoz.png';

export default {
  id: 2136,
  name: 'Zek\'voz',
  background: Background,
  headshot: Headshot,
  icon: 'achievement_nazmir_boss_zekvoz',
  fight: {
    //vantusRuneBuffId: 250144,
    // TODO: Add fight specific props
    // e.g. baseDowntime (seconds, percentage, based on (de)buff, etc)
    // e.g. ads
    softMitigationChecks:{
      VoidLash: 265264,
      Shatter: 265237,
    },
  },
};
