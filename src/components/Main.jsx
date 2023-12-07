import { useNavigate } from "react-router-dom"
import FolderClosed from "/src/assets/images/FolderClosed.svg"
import FolderOpened from "/src/assets/images/FolderOpened.svg"
import { useEffect, useState } from "react"
import service from "../api/service"

function Main() {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])
    const [categories, setCategories] = useState([])
    const [searchedCategories, setSearchedCategories] = useState([])
    const [loading, setLoading] = useState(true)

    function handleToggleCategory(id) {
        const categoryToToggle = categories.find((category) => {
            return category.id === id
        })

        categoryToToggle.opened = !categoryToToggle.opened

        setCategories([...categories])
    }
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

    useEffect(() => {
        const tasksPromise = service.getTasks().then((tasks) => setTasks(tasks))
        const categoriesPromise = service.getCategories().then((categories) =>
            setCategories(
                categories.map((category) => ({ // open all categories by default
                    ...category,
                    opened: true,
                }))
            )
        )

        Promise.all([tasksPromise, categoriesPromise])
            .then(() => setLoading(false))
            .catch((error) => {
                console.error("Error:", error)
            })
    }, [])

    return (
        <main className="flex flex-col w-full my-[3rem]">
            <section className="flex w-full items-center justify-center gap-[1rem] md:gap-[2rem]">
                <div className="w-[40%] md:w-auto">
                    <button
                        onClick={() => navigate("/create")}
                        className="w-full md:w-[16rem] h-[2.5rem] px-3 border rounded-2xl bg-black text-white"
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
                                    {tasks.map((task, idx) => {
                                        if (
                                            task?.category?.name ==
                                            category?.name
                                        )
                                            return (
                                                <button
                                                    key={idx}
                                                    className="w-full border-2 rounded-md p-2 border-blue-300"
                                                >
                                                    <h1 className="text-[1rem] text-center font-bold">
                                                        {task?.title}
                                                    </h1>
                                                    <p className="text-slate-600 break-words text-left">
                                                        {task?.description}
                                                    </p>
                                                </button>
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
