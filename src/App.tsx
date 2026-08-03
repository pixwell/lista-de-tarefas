
function App() {

  return (
    <div className="container">
      <h1 className="text-center my-8">Lista de tarefas</h1>

      <div className="md:flex md:align-items md:justify-center gap-3 rounded-lg bg-white border border-zinc-200 p-4">
        <button className="btn border-zinc-400 text-zinc-500 hover:bg-zinc-500/20">Todas</button>
        <button className="btn border-red-300 text-red-500 hover:bg-red-500/20">Pendentes</button>
        <button className="btn border-green-300 text-green-500 hover:bg-green-500/20">Concluídas</button>
      </div>

    </div>
  )
}

export default App
