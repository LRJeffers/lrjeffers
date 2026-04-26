// ==================== SISTEMA DE SONIDOS ====================
let soundEnabled = false;
let sounds = {};
let soundsLoaded = false;

function loadSounds() {
  console.log('🔊 Cargando sonidos...');
  
  try {
    sounds = {
      click: new Audio('assets/sounds/click.mp3'),
      hover: new Audio('assets/sounds/hover.mp3'),
      submit: new Audio('assets/sounds/submit.mp3')
    };
    
    Object.keys(sounds).forEach(key => {
      sounds[key].addEventListener('canplaythrough', () => {
        console.log(`✅ Sonido "${key}" cargado`);
      });
      
      sounds[key].addEventListener('error', (e) => {
        console.error(`❌ Error cargando "${key}":`, e);
      });
    });
    
    Object.values(sounds).forEach(sound => {
      sound.volume = 0.7;
    });
    
    soundsLoaded = true;
  } catch (error) {
    console.error('Error al cargar sonidos:', error);
  }
}

function playSound(soundName) {
  if (!soundEnabled) return;
  
  if (!soundsLoaded) {
    loadSounds();
    return;
  }
  
  if (sounds[soundName]) {
    const sound = sounds[soundName].cloneNode();
    sound.volume = 0.7;
    sound.play().catch(error => console.error('Error:', error));
  }
}

const soundToggle = document.getElementById('sound-toggle');
const soundIcon = document.getElementById('sound-icon');

if (soundToggle) {
  soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    
    if (soundEnabled) {
      soundIcon.textContent = '🔊';
      if (!soundsLoaded) loadSounds();
      setTimeout(() => playSound('click'), 100);
    } else {
      soundIcon.textContent = '🔇';
    }
    
    localStorage.setItem('soundEnabled', soundEnabled);
  });
  
  const savedPreference = localStorage.getItem('soundEnabled');
  if (savedPreference === 'true') {
    soundEnabled = true;
    soundIcon.textContent = '🔊';
    loadSounds();
  } else {
    soundIcon.textContent = '🔇';
  }
}

// ==================== MENÚ MÓVIL ====================
const menuToggle = document.getElementById('menu-toggle');
const menuList = document.getElementById('menu-list');

if (menuToggle && menuList) {
  menuToggle.addEventListener('click', function() {
    menuList.classList.toggle('active');
    const isExpanded = menuList.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    menuToggle.textContent = isExpanded ? '✕ Cerrar' : '☰ Menú';
    playSound('click');
  });
}

// ==================== BOTONES CON SONIDO ====================
document.querySelectorAll('button, .btn, a').forEach(element => {
  if (window.matchMedia('(hover: hover)').matches) {
    element.addEventListener('mouseenter', () => playSound('hover'));
  }
  element.addEventListener('click', () => playSound('click'));
});

// ==================== FORMULARIO DE CONTACTO (CON FETCH) ====================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formAction = contactForm.getAttribute('action');
    
    // Agregar _next manualmente
    formData.append('_next', 'https://lrjeffers.github.io/gracias.html');
    
    try {
      const response = await fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        playSound('submit');
        // Esperar 500ms y redirigir
        setTimeout(() => {
          window.location.href = 'https://lrjeffers.github.io/gracias.html';
        }, 500);
      } else {
        alert('Hubo un error al enviar. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar. Por favor, intenta de nuevo.');
    }
  });
}

// ==================== BÚSQUEDA ====================
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const obras = document.querySelectorAll('.obra-card');

if (searchInput && searchResults) {
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    searchResults.innerHTML = '';
    
    if (term.length < 2) return;
    
    const matches = Array.from(obras).filter(obra => {
      const title = obra.querySelector('h3')?.textContent.toLowerCase() || '';
      const tagline = obra.querySelector('.obra-tagline')?.textContent.toLowerCase() || '';
      const allText = obra.textContent.toLowerCase() || '';
      const tags = obra.dataset.tags || '';
      return title.includes(term) || tagline.includes(term) || allText.includes(term) || tags.includes(term);
    });
    
    if (matches.length === 0) {
      searchResults.textContent = 'No se encontraron resultados.';
      return;
    }
    
    matches.forEach(obra => {
      const clone = obra.cloneNode(true);
      searchResults.appendChild(clone);
    });
  });
}