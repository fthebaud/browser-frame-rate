'use strict';

let framerate = (function () { // eslint-disable-line no-unused-vars

  let start;
  let timestamp;
  let resultats = [];
  let towardsRight;
  let pixelShift = 1;

  function initialisation() {
    let button = document.getElementById('launchButton');
    button.addEventListener('click', animate);
  }

  function animate() {
    if (!start) {
      start = Date.now();
      document.getElementById('launchButton').disabled = true;
      towardsRight = true;
    }

    //animate frame
    let div = document.getElementById('blueDiv');
    let left = Number.parseInt(div.style.left.slice(0, -2)) || 0;
    if (left > 100) {
      towardsRight = false;
    }
    if (left <= 0) {
      towardsRight = true;
    }
    if (towardsRight) {
      left = left + pixelShift;
    } else {
      left = left -pixelShift;
    }
    document.getElementById('blueDiv').style.left = left + 'px';

    // calcul fps
    if (timestamp) {
      let newTimestamp = Date.now();
      let delta = newTimestamp - timestamp;
      let fps = 1000 / delta;
      resultats.push(fps);
      timestamp = newTimestamp;
    }
    else {
      timestamp = Date.now();
    }

    let dureeAnimation = 5000; // en ms
    if (Date.now() - start < dureeAnimation) {
      // request a render before animating next frame
      window.requestAnimationFrame(animate);
    }
    else {
      console.log(resultats);
      var moyenne = resultats.reduce(function (previousValue, currentValue, currentIndex, array) {
        if (currentIndex === array.length - 1) {
          return (previousValue + currentValue) / array.length;
        }
        return previousValue + currentValue;
      }, 0);

      let res = `nombre de frames = ${resultats.length}<br/>
                 average fps = ${moyenne.toFixed(3)}<br/>
                 fps max = ${Math.max(...resultats).toFixed(3)}<br/>
                 fps min = ${Math.min(...resultats).toFixed(3)}`;
      document.getElementById('resultats').innerHTML = res;

      document.getElementById('launchButton').disabled = false;
      start = null;
      timestamp = null;
      resultats.length = 0;
    }
  }

  return {
    init: initialisation
  };

}());


framerate.init();
