// Exemplo de React - Dark Mode / Light Mode
// Usando hooks: useState e useEffect

const { useState, useEffect } = React;

// Componente principal App
function App() {
  // Estado para controlar o tema (dark mode ou light mode)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // useEffect para aplicar a classe dark-mode ao body quando o estado muda
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Função para alternar o tema
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="app">
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
      >
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <div className="content">
        <h1>Exemplo de Dark Mode / Light Mode com React</h1>
        <p>Este é um exemplo de como alternar entre temas claro e escuro usando React Hooks (useState e useEffect).</p>
        
        <div className="card">
          <h2>Card de Exemplo</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        <div className="card">
          <h2>Outro Card</h2>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        <div className="card">
          <h2>Conceitos React Utilizados</h2>
          <p>
            <strong>useState:</strong> Gerencia o estado do tema (dark/light mode).<br/>
            <strong>useEffect:</strong> Aplica a classe CSS ao body quando o estado muda.<br/>
            <strong>JSX:</strong> Sintaxe para definir a interface do componente.
          </p>
        </div>
      </div>
    </div>
  );
}

// Renderizar o componente App no DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
