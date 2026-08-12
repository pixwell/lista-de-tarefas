import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CiEdit, CiTrash } from "react-icons/ci";

interface TaskProps{
  id: string;
  name: string;
  completed: boolean;
}

const localStorageKey = 'LT_tasks'

function App() {
  // Estado para armazenar as tarefas
  const [tasks, setTasks] = useState<TaskProps[]>(() => {
    //Funcao inicializadora
    const storage = localStorage.getItem(localStorageKey)
    if (storage){
      return JSON.parse(storage)
    } else {
      return []
    }
  })

  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'completed'>('all')

  // Estado para armazenar o valor do input
  const [inputTask, setInputTask] = useState('')

  // Estado para ativar/desativar modo de edicao
  const [editingTask, setEditingTask] = useState<TaskProps|null>(null)

  // Estado para controlar a resposta visual e de acessibilidade
  const [inputError, setInputError] = useState(false)

  // Referencia para o input de tarefa
  const inputTextRef = useRef<HTMLInputElement>(null)

  //Persiste os dados no localStorage
  useEffect(() => {
    const jsonData = JSON.stringify(tasks)    
    localStorage.setItem(localStorageKey, jsonData)
  },[tasks])

  //Sincroniza o foco do DOM, para acessibilidade do campo editar tarefa
  useEffect(() => {
    if(editingTask){
      inputTextRef.current?.focus()
    }
  }, [editingTask])

  // Funcao para lidar com o envio do formulario de tarefas
  function submitTasks(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    const taskName = inputTask.trim()

    // O input esta vazio?
    if(!taskName){
      toast.error('Insira o nome da sua tarefa!')
      setInputError(true)
    } 
    // O modo de edicao esta ativo?
    else if(editingTask !== null){
      // Edita a tarefa
      editTask(editingTask)
    } else {
      // Cria a tarefa
      createTask(taskName)
    }

  }

  // Cria a tarefa
  function createTask(taskName: string){
    const newTask = {
      id: crypto.randomUUID(),
      name: taskName,
      completed: false,
    }

    // Adiciona a nova tarefa ao estado de tarefas      
    setTasks( prevTasks => [...prevTasks, newTask])
    // Limpa o input apos adicionar a tarefa
    setInputTask('')
    // Coloca o foco no campo
    inputTextRef.current?.focus()
    toast.success('Tarefa adicionada com sucesso!')
  }

  // Edita a tarefa
  function editTask(task: TaskProps){
    const taskList = tasks.map(item => {
      if(item.id === task.id){
        return {...item, name: inputTask}
      } else {
        return item
      }
    })
    
    setTasks(taskList)
    handleReset()
    toast.success('Tarefa editada com sucesso!')
  }

  //Deleta a tarefa
  function deleteTask(id: string){
    const taskList = tasks.filter((item) => item.id !== id)
    setTasks(taskList)
    toast.success('Tarefa excluída')
  }

  //Filtra as tarefas
  function getFilteredTasks(){
    if(taskFilter === 'all'){
      return tasks
    } else {
      return tasks.filter( item => item.completed === (taskFilter === 'completed'))
    }
  }

  //Funcao para alterar o status da tarefa: Pendente | Concluido
  function handleStatus(task: TaskProps){
    
    const taskList = tasks.map( item => {      
      if(item.id === task.id){
        return { ...item, completed: !item.completed }
      } else {
        return item
      }
    })

    setTasks(taskList)    
  }

  // Gerencia a acao do botao para edicao
  function handleButton(task: TaskProps){
    // Ativa o modo de edicao e altera a interface
    setEditingTask(task)
    // Preenche o campo com o nome da tarefa
    setInputTask(task.name)
  }

  //Reseta os estados do Campo e Edicao
  function handleReset(){
    setInputTask('')
    setEditingTask(null)
  }

  //Para nao ter que chamar a funcao 2 vezes, armazenei ela em uma const
  const tarefasFiltradas = getFilteredTasks()

  return (
    <main className="container">
      <article>

        <header className="mb-5">
          <h1 className="text-center my-8">Lista de tarefas</h1>

          <form onSubmit={submitTasks} className="flex flex-col md:flex-row items-center justify-between gap-3 mb-5">

            <div className="relative w-full">
              <label htmlFor="task-name" className="sr-only">Nome da tarefa</label>

              <input type="text" id="task-name" name="task-name" placeholder="Adicionar tarefa ..." 
              className={`h-12 ${inputError ? 'border-red-500' : ''}`}
              value={inputTask}
              onChange={ e => setInputTask(e.target.value)}
              ref={inputTextRef}
              onFocus={() => setInputError(false)}
              aria-invalid={inputError}
              />
              {editingTask && (
                <button type="button" className="absolute top-3 right-3 btn-cancel" onClick={handleReset} aria-label="Cancelar edição">
                  X
                </button>
              )}
            </div>

            <input type="submit" value={editingTask ? ('Editar Tarefa') : ('Nova Tarefa')} className="btn w-full md:w-auto h-12" />
          </form>

        </header>

        <div className="card flex flex-col md:flex-row md:items-center md:justify-center gap-3 mb-1">
          <p>Filtrar Por:</p>

          <button className="btn border-red-300 text-red-500 hover:bg-red-500/20" onClick={() => setTaskFilter('pending')} aria-pressed={taskFilter === 'pending'}>
            Pendentes
          </button>

          <button className="btn border-green-300 text-green-500 hover:bg-green-500/20" onClick={() => setTaskFilter('completed')} aria-pressed={taskFilter === 'completed'}>
            Concluídas
          </button>

          <button className="btn" onClick={() => setTaskFilter('all')} aria-pressed={taskFilter === 'all'}>
            Todas
          </button>

        </div>

        <div className="card mb-1">
          <ul className="task-list">

            {tarefasFiltradas.length > 0 ? tarefasFiltradas.map((task) => (
              <li key={task.id} className="task-list__item">
                <label className="flex items-start md:items-center gap-2">
                  <input type="checkbox" 
                  checked={task.completed} 
                  onChange={() => handleStatus(task)}
                  /> 
                  <span className={task.completed ? 'line-through italic text-zinc-400' : undefined}>{task.name}</span>
                </label>

                <div className="task-list__actions">
                  <button className="btn p-2" onClick={() => handleButton(task)} aria-label="Editar Tarefa">
                    <CiEdit size={26} color="blue" />
                  </button>
                  <button className="btn p-2" onClick={() => deleteTask(task.id)} aria-label="Excluir Tarefa">
                    <CiTrash size={26} color="red" />
                  </button>
                </div>
              </li>
            )) : (
              <li className="task-list__item justify-center">
                <p className="italic">Nenhuma tarefa encontrada.</p>
              </li>
            )}
          </ul>          
          
        </div>

        <footer className="card mb-10">
          <p className="text-center">Tarefas Pendentes: {tasks.filter( item => !item.completed).length}</p>
        </footer>

      </article>
    </main>
  )
}

export default App
