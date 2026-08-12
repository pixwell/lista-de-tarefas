# Lista de Tarefas

Aplicação web de gerenciamento de tarefas desenvolvida com React, TypeScript e Tailwind CSS. O projeto foi desenvolvido como parte da **Formação em Desenvolvimento Web Fullstack**, com foco na aplicação prática de conceitos de React, gerenciamento de estado, persistência de dados, acessibilidade e organização de código.

**Demo:** [Lista de Tarefas](https://lista-de-tarefas-seven-kohl.vercel.app/)

## Tecnologias

* React
* TypeScript
* Vite
* Tailwind CSS
* React Icons
* `localStorage`

## Funcionalidades

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

## Regras de negócio

* O título da tarefa é obrigatório.
* Não é permitido criar ou salvar uma tarefa vazia.
* Uma tarefa pode ser editada e salva ou ter a edição cancelada.
* Ao cancelar uma edição, o título original é preservado.
* A exclusão de uma tarefa é realizada imediatamente, sem confirmação.
* As tarefas permanecem disponíveis após o recarregamento da página.

## Estados vazios

Quando não houver tarefas para exibir, a aplicação apresenta a mensagem:

> Nenhuma tarefa encontrada.

## Instalação

```bash
git clone https://github.com/pixwell/lista-de-tarefas.git

cd lista-de-tarefas

npm install

npm run dev
```

## Deploy

Projeto publicado na Vercel.

**Demo:** [Lista de Tarefas](https://lista-de-tarefas-seven-kohl.vercel.app/)
