import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { CiEdit, CiTrash } from "react-icons/ci";

interface TaskProps{
  id: string;
  name: string;
  completed: boolean;
}

function App() {
  // Estado para armazenar as tarefas
  const [tasks, setTasks] = useState<TaskProps[]>([])

  // Estado para armazenar o valor do input
  const [inputTask, setInputTask] = useState('')

  // Estado para ativar/desativar modo de edicao
  const [editingTask, setEditingTask] = useState<TaskProps|null>(null)

  // Referencia para o input de tarefa
  const inputTextRef = useRef<HTMLInputElement>(null)

  // Funcao para lidar com o envio do formulario de tarefas
  function submitTasks(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    const taskName = inputTask.trim()

    // O input esta vazio?
    if(!taskName){
      toast.error('Insira o nome da sua tarefa!')
      inputTextRef.current?.classList.add('border-red-500')
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
  }

  //Deleta a tarefa
  function deleteTask(id: string){
    const taskList = tasks.filter((item) => item.id !== id)
    setTasks(taskList)
  }

  //Funcao para alterar o status da tarefa: Pendente | Concluido
  function handleStatus(task: TaskProps){
    
    const taskList = tasks.map( item => {      
      if(item.id == task.id){
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


  return (
    <main className="container">
      <article>

        <header className="mb-5">
          <h1 className="text-center my-8">Lista de tarefas</h1>

          <form onSubmit={submitTasks} className="flex flex-col md:flex-row items-center justify-between gap-3 mb-5">

            <div className="relative w-full">
              <input type="text" name="task-name" placeholder="Adicionar tarefa ..." className="h-12"
              value={inputTask}
              onChange={ e => setInputTask(e.target.value)}
              ref={inputTextRef}
              onFocus={() => inputTextRef.current?.classList.remove('border-red-500')}
              />
              {editingTask && (
                <button type="button" className="absolute top-3 right-3 btn-cancel" onClick={handleReset}>X</button>
              )}
            </div>

            <input type="submit" value={editingTask ? ('Editar Tarefa') : ('Nova Tarefa')} className="btn w-full md:w-auto h-12" />
          </form>

        </header>

        <div className="card flex flex-col md:flex-row md:items-center md:justify-center gap-3 mb-1">
          <p>Filtrar Por:</p>
          <button className="btn border-red-300 text-red-500 hover:bg-red-500/20">Pendentes</button>
          <button className="btn border-green-300 text-green-500 hover:bg-green-500/20">Concluídas</button>
          <button className="btn">Todas</button>
        </div>

        <div className="card">
          <ul className="task-list">

            {tasks.length > 0 ? tasks.map((task) => (
              <li key={task.id} className="task-list__item">
                <label className="flex items-start md:items-center gap-2">
                  <input type="checkbox" 
                  checked={task.completed} 
                  onChange={() => handleStatus(task)}
                  /> 
                  <span className={task.completed ? 'line-through italic text-zinc-400' : undefined}>{task.name}</span>
                </label>

                <div className="task-list__actions">
                  <button className="btn p-2" onClick={() => handleButton(task)}>
                    <CiEdit size={26} color="blue" />
                  </button>
                  <button className="btn p-2" onClick={() => deleteTask(task.id)}>
                    <CiTrash size={26} color="red" />
                  </button>
                </div>
              </li>
            )) : (
              <li className="task-list__item justify-center">
                <p className="italic">Nenhuma tarefa foi criada ainda.</p>
              </li>
            )}

          </ul>
          
        </div>

      </article>
    </main>
  )
}

export default App
