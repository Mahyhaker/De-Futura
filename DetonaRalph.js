const windowsGrid = document.querySelector(".windows-grid");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
let score = 0;
let ralphTimeout;

// Gera as janelas
function generateWindows() {
  for (let i = 0; i < 9; i++) {
    const window = document.createElement("div");
    window.classList.add("window");
    windowsGrid.appendChild(window);
  }
}

// Limpa o grid de janelas e remove Ralphs
function clearWindows() {
  const ralphs = document.querySelectorAll("#ralph");
  ralphs.forEach(ralph => ralph.remove());
}

// Mostra o Ralph aleatoriamente
function showRalph() {
  const windows = document.querySelectorAll(".window");
  const randomWindow = windows[Math.floor(Math.random() * windows.length)];

  // Verifica se já há um Ralph em uma janela
  if (!randomWindow.querySelector("#ralph")) {
    const ralph = document.createElement("div");
    ralph.id = "ralph";
    randomWindow.appendChild(ralph);

    ralph.addEventListener("click", () => {
      score++;
      scoreEl.textContent = score; // Atualiza a pontuação
      playAudio("hit-sound.mp3"); // Áudio de acerto
      ralph.remove(); // Remove o Ralph após o clique
      clearTimeout(ralphTimeout); // Limpa o temporizador anterior
      showRalph(); // Mostra Ralph novamente
    });

    ralphTimeout = setTimeout(() => {
      ralph.remove(); // Remove Ralph se o tempo acabar
      if (score > 0) score--; // Reduz a pontuação se o tempo acabar
      scoreEl.textContent = score; // Atualiza a pontuação
      showRalph(); // Mostra Ralph novamente
    }, 1000);
  } else {
    showRalph(); // Tenta mostrar o Ralph novamente se já houver
  }
}

// Inicia o jogo
function startGame() {
  clearWindows(); // Limpa Ralphs antigos
  score = 0; // Reinicia a pontuação
  scoreEl.textContent = score; // Atualiza a pontuação na tela
  clearTimeout(ralphTimeout); // Limpa qualquer temporizador anterior
  showRalph(); // Mostra o Ralph pela primeira vez
  playAudio("start-sound.mp3"); // Áudio de início
}

// Reproduz áudio
function playAudio(src) {
  const audio = new Audio(src);
  audio.play();
}

startBtn.addEventListener("click", startGame);
generateWindows();
