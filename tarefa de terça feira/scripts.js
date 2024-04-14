const button = document.querySelector('.button-add-task'); // Seleciona o botão de adicionar tarefa
const input = document.querySelector('.input-task'); // Seleciona o campo de entrada de texto
const listaCompleta = document.querySelector('.list-tasks'); // Seleciona a lista de tarefas

let minhaListaDeItens = []; // Inicializa uma array para armazenar as tarefas

// Função para adicionar uma nova tarefa à lista
function adicionarNovaTarefa() {
  minhaListaDeItens.push({
    tarefa: input.value, // Adiciona o valor do campo de entrada como uma nova tarefa
    concluida: false, // Define a nova tarefa como não concluída
    visivel: true // Adicionamos a propriedade visivel para controlar a visibilidade do item
  });

  input.value = ''; // Limpa o campo de entrada de texto após adicionar a tarefa

  mostrarTarefas(); // Chama a função para exibir as tarefas atualizadas
}

// Função para exibir as tarefas na lista
function mostrarTarefas() {
  let novaLi = ''; // Inicializa uma string para armazenar o HTML das novas tarefas

  // Itera sobre cada item na lista de tarefas
  minhaListaDeItens.forEach((item, posicao) => {
    if (item.visivel) { // Verifica se o item está visível
      // Cria o HTML para exibir a tarefa, incluindo ícones para concluir, editar, deletar e ocultar a tarefa
      novaLi +=
        `
          <li class="task ${item.concluida && 'done'}">
              <i class="bi bi-check" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})"></i>
              <p>${item.tarefa}</p>
              <i class="bi bi-pencil" alt="editar-tarefa" onclick="editarItem(${posicao})"></i>
              <i class="bi bi-trash" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})"></i>
              <i class="bi bi-eye-slash" alt="ocultar-tarefa" onclick="ocultarItem(${posicao})"></i> <!-- Adicionado o ícone para ocultar o item -->
          </li>
        `;
    }
  });

  listaCompleta.innerHTML = novaLi; // Atualiza o HTML da lista de tarefas

  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens)); // Salva a lista no armazenamento local do navegador
}

// Função para marcar uma tarefa como concluída ou não concluída
function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida; // Inverte o estado de conclusão da tarefa

  mostrarTarefas(); // Chama a função para exibir as tarefas atualizadas
}

// Função para excluir uma tarefa da lista
function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1); // Remove a tarefa da lista

  mostrarTarefas(); // Chama a função para exibir as tarefas atualizadas
}

// Função para editar o nome de uma tarefa
function editarItem(posicao) {
  const novoItem = prompt("Digite o novo valor para a tarefa:"); // Pede ao usuário um novo nome para a tarefa

  if (novoItem !== null) {
    minhaListaDeItens[posicao].tarefa = novoItem; // Atualiza o nome da tarefa
    mostrarTarefas(); // Chama a função para exibir as tarefas atualizadas
  }
}

// Função para ocultar uma tarefa da lista
function ocultarItem(posicao) {
  minhaListaDeItens[posicao].visivel = false; // Define a propriedade 'visivel' como false para ocultar a tarefa

  mostrarTarefas(); // Chama a função para exibir as tarefas atualizadas
}

// Função para desocultar todas as tarefas previamente ocultadas
function desocultarItem() {
  const tarefasDoLocalStorage = localStorage.getItem('lista'); // Obtém a lista armazenada no armazenamento local
  minhaListaDeItens = JSON.parse(tarefasDoLocalStorage); // Converte a lista de volta para um objeto JavaScript

  // Itera sobre todas as tarefas na lista e define a propriedade 'visivel' como true para todas elas
  for(i = 0; i < minhaListaDeItens.length; i++){
    minhaListaDeItens[i].visivel = true;
  }

  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens)); // Salva a lista atualizada no armazenamento local
  mostrarTarefas(); // Chama a função para exibir as tarefas atualizadas
}

// Função para recarregar as tarefas do armazenamento local ao carregar a página
function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista'); // Obtém a lista armazenada no armazenamento local

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage); // Converte a lista de volta para um objeto JavaScript, se existir
  }

  mostrarTarefas(); // Exibe as tarefas na lista ao recarregar a página
}

recarregarTarefas(); // Chama a função para recarregar as tarefas ao carregar a página
button.addEventListener('click', adicionarNovaTarefa); // Adiciona um ouvinte de evento para o botão de adicionar tarefa
