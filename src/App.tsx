import { useEffect, useState } from "react"
import ListItems from "./pages/ListItems";




interface PropsTasks {
  text: string;
  isComplete: boolean;
  timeH: string;
  isOpened: boolean;
}


function App() {
  const [tasks, setTasks] = useState<PropsTasks[]>(() => {
    try {
      const saved = localStorage.getItem("Tasks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [textItens, setTextItems] = useState<string>('');
  const [IsOpened, setOpened] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>('')

 
  
  
  const addTasks = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(textItens.trim() == "") return
    setTasks((prev)=> [...prev, {text: textItens, isComplete: false, timeH: new Date().toLocaleTimeString(), isOpened: false}]);

    setTextItems("");
  }

  
  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }, [tasks]);

  const deleteTasks = (id: number) => {
    setTasks((prev) => prev.filter((_, index) => index != id));
  }

  const onToggle = (id: number) => {
    setTasks(prev =>
      prev.map((item, index) =>
        index === id
          ? { ...item, isComplete: !item.isComplete }
          : item
      )
    );
  };

  const isOpenedTask = (id: number) => {
    const res = tasks.map((_, index)=>index === id);
    console.log(res);
    setOpened(true);
 
  }

  const editText = (id: number) => {
   
    setTasks((prev) => prev.map((task, index)=>index === id ? {...task, text: newTask}: task));
    setOpened(false);
  }

  return (
    <>
      <div className="flex h-screen flex-col items-center bg-white">
        <div className="mt-10 md:mt-40">
          <h1 className="md:text-6xl text-3xl font-extrabold text-gray-700">Lista de Tarefas</h1>
        </div>
        <form onSubmit={addTasks} className="flex md:mt-20 mt-16 rounded-md w-90 md:w-120 items-center shadow-lg border border-gray-200 justify-center p-5 gap-5">
            <input  type="text" className=" border border-gray-300 p-2 w-80   outline-none" 
              onChange={(e)=>setTextItems(e.target.value)}
              value={textItens}
              placeholder="Digite sua tarefa..."
            />
            <button className=" md:flex hidden p-2 rounded-md border border-gray-200 bg-gray-200">Add Task</button>
        </form>
          <ListItems tasks={tasks} dell={deleteTasks} onToggle={onToggle} editTaskt={isOpenedTask} />
          
          {/*Modal*/}

          <div className=" flex h-screen left-0 absolute z-40">
            
            <div>

              {IsOpened ? (
                  <div className="bg-[#24242488] absolute h-screen w-screen p-3 flex items-center justify-center" >
                      <form className="bg-white p-3 rounded-md flex items-center justify-center gap-3">
                          <input type="text"
                            value={newTask}
                            placeholder="Escolha e pressione Enter..."
                            onChange={(e)=>setNewTask(e.target.value)} 
                            className="shadow-lg border p-3 border-gray-200 outline-none w-100"
                          />
                          {tasks.map((item, index)=>(
                            <div key={index}>
                                p{item.text}
                                <button onClick={()=>editText(index)} className="border border-gray-300 p-3 bg-gray-200">Enter</button>
                            </div>
                          ))}
                          
                      </form>
                  </div>
              ) : (
                  ""
              )}
            </div>
        </div>
      </div>
     
    </>
  )
}

export default App
