import { CiEdit, CiTrash } from "react-icons/ci";

function App() {

  return (
    <main className="container">
      <article>

        <header className="mb-5">
          <h1 className="text-center my-8">Lista de tarefas</h1>

          <form className="flex flex-col md:flex-row items-center justify-between gap-3 mb-5">
            <input type="text" placeholder="Adicionar tarefa ..." className="h-12" /> 
            <input type="submit" value="Nova Tarefa" className="btn w-full md:w-auto h-12"/>
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
            
            <li className="task-list__item">
              <label className="flex items-start md:items-center gap-2">
                <input type="checkbox" /> 
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </label>

              <div className="task-list__actions">
                <button className="btn p-2">
                  <CiEdit size={26} color="blue" />
                </button>
                <button className="btn p-2">
                  <CiTrash size={26} color="red" />
                </button>
              </div>

            </li>

            <li className="task-list__item">
              <label className="flex items-start md:items-center gap-2">
                <input type="checkbox" /> 
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </label>

              <div className="task-list__actions">
                <button className="btn p-2">
                  <CiEdit size={26} color="blue" />
                </button>
                <button className="btn p-2">
                  <CiTrash size={26} color="red" />
                </button>
              </div>

            </li>

            <li className="task-list__item">
              <label className="flex items-start md:items-center gap-2">
                <input type="checkbox" /> 
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </label>

              <div className="task-list__actions">
                <button className="btn p-2">
                  <CiEdit size={26} color="blue" />
                </button>
                <button className="btn p-2">
                  <CiTrash size={26} color="red" />
                </button>
              </div>

            </li>

          </ul>
          
        </div>

      </article>
    </main>
  )
}

export default App
