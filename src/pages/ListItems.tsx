import { useState } from "react";
import "./ListItems.css";
import { Trash } from "phosphor-react";
import { MdEdit } from "react-icons/md";

interface PropsTasks {
    text: string;
    timeH: string;
    isComplete: boolean;
    
    
  }
  
  interface Props {
    tasks: PropsTasks[];
    editTaskt: (id: number)=>void;
    dell: (id: number) => void;
    onToggle: (id: number) => void;
  }
  
  export default function ListItems({ tasks, dell, onToggle, editTaskt }: Props) {
    const [controll, setControll] = useState<boolean>(true);

    return (
      <div className="mt-10 md:w-120 w-89">
        {tasks.map((task, index) => (
          <div key={index} className={`flex shadow-lg justify-between items-center border hover:bg-gray-200 transform hover:scale-105 duration-300 border-gray-200 cursor-pointer  mt-2 ${controll ? "funning" : ""}`}>
            <div className="md:flex">
              <p
                style={{
                  textDecoration: task.isComplete ? "line-through" : "none",
                  marginLeft: "15px"
                }}
                className=""
              >
                {task.text}
                
              </p>
              <div className=" ml-20 hidden items-center justify-center md:flex">
                  <span className="">{task.timeH}</span>
              </div>
            </div>

            <div className="flex gap-2 items-center bg-gray-200 pr-10 ml-20 ">
                <button className="flex items-center p-3 justify-center" onClick={() => onToggle(index)}>{task.isComplete? "❌" : "✔"}</button>
                <button  onClick={()=>editTaskt(index)}><MdEdit size={20} color="blue"/></button>
                <button className={"transform scale-100 hover:scale-110 transition"} onClick={() => {dell(index); setControll(!controll);}}><Trash size={25} color="red"/></button>
            </div>
          </div>
        ))}
      </div>
    );
  }