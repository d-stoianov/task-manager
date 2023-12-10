import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import Main from "../components/Main"
import service from "../api/service"

function Root() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const fetchTasks = async () => {
            const fetchedTasks = await service.getTasks()
            setTasks(fetchedTasks)
        }

        fetchTasks().catch(console.error)
    }, [])

    return (
        <>
            <Header tasks={tasks} />
            <Main tasks={tasks} setTasks={setTasks} />
        </>
    )
}

export default Root
