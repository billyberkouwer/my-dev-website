export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemUp = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ease: [0.25, 0.5, 0.75, 1.0], type: "tween" },
  },
};

export const itemDown = {
    hidden: { opacity: 0, y: -100 },
    show: {
      opacity: 1,
      y: 0,
      transition: { ease: [0.25, 0.5, 0.75, 1.0], type: "tween" },
    },
  };
