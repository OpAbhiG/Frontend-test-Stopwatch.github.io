let startTime, elapsedTime = 0, timerInterval;
const timeDisplay = document.getElementById('time');
const lapsContainer = document.getElementById('laps');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  const now = Date.now();
  elapsedTime = now - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

startStopButton.addEventListener('click', () => {
  if (timerInterval) {
    // Stop
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime += Date.now() - startTime;
    startStopButton.textContent = 'Start';
    resetButton.disabled = false;
    lapButton.disabled = true;
  } else {
    // Start
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    startStopButton.textContent = 'Stop';
    resetButton.disabled = true;
    lapButton.disabled = false;
  }
});

resetButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  timeDisplay.textContent = '00:00:00.000';
  startStopButton.textContent = 'Start';
  resetButton.disabled = true;
  lapButton.disabled = true;
  lapsContainer.innerHTML = '';
});

lapButton.addEventListener('click', () => {
  const lapTime = document.createElement('div');
  lapTime.textContent = formatTime(elapsedTime);
  lapTime.className = 'lap';
  lapsContainer.appendChild(lapTime);
});
