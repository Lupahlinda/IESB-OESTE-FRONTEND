// Array de objetos simulando dados de alunos
const alunos = [
  { nome: 'Ana Silva', nota: 8.5 },
  { nome: 'Bruno Santos', nota: 6.0 },
  { nome: 'Carla Oliveira', nota: 9.2 },
  { nome: 'Daniel Costa', nota: 4.5 },
  { nome: 'Elena Rodrigues', nota: 7.8 },
  { nome: 'Felipe Martins', nota: 5.9 },
  { nome: 'Gabriela Alves', nota: 8.9 },
  { nome: 'Henrique Lima', nota: 3.2 },
  { nome: 'Isabella Pereira', nota: 9.5 },
  { nome: 'João Ferreira', nota: 6.8 },
  { nome: 'Karla Nunes', nota: 7.2 },
  { nome: 'Lucas Mendes', nota: 5.0 }
];

// Função para determinar se o aluno está aprovado (nota >= 6.0)
const isAprovado = (aluno) => aluno.nota >= 6.0;

// Função para gerar o HTML de cada card de aluno usando .map()
const gerarCardAluno = (aluno) => {
  const status = isAprovado(aluno) ? 'Aprovado' : 'Reprovado';
  const statusClass = isAprovado(aluno) ? 'status-approved' : 'status-reproved';
  
  return `
    <div class="student-card">
      <h3 class="student-name">${aluno.nome}</h3>
      <p class="student-grade">Nota: ${aluno.nota.toFixed(1)}</p>
      <span class="student-status ${statusClass}">${status}</span>
    </div>
  `;
};

// Função para renderizar os alunos no DOM
const renderizarAlunos = (listaAlunos) => {
  const container = document.getElementById('students-container');
  
  // Usar .map() para gerar HTML de cada aluno e .join() para concatenar
  const cardsHTML = listaAlunos.map(gerarCardAluno).join('');
  
  // Injetar o HTML no DOM
  container.innerHTML = cardsHTML;
};

// Função para filtrar e renderizar alunos
const filtrarAlunos = (filtro) => {
  let alunosFiltrados;
  
  switch (filtro) {
    case 'approved':
      // Usar .filter() para exibir apenas alunos aprovados
      alunosFiltrados = alunos.filter(isAprovado);
      break;
    case 'reproved':
      // Usar .filter() para exibir apenas alunos reprovados
      alunosFiltrados = alunos.filter(aluno => !isAprovado(aluno));
      break;
    default:
      // Exibir todos os alunos
      alunosFiltrados = alunos;
  }
  
  renderizarAlunos(alunosFiltrados);
};

// Capturar os botões de filtro
const btnShowAll = document.getElementById('show-all');
const btnShowApproved = document.getElementById('show-approved');
const btnShowReproved = document.getElementById('show-reproved');

// Adicionar event listeners aos botões
btnShowAll.addEventListener('click', () => {
  atualizarBotaoAtivo(btnShowAll);
  filtrarAlunos('all');
});

btnShowApproved.addEventListener('click', () => {
  atualizarBotaoAtivo(btnShowApproved);
  filtrarAlunos('approved');
});

btnShowReproved.addEventListener('click', () => {
  atualizarBotaoAtivo(btnShowReproved);
  filtrarAlunos('reproved');
});

// Função para atualizar o botão ativo
const atualizarBotaoAtivo = (botaoAtivo) => {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  botaoAtivo.classList.add('active');
};

// Renderizar todos os alunos ao carregar a página
renderizarAlunos(alunos);
