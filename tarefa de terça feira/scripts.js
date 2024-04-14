const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

let minhaListaDeItens = [];

function adicionarNovaTarefa() {
  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
    visivel: true // Adicionamos a propriedade visivel para controlar a visibilidade do item
  });

  input.value = '';

  mostrarTarefas();
}

function mostrarTarefas() {
  let novaLi = '';

  minhaListaDeItens.forEach((item, posicao) => {
    if (item.visivel) { // Verificar se o item está visível
      novaLi =
        novaLi +
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

  listaCompleta.innerHTML = novaLi;

  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;

  mostrarTarefas();
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);

  mostrarTarefas();
}

function editarItem(posicao) {
  const novoItem = prompt("Digite o novo valor para a tarefa:");

  if (novoItem !== null) {
    minhaListaDeItens[posicao].tarefa = novoItem;
    mostrarTarefas();
  }
}

function ocultarItem(posicao) {
  minhaListaDeItens[posicao].visivel = false; // Definir visivel como falso para ocultar o item
  mostrarTarefas();
}

function desocultarItem() {
  const tarefasDoLocalStorage = localStorage.getItem('lista');
  minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  console.log(minhaListaDeItens.length);
  for(i = 0; i < minhaListaDeItens.length; i++){
    minhaListaDeItens[i].visivel = true; // Definir visivel como falso para ocultar o item
  }
  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
  mostrarTarefas();
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista');

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }

  mostrarTarefas();
}

recarregarTarefas();
button.addEventListener('click', adicionarNovaTarefa);
