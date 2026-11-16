export interface MemoryItem {
  id: string;
  image: string;
  title: string;
  caption: string;
  tag: string;
  rotation: number;
}

export interface SpecialReason {
  id: string;
  icon: 'heart' | 'star' | 'crown' | 'flower' | 'gift';
  title: string;
  description: string;
}

export interface BirthdayData {
  recipientName: string;
  senderTitle: string;
  musicTrack: string;
  curtainIntro: {
    specialDayText: string;
    date: string;
    greeting: string;
    recipient: string;
    subtitle: string;
    heroImage: string;
    buttonText: string;
  };
  chapter01: {
    topNote: string;
    greeting: string;
    recipient: string;
    subtitle: string;
    buttonText: string;
  };
  chapter02: {
    title: string;
    subtitle: string;
    skipText: string;
  };
  chapter03: {
    title: string;
    buttonText: string;
  };
  chapter04: {
    recipient: string;
    greeting: string;
    salutation: string;
    paragraphs: string[];
    signOff: string;
  };
  chapter05: {
    title: string;
    caption: string;
    memories: MemoryItem[];
  };
  chapter06: {
    title: string;
    hint: string;
    buttonText: string;
  };
  chapter07: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  chapter08: {
    title: string;
    reasons: SpecialReason[];
  };
  chapter09: {
    title: string;
    wishes: string[];
  };
  chapter10: {
    quote: string;
    heading: string;
    subtitle: string;
    signature: string;
    finalePhoto: string;
  };
}

export const birthdayData: BirthdayData = {
  recipientName: "Divya",
  senderTitle: "Your Brother",
  musicTrack: "/audio/birthday-music.mp3",

  // Royal Curtain Opening Screen (First Impressions)
  curtainIntro: {
    specialDayText: "The Special Day ♡",
    date: "3 December",
    greeting: "Happy Birthday,",
    recipient: "Divya! ♡",
    subtitle: "A Magical Celebration Made Just For You",
    heroImage: "/images/divya-hero.jpg",
    buttonText: "Tap To Open The Royal Curtains ✨",
  },

  // Screen 01: The Magical Entrance
  chapter01: {
    topNote: "A Little World Made Just For You ♡",
    greeting: "Happy Birthday,",
    recipient: "Divya! ♡",
    subtitle: "Today, the world deserves to celebrate someone as special as you.",
    buttonText: "Open Your Surprise ✨",
  },

  // Screen 02: Music Experience
  chapter02: {
    title: "Let's Add Some Music To This Special Journey ♡",
    subtitle: "A soft melody to ♫♪ make your birthday experience even more magical.",
    skipText: "Skip ♡",
  },

  // Screen 03: A Special Letter
  chapter03: {
    title: "A Letter From Your Brother ♡",
    buttonText: "Tap to Open ♡",
  },

  // Screen 04: Open Letter / Letter Reveal
  chapter04: {
    recipient: "Dear lazy Divya ♡",
    greeting: "Happy Birthday!",
    salutation: "To my lazy sister,",
    paragraphs: [
      "Today is not just your birthday, but a reminder of how special you are in your life.",
      "Hamesha khush raho or apne bare me socho duniya jaye bhad me un sab ki MKC, Din bhar mobile chalao reels dekho or Khub tarakki karo etni ki Log bolo ki din bhar mobile chalati, masti karti fir bhi esne ye kese achive kar liye😊",
      "Aur haan, Padhai ki tention mat lena apan dono bina padhe bhi pass hone ki capacity rakhte he🥇 So just chill and enjoye😂",
      "I feel truly lucky to have a sister like you. ♡",
    ],
    signOff: "With lots of love, Your Brother ♡",
  },

  // Screen 05: Our Beautiful Memories
  chapter05: {
    title: "Our Beautiful Memories ♡",
    caption: "A collection of our favourite moments together ♡",
    memories: [
      {
        id: "mem-1",
        image: "/images/polaroid-1.jpg",
        title: "Celebrations & Pure Joy ♡",
        caption: "Festive smiles, sparkling lights, and celebrating every special milestone together.",
        tag: "Moment 01",
        rotation: 4,
      },
      {
        id: "mem-2",
        image: "/images/polaroid-2.jpg",
        title: "Always By Your Side ♡",
        caption: "Shared childhood laughs, warm comfort, and an unbreakable sibling bond.",
        tag: "Moment 02",
        rotation: -4,
      },
      {
        id: "mem-3",
        image: "/images/polaroid-3.jpg",
        title: "Golden Smiles & Unforgettable Days ♡",
        caption: "The happiest candids and memories filled with laughter that never fades.",
        tag: "Moment 03",
        rotation: 3,
      },
    ],
  },

  // Screen 06: Make A Wish, Divya!
  chapter06: {
    title: "Make A Wish, Divya! ♡",
    hint: "Tap the candles to make a wish ♡",
    buttonText: "Make A Wish ♡",
  },

  // Screen 07: Wish Made! (Celebration State)
  chapter07: {
    title: "Wish Made! ♡",
    subtitle: "May all your dreams come true, Divya!",
    buttonText: "Why You Are So Special ♡",
  },

  // Screen 08: Why You Are So Special (Exact content from Screen 08 of Reference)
  chapter08: {
    title: "Why You Are So Special ♡",
    reasons: [
      {
        id: "rs-1",
        icon: "heart",
        title: "Your Beautiful Smile",
        description: "That can brighten anyone's day.",
      },
      {
        id: "rs-2",
        icon: "star",
        title: "Your Kind Heart",
        description: "You care for everyone so deeply.",
      },
      {
        id: "rs-3",
        icon: "crown",
        title: "Your Strength",
        description: "You handle things with so much courage and maturity.",
      },
      {
        id: "rs-4",
        icon: "flower",
        title: "Your Little Joys",
        description: "The way you enjoy the smallest things in life is truly special.",
      },
      {
        id: "rs-5",
        icon: "gift",
        title: "The Happiness You Bring",
        description: "You make our world more beautiful just by being you.",
      },
    ],
  },

  // Screen 09: A Sky Full of Wishes
  chapter09: {
    title: "A Sky Full of Wishes ♡",
    wishes: [
      "May you always be happy, healthy, and surrounded by love ♡",
      "May every goal and passion you chase turn into a proud milestone ✨",
      "May laughter, warmth, and peace stay beside you every single day 🌸",
      "May you travel to dreamy places and experience extraordinary moments 🌙",
      "May you always remember how deeply loved and appreciated you are 💖",
    ],
  },

  // Screen 10: The Grand Finale
  chapter10: {
    quote: "Some people make life more beautiful just by being in it. ♡",
    heading: "Happy Birthday, Divya. ♡",
    subtitle: "Keep smiling, keep shining, and never stop being you.",
    signature: "With lots of love, Your Brother ♡",
    finalePhoto: "/images/sunset-duo.jpg",
  },
};
