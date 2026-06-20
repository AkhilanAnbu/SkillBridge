const meter = document.querySelector(".meter span");
let percent = 62;
let goingUp = true;

if (meter) {
  setInterval(() => {
    percent = goingUp ? percent + 3 : percent - 3;

    if (percent >= 88) {
      goingUp = false;
    }

    if (percent <= 62) {
      goingUp = true;
    }

    meter.style.width = `${percent}%`;
  }, 700);
}
