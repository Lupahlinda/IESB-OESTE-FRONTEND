// Capturar o botão de toggle do DOM
const themeToggle = document.getElementById('theme-toggle');

// Função para alternar entre Dark Mode e Light Mode
function toggleTheme() {
  // Alternar a classe dark-mode no body
  document.body.classList.toggle('dark-mode');
  
  // Atualizar o texto do botão
  if (document.body.classList.contains('dark-mode')) {
    themeToggle.textContent = '☀️ Light Mode';
  } else {
    themeToggle.textContent = '🌙 Dark Mode';
  }
}

// Adicionar event listener ao botão
themeToggle.addEventListener('click', toggleTheme);
