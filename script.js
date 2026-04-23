// ==================== SISTEMA DE SONIDOS ====================
let soundEnabled = false;
let sounds = {};
let soundsLoaded = false;

// Cargar sonidos al iniciar
function loadSounds() {
  console.log('🔊 Cargando sonidos...');
  
  try {
    sounds = {
      click: new Audio('assets/sounds/click.mp3'),
      hover: new Audio('assets/sounds/hover.mp3'),
      submit: new Audio('assets/sounds/submit.mp3')
    };
    
    // Configurar eventos de carga
    Object.keys(sounds).forEach(key => {
      sounds[key].addEventListener('canplaythrough', () => {
        console.log(`✅ Sonido "${key}" cargado correctamente`);
      });
      
      sounds[key].addEventListener('error', (e) => {
        console.error(`❌ Error cargando "${key}":`, e);
      });
    });
    
    // VOLUMEN MÁS ALTO (70%)
    Object.values(sounds).forEach(sound => {
      sound.volume = 0.7; // 70% de volumen (mucho más audible)
    });
    
    soundsLoaded = true;
    console.log('🎵 Todos los sonidos inicializados');
  } catch (error) {
    console.error('Error al cargar sonidos:', error);
  }
}

// Función para reproducir sonido
function playSound(soundName) {
  if (!soundEnabled) {
    console.log(`🔇 Sonido "${soundName}" desactivado`);
    return;
  }
  
  if (!soundsLoaded) {
    console.log('⚠️ Sonidos no cargados aún');
    loadSounds();
    return;
  }
  
  if (sounds[soundName]) {
    console.log(`🎵 Reproduciendo: ${soundName}`);
    
    // Clonar el audio para poder reproducirlo múltiples veces
    const sound = sounds[soundName].cloneNode();
    sound.volume = 0.7;
    
    sound.play().then(() => {
      console.log(`✅ "${soundName}" reproducido`);
    }).catch(error => {
      console.error(`❌ Error reproduciendo "${soundName}":`, error);
    });
  } else {
    console.warn(`⚠️ Sonido "${soundName}" no existe`);
  }
}

// Botón de activar/desactivar sonidos
const soundToggle = document.getElementById('sound-toggle');
const soundIcon = document.getElementById('sound-icon');

if (soundToggle) {
  console.log('🔘 Botón de sonido encontrado');
  
  soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    
    if (soundEnabled) {
      console.log('🔊 Sonidos ACTIVADOS');
      soundIcon.textContent = '🔊';
      
      if (!soundsLoaded) {
        loadSounds();
      }
      
      // Probar sonido
      setTimeout(() => playSound('click'), 100);
    } else {
      console.log('🔇 Sonidos DESACTIVADOS');
      soundIcon.textContent = '🔇';
    }
    
    soundToggle.setAttribute('aria-label', soundEnabled ? 'Desactivar sonidos' : 'Activar sonidos');
    
    // Guardar preferencia
    localStorage.setItem('soundEnabled', soundEnabled);
  });
  
  // Cargar preferencia guardada
  const savedPreference = localStorage.getItem('soundEnabled');
  if (savedPreference === 'true') {
    console.log('🔊 Cargando preferencia: sonidos activados');
    soundEnabled = true;
    soundIcon.textContent = '🔊';
    loadSounds();
  } else {
    soundIcon.textContent = '🔇';
    console.log('🔇 Sonidos desactivados por defecto');
  }
} else {
  console.warn('⚠️ Botón de sonido NO encontrado en el HTML');
}

// ==================== MENÚ MÓVIL ====================
const menuToggle = document.getElementById('menu-toggle');
const menuList = document.getElementById('menu-list');

if (menuToggle && menuList) {
  menuToggle.addEventListener('click', function() {
    menuList.classList.toggle('active');
    const isExpanded = menuList.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    if (isExpanded) {
      menuToggle.textContent = '✕ Cerrar';
    } else {
      menuToggle.textContent = '☰ Menú';
    }
    playSound('click');
  });
}

// ==================== BOTONES Y ENLACES CON SONIDO ====================
document.querySelectorAll('button, .btn, a').forEach(element => {
  // Hover sound (solo en desktop)
  if (window.matchMedia('(hover: hover)').matches) {
    element.addEventListener('mouseenter', () => {
      playSound('hover');
    });
  }
  
  // Click sound
  element.addEventListener('click', () => {
    playSound('click');
  });
});

// ==================== FORMULARIO CON SONIDO ====================
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    console.log('📧 Formulario enviado');
    playSound('submit');
  });
}

// ==================== BÚSQUEDA EN TIEMPO REAL ====================
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

// ==================== MENSAJE DE INICIO ====================
console.log(' Sitio de L. R. Jeffers cargado');
console.log('🎵 Sistema de sonidos listo');
console.log('💡 Haz clic en el botón 🔇 (abajo a la derecha) para activar sonidos');
console.log('🔍 Abre la consola (F12) para ver diagnósticos');
// ==================== FORMULARIO DE CONTACTO ====================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    console.log('📧 Formulario de contacto enviado');
    playSound('submit');
  });
// ==================== FORMULARIO DE CONTACTO CON REDIRECCIÓN ====================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevenir envío normal
    
    const formData = new FormData(contactForm);
    const formAction = contactForm.getAttribute('action');
    
    try {
      // Enviar formulario con fetch
      const response = await fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Éxito: redirigir a gracias.html
        playSound('submit');
        window.location.href = 'https://lrjeffers.github.io/gracias.html';
      } else {
        // Error
        alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
    }
  });
}