import { useEffect, useState } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Title from "./components/Title";

function App() {
  const [tasks, setTesks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  )

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))

  }, [tasks])

  /* useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      const data = await response.json()
      
      setTesks(data)
    }
    fetchTasks();
  }, [])
 */
  function onTaskClick(taskId) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted }
      }
      return task
    })
    setTesks(newTasks)
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter(task => {
      return task.id !== taskId
    }
    )
    setTesks(newTasks)
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      isCompleted: false
    }
    setTesks([...tasks, newTask])
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick} />
      </div>
    </div>
  );
}

export default App;