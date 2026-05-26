/* ==================== MENÚ MÓVIL ==================== */
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menuList = document.getElementById('menu-list');

  if (menuToggle && menuList) {
    // Abrir/Cerrar menú
    menuToggle.addEventListener('click', () => {
      menuList.classList.toggle('active');
      const isActive = menuList.classList.contains('active');
      menuToggle.textContent = isActive ? '✕ Cerrar' : '☰ Menú';
      menuToggle.setAttribute('aria-expanded', isActive);
    });

    // Cerrar menú al hacer clic en un enlace
    menuList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuList.classList.remove('active');
        menuToggle.textContent = '☰ Menú';
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});
/* ==================== BOTONES DE COMPARTIR DINÁMICOS ==================== */
document.addEventListener('DOMContentLoaded', () => {
  const shareContainer = document.getElementById('share-buttons-container');
  
  if (shareContainer) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    
    fetch('share-buttons.html')
      .then(response => response.text())
      .then(html => {
        // Reemplazar placeholders con URL y título reales
        const processed = html
          .replace(/{URL}/g, url)
          .replace(/{TITLE}/g, title);
        shareContainer.innerHTML = processed;
      });
  }
});