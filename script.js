/* ==================== SISTEMA DE SONIDOS ==================== */
document.addEventListener('DOMContentLoaded', () => {
  const soundHover = document.getElementById('sound-hover');
  const soundClick = document.getElementById('sound-click');
  const soundPageLoad = document.getElementById('sound-page-load');
  const soundToggle = document.getElementById('sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  
  let soundEnabled = true;
  
  // Reproducir sonido de carga de página
  if (soundPageLoad && soundEnabled) {
    soundPageLoad.volume = 0.3;
    soundPageLoad.play().catch(() => {});
  }
  
  // Toggle de sonido
  soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
    soundToggle.setAttribute('aria-label', soundEnabled ? 'Desactivar sonidos' : 'Activar sonidos');
  });
  
  // Sonidos en enlaces y botones
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (soundEnabled && soundHover) {
        soundHover.currentTime = 0;
        soundHover.volume = 0.4;
        soundHover.play().catch(() => {});
      }
    });
    
    el.addEventListener('click', () => {
      if (soundEnabled && soundClick) {
        soundClick.currentTime = 0;
        soundClick.volume = 0.6;
        soundClick.play().catch(() => {});
      }
    });
  });
});

/* ==================== ACORDEÓN "LEER MÁS" - FUNCIONA SIEMPRE ==================== */
function initCollapsible() {
  const buttons = document.querySelectorAll('.btn-expand');
  
  buttons.forEach(btn => {
    // Remover listeners previos para evitar duplicados
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    // Agregar nuevo listener
    newBtn.addEventListener('click', function() {
      const container = this.closest('.synopsis, .excerpt-box, .character-bio');
      
      if (container) {
        // Alternar clase expanded
        container.classList.toggle('expanded');
        this.classList.toggle('expanded');
        
        // Cambiar texto
        if (container.classList.contains('expanded')) {
          this.textContent = 'Leer menos ▲';
        } else {
          this.textContent = 'Leer más ▼';
          // Scroll suave hacia arriba del contenedor
          setTimeout(() => {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    });
  });
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', initCollapsible);

// Re-inicializar al redimensionar la ventana
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    initCollapsible();
  }, 250);
});