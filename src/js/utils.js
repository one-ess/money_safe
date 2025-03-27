export const reformatDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${day.padStart(2, "")}.${month.padStart(2, "0")}.${year}`;
};

export const animateNumber = (element, number) => {
  const frames = 60;
  const duration = 1000;
  const frameDuration = duration / frames;
  const totalFrame = Math.round(duration / frameDuration);

  let currentFrame = 0;

  const initialNumber = parseInt(element.textContent.replace(/[^0-9.-]+/g, ""));

  const increment = Math.trunc((number - initialNumber) / totalFrame);

  const animate = () => {
    currentFrame += 1;
    const newNumber = initialNumber + increment * currentFrame;
    element.textContent = `${newNumber.toLocaleString()} ₸`;

    if (currentFrame < totalFrame) {
      requestAnimationFrame(animate); //нативный метод браузера, предпочтительнее чем setinterval
    } else {
      element.textContent = `${number.toLocaleString()} ₸`;
    }
  };

  animate();
};
