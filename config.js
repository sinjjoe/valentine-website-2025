export const config = {
  valentineName: "Kyle",
  pageTitle: "Will You Be My Valentine? 💝",

  floatingEmojis: {
    hearts: ["❤️", "💖", "💝", "💗", "💓"],
    bears: ["🧸", "🐻"],
  },

  questions: {
    first: {
      text: "Do you like me?",
      yesBtn: "Yes",
      noBtn: "No",
      secretAnswer: "With all my heart",
    },
    second: {
      text: "Do you really like me?",
      startText: "Of course baby",
      nextBtn: "Please stop",
    },
    third: {
      text: "Will you be my Valentine...?",
      yesBtn: "Yes!",
      noBtn: "No",
    },
  },

  celebration: {
    title: "Yay!",
    emojis: "🎁💖🤗💝💋❤️💕",
  },

  colors: {
    backgroundStart: "#ffafbd",
    backgroundEnd: "#ffc3a0",
    buttonBackground: "#ff6b6b",
    buttonHover: "#ff8787",
    textColor: "#ff4757",
  },

  animations: {
    floatDuration: "15s",
    floatDistance: "50px",
    bounceSpeed: "0.5s",
    heartExplosionSize: 1.5,
  },
};
