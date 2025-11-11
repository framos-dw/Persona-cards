// Text size
let size = 100;
function increaseText(){
    if (size < 200){
        size += 10;
        document.body.style.fontSize = size + '%';
        document.getElementById("textSizePercent").textContent = size + '%';
    }
}

function decreaseText(){
    if (size>100){
        size -= 10;
        document.body.style.fontSize = size + '%';
        document.getElementById("textSizePercent").textContent = size + '%';
    }
}





//Animação inicial
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('.illustrations img');
    
    setTimeout(() => {
        images.forEach((img, index) => {
            setTimeout(() => {
                img.classList.add('visible');
            }, index * 150); 
        });
    }, 500); 
});


//Fetch text - personas
inicializarTTS();

const BASE_URL = 'https://raw.githubusercontent.com/FRAMOS-DW/PERSONA-CARDS/main/personas.json';
const PERSONA_ID = new URLSearchParams(window.location.search).get('id');

async function fetchPersona() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch persona data');
        }

        const data = await response.json();
        const persona = data[PERSONA_ID];

        if (!persona) {
            console.warn('Persona not found');
            return;
        }
        document.getElementById('title').innerText = persona.title;
        document.getElementById('text').innerText = persona.text;

        const imageElement = document.getElementById('img');
        if (persona.img) {
            imageElement.src = persona.img;
            imageElement.alt = persona.alt || '';
            imageElement.style.display = 'block';
        } else {
            imageElement.style.display = 'none';
            console.warn('Image not available for this persona');
        }

    } catch (error) {
        console.error('Error loading persona:', error);
    }
}

fetchPersona();


// Back to Top 
document.addEventListener("DOMContentLoaded", () => {
    const topButton = document.getElementById("top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            topButton.classList.add("show");
        } else {
            topButton.classList.remove("show");
        }
    });
});

function backtotop(){
    window.scroll({
        top: 0,
        behavior:"smooth"
    });
}



