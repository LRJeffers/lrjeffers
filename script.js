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