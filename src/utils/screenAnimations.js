import { SCREENS } from "@/hooks/useLocalGame";

const screenAnimations = {
  instant: {
    initial: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateZ: 0,
      filter: "blur(0px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateZ: 0,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateZ: 0,
      filter: "blur(0px)",
    },
    transition: {
      duration: 0,
    },
  },

  startRound: {
    initial: {
      opacity: 0,
      y: 28,
      scale: 0.94,
      rotateX: 6,
      filter: "blur(10px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      y: -18,
      scale: 0.97,
      rotateX: -3,
      filter: "blur(7px)",
    },
    transition: {
      duration: 0.36,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  questionReveal: {
    initial: {
        opacity: 0,
        y: 18,
        scale: 0.82,
        rotateX: 10,
        filter: "blur(16px)",
        clipPath: "inset(42% 12% 42% 12% round 28px)",
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: [0.82, 1.025, 1],
        rotateX: 0,
        filter: "blur(0px)",
        clipPath: "inset(0% 0% 0% 0% round 0px)",
    },
    exit: {
        opacity: 0,
        y: -8,
        scale: 0.9,
        rotateX: -9,
        filter: "blur(12px)",
        clipPath: "inset(12% 8% 12% 8% round 24px)",
    },
    transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        scale: {
        duration: 0.5,
        times: [0, 0.72, 1],
        ease: [0.16, 1, 0.3, 1],
        },
        clipPath: {
        duration: 0.46,
        ease: [0.16, 1, 0.3, 1],
        },
        filter: {
        duration: 0.34,
        ease: "easeOut",
        },
    },
    },

  responsesReveal: {
    initial: {
      opacity: 0,
      y: 34,
      scale: 0.97,
      filter: "blur(10px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 1.02,
      filter: "blur(8px)",
    },
    transition: {
      duration: 0.36,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  originalReveal: {
    initial: {
        opacity: 0,
        y: 14,
        scale: 0.96,
        filter: "blur(8px)",
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
    },
    exit: {
        opacity: 0,
        y: -12,
        scale: 0.96,
        filter: "blur(6px)",
    },
    transition: {
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1],
    },
    },

  fakeReveal: {
    initial: {
      opacity: 0,
      y: 18,
      scale: 0.86,
      rotateZ: -1.5,
      filter: "blur(16px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateZ: 0,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      y: -16,
      scale: 0.94,
      rotateZ: 1,
      filter: "blur(8px)",
    },
    transition: {
      duration: 0.46,
      ease: [0.16, 1, 0.3, 1],
    },
  },

  truthReveal: {
    initial: {
        opacity: 0,
        y: 0,
        scale: 0.72,
        rotateX: 0,
        filter: "blur(18px)",
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
    },
    exit: {
        opacity: 0,
        y: 0,
        scale: 1.08,
        rotateX: 0,
        filter: "blur(12px)",
    },
    transition: {
        duration: 0.52,
        ease: [0.16, 1, 0.3, 1],
    },
    },

  default: {
    initial: {
      opacity: 0,
      y: 18,
      scale: 0.975,
      filter: "blur(6px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      y: -16,
      scale: 0.985,
      filter: "blur(5px)",
    },
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const screenTransitionVariants = {
  initial: (animation) => animation.initial,
  animate: (animation) => ({
    ...animation.animate,
    transition: animation.transition,
  }),
  exit: (animation) => ({
    ...animation.exit,
    transition: animation.transition,
  }),
};

export const getScreenAnimation = ({ previousScreen, currentScreen }) => {
  const isOpeningPrivateQuestion =
    previousScreen === SCREENS.QUESTION_PASS &&
    currentScreen === SCREENS.QUESTION_VIEW;

  const isPassingToNextPlayer =
    previousScreen === SCREENS.QUESTION_VIEW &&
    currentScreen === SCREENS.QUESTION_PASS;

  const isShowingFakeQuestion =
    previousScreen === SCREENS.ORIGINAL_REVEAL &&
    currentScreen === SCREENS.FAKE_REVEAL;

  if (isPassingToNextPlayer || isShowingFakeQuestion) {
    return screenAnimations.instant;
  }

  if (isOpeningPrivateQuestion) {
    return screenAnimations.questionReveal;
  }

  if (
    previousScreen === SCREENS.SETUP &&
    currentScreen === SCREENS.QUESTION_PASS
  ) {
    return screenAnimations.startRound;
  }

  if (currentScreen === SCREENS.RESPONSES_REVEAL) {
    return screenAnimations.responsesReveal;
  }

  if (
    previousScreen === SCREENS.RESPONSES_REVEAL &&
    currentScreen === SCREENS.ORIGINAL_REVEAL
  ) {
    return screenAnimations.truthReveal;
  }

  if (currentScreen === SCREENS.ORIGINAL_REVEAL) {
    return screenAnimations.originalReveal;
  }

  if (currentScreen === SCREENS.FAKE_REVEAL) {
    return screenAnimations.fakeReveal;
  }

  return screenAnimations.default;
};