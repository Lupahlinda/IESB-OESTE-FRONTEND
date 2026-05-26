# Atividade Extra - React Dark Mode / Light Mode

Esta atividade extra demonstra como implementar o tema Dark Mode / Light Mode usando React, baseado no template da Prática 04.

## 🎯 Objetivo

Aplicar conceitos de React Hooks (useState e useEffect) para criar uma interface que alterna entre temas claro e escuro, manipulando o DOM através de estado.

## 🚀 Tecnologias Utilizadas

- **React 18** (via CDN)
- **React DOM 18** (via CDN)
- **Babel** (para transpilar JSX)
- **CSS Variables** (para temas)
- **React Hooks**: useState e useEffect

## 📝 Conceitos React Aplicados

### useState
Gerencia o estado do tema (dark mode ou light mode):
```javascript
const [isDarkMode, setIsDarkMode] = useState(false);
```

### useEffect
Aplica a classe CSS ao body quando o estado muda:
```javascript
useEffect(() => {
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}, [isDarkMode]);
```

### JSX
Sintaxe para definir a interface do componente React.

## 📂 Estrutura de Arquivos

```
atividade-extra/
├── index.html    # HTML com React via CDN
├── style.css     # Estilos com CSS Variables
├── app.js        # Componente React
└── README.md     # Documentação
```

## 🧪 Como Testar

1. Abra o arquivo `index.html` no navegador
2. Clique no botão "🌙 Dark Mode" para alternar para o tema escuro
3. Clique no botão "☀️ Light Mode" para alternar para o tema claro

## 🔗 Relação com Aulas

Esta atividade aplica conceitos das aulas:
- **Aula 04**: Manipulação do DOM (agora via React)
- **Aula 05**: JavaScript ES6 (arrow functions, template literals)
