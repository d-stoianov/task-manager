import { useNavigate } from "react-router-dom"
import FolderClosed from "/src/assets/images/FolderClosed.svg"
import FolderOpened from "/src/assets/images/FolderOpened.svg"
import UncheckedBox from "/src/assets/images/UncheckedBox.svg"
import CheckedBox from "/src/assets/images/CheckedBox.svg"
import DeleteTask from "/src/assets/images/DeleteTask.svg"
import { useEffect, useState } from "react"
import service from "../api/service"

function Main({ tasks, setTasks }) {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [searchedCategories, setSearchedCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingTask, setEditingTask] = useState(null)
    const [editedTitle, setEditedTitle] = useState("")
    const [editedDescription, setEditedDescription] = useState("")

    function onSearchInputChange(e) {
        const query = e.target.value.toLowerCase()
        if (query) {
            const categoriesByQuery = categories?.filter((category) =>
                category?.name?.toLowerCase()?.startsWith(query)
            )
            setSearchedCategories(categoriesByQuery)
        } else {
            setSearchedCategories([])
        }
    }

    function handleToggleCategory(id) {
        const categoryToToggle = categories.find((category) => {
            return category.id === id
        })

        categoryToToggle.opened = !categoryToToggle.opened

        setCategories([...categories])
    }

    async function handleTaskToggle(id) {
        const taskToToggle = tasks?.find((task) => {
            return task.id === id
        })

        taskToToggle.isChecked = !taskToToggle.isChecked
        await service.updateTaskField(id, "isChecked", taskToToggle.isChecked)

        setTasks([...tasks])
    }

    async function handleTaskDelete(id) {
        const newTasks = tasks?.filter((task) => {
            return task.id !== id
        })

        await service.deleteTask(id)

        setTasks([...newTasks])
    }

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.value)
    }

    async function saveTaskEdit(taskId, field) {
        if (field === "title") {
            await service.updateTaskField(taskId, "title", editedTitle)
        } else {
            await service.updateTaskField(
                taskId,
                "description",
                editedDescription
            )
        }

        const updatedTasks = tasks.map((task) =>
            task.id === taskId
                ? {
                      ...task,
                      [field]:
                          field === "title" ? editedTitle : editedDescription,
                  }
                : task
        )
        setTasks(updatedTasks)
        setEditingTask(null)
    }

    useEffect(() => {
        service.getCategories().then((categories) => {
            setCategories(
                categories.map((category) => ({
                    // open all categories by default
                    ...category,
                    opened: true,
                }))
            )
            setLoading(false)
        })
    }, [])

    return (
        <main className="flex flex-col w-full my-[3rem]">
            <section className="flex w-full items-center justify-center gap-[1rem] md:gap-[2rem]">
                <div className="w-[40%] md:w-auto">
                    <button
                        onClick={() => navigate("/create")}
                        className="w-full md:w-[16rem] h-[2.5rem] px-3 border rounded-2xl bg-black text-white hover:bg-blue-600 transition delay-50 active:bg-blue-700"
                    >
                        Create task
                    </button>
                </div>
                <div className="w-[60%] md:w-auto">
                    <input
                        className="w-full md:w-[30rem] h-[2.5rem] px-3 border rounded-2xl bg-white"
                        type="text"
                        placeholder="Search"
                        onChange={(e) => onSearchInputChange(e)}
                    />
                </div>
            </section>
            <section className="flex flex-wrap w-full h-full gap-4 my-10 justify-center md:justify-start">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    (searchedCategories.length > 0
                        ? searchedCategories
                        : categories
                    ).map((category, idx) => (
                        <div
                            className="flex flex-col w-[14rem] h-auto "
                            key={idx}
                        >
                            <button
                                onClick={() =>
                                    handleToggleCategory(category.id)
                                }
                                className="relative px-3 border rounded-2xl text-black text-[1.5rem] font-bold shadow-md"
                                style={{
                                    backgroundColor: category.color,
                                }}
                            >
                                <span className="absolute -right-2 -top-2  rounded-[50%] border bg-gray-200 w-7 h-7 flex items-center justify-center">
                                    <img
                                        className="w-6 h-6"
                                        src={
                                            category.opened
                                                ? FolderOpened
                                                : FolderClosed
                                        }
                                    />
                                </span>
                                {category.name}
                            </button>
                            {category.opened && (
                                <div className="my-2 flex flex-col gap-4">
                                    {tasks?.map((task, idx) => {
                                        if (
                                            task?.category?.name ==
                                            category?.name
                                        )
                                            return (
                                                <div
                                                    key={idx}
                                                    className="w-full border-2 rounded-md p-2 border-blue-300"
                                                >
                                                    <div className="text-center relative">
                                                        <h1 className="text-[1rem] text-center font-bold">
                                                            {task?.title}
                                                        </h1>
                                                        <img
                                                            className="w-10 h-10 absolute -top-2 -left-2 cursor-pointer"
                                                            src={
                                                                task.isChecked
                                                                    ? CheckedBox
                                                                    : UncheckedBox
                                                            }
                                                            alt="checkbox"
                                                            onClick={() =>
                                                                handleTaskToggle(
                                                                    task.id
                                                                )
                                                            }
                                                        />
                                                        <img
                                                            className="w-6 absolute top-0 right-0 cursor-pointer"
                                                            onClick={() =>
                                                                handleTaskDelete(
                                                                    task.id
                                                                )
                                                            }
                                                            src={DeleteTask}
                                                            alt="deletetask"
                                                        />
                                                    </div>
                                                    <p className="text-slate-600 break-words text-left">
                                                        {task?.description}
                                                    </p>
                                                </div>
                                            )
                                    })}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </section>
        </main>
    )
}

export default Main
