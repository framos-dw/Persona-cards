// Text to Speech
let synth = window.speechSynthesis;
let utterance;
let volumeControl;
let speedControl;


function inicializarTTS(volumeSelector = 'volume', speedSelector = 'velocidade') {
  volumeControl = document.getElementById(volumeSelector);
  speedControl = document.getElementById(speedSelector);

 
  const elementosTexto = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, article, img');
  elementosTexto.forEach(el => {
    if (!el.hasAttribute('tabindex')) {
      el.setAttribute('tabindex', '0'); 
    }
  });

 
  document.addEventListener('focusin', (event) => {
    const el = event.target;
    let texto = null;

    
    if ((el.tagName === 'BUTTON' || el.tagName === 'A' || el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && el.hasAttribute('aria-label')) {
      texto = el.getAttribute('aria-label');
    } 
 
    else if (el.tagName === 'IMG' && el.hasAttribute('alt')) {
      texto = el.getAttribute('alt');
    } 

    else if (['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'ARTICLE'].includes(el.tagName) && el.innerText.trim() !== '') {
      texto = el.innerText.trim();
    }

    falar(texto);
  });

  
  document.addEventListener('focusout', () => {
    pararFala();
  });
}



function falar(texto) {
  if (!texto) return;
  if (synth.speaking) synth.cancel();
  utterance = new SpeechSynthesisUtterance(texto);
  utterance.volume = volumeControl ? parseFloat(volumeControl.value) : 1;
  utterance.rate = speedControl ? parseFloat(speedControl.value) : 1;
  utterance.lang = 'pt-PT';
  synth.speak(utterance);
}

function pararFala() {
  if (synth.speaking) synth.cancel();
}
