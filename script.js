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
/* ==================== ACORDEÓN "LEER MÁS" - FORZADO ==================== */
@media (max-width: 1024px) {
  /* FORZAR colapso en móvil */
  .synopsis.collapsible {
    max-height: 200px !important;
    overflow: hidden !important;
    position: relative !important;
  }
  
  .excerpt-box.collapsible {
    max-height: 300px !important;
    overflow: hidden !important;
    position: relative !important;
  }
  
  .character-bio.collapsible {
    max-height: 250px !important;
    overflow: hidden !important;
    position: relative !important;
  }
  
  /* Cuando está expandido */
  .synopsis.collapsible.expanded,
  .excerpt-box.collapsible.expanded,
  .character-bio.collapsible.expanded {
    max-height: 5000px !important;
  }
  
  /* Botón */
  .btn-expand {
    display: block !important;
    width: 100%;
    padding: 0.8rem;
    background: #1a1a1a;
    border: 1px solid #333;
    color: #8a2a2f;
    font-family: 'Oswald', sans-serif;
    font-weight: 600;
    cursor: pointer;
    text-align: center;
    margin-top: 1rem;
    border-radius: 4px;
  }
  
  .btn-expand:hover {
    background: #6b1c23;
    color: #fff;
  }
}

/* Desktop: ocultar botón */
@media (min-width: 1025px) {
  .btn-expand {
    display: none !important;
  }
}