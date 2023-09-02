export const rippleEffect = (event: any) => {
  if (!("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return;
  }

  const btn = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  const left = event.clientX - (btn.offsetLeft + radius);
  circle.style.left = `${
    left > btn.clientWidth
      ? left - (window.innerWidth - btn.clientWidth)
      : left
  }px`;
  const top = event.clientY - (btn.offsetTop + radius);
  circle.style.top = `${
    top > btn.clientHeight ? top - (window.innerHeight - btn.clientHeight) : top
  }px`;
  circle.classList.add("ripple");

  const ripple = btn.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  btn.appendChild(circle);
};
