# Lista de Tarefas

Aplicação web de gerenciamento de tarefas desenvolvida com React e TypeScript, com persistência de dados no navegador.

## 🚀 Tecnologias

* React
* TypeScript
* Vite
* Tailwind CSS
* React Icons
* LocalStorage

## ✨ Funcionalidades

* Criar uma tarefa
* Visualizar a lista de tarefas
* Editar uma tarefa
* Marcar uma tarefa como concluída
* Desmarcar uma tarefa como concluída
* Excluir uma tarefa
* Filtrar tarefas por status:

  * Todas
  * Pendentes
  * Concluídas
* Exibir a quantidade de tarefas pendentes
* Persistir tarefas no `localStorage`

## 📋 Regras de negócio

* O título da tarefa é obrigatório.
* Não é permitido criar ou salvar uma tarefa vazia.
* Uma tarefa pode ser editada e salva ou ter a edição cancelada.
* Ao cancelar uma edição, o título original é preservado.
* A exclusão de uma tarefa é realizada imediatamente, sem confirmação.
* As tarefas permanecem disponíveis após o recarregamento da página.

## 📭 Estados vazios

Quando não houver tarefas para exibir, a aplicação apresenta uma mensagem de acordo com o filtro selecionado:

* **Todas:** Nenhuma tarefa cadastrada.
* **Pendentes:** Nenhuma tarefa pendente.
* **Concluídas:** Nenhuma tarefa concluída.

## 🛠️ Instalação

```bash
git clone <URL_DO_REPOSITORIO>

cd <NOME_DO_PROJETO>

npm install

npm run dev
```

## 🌐 Deploy

O projeto será publicado na Vercel.

**Demo:** Em breve.

## 📌 Status

Em desenvolvimento.
