import { useNavigate } from "react-router-dom"
import FolderClosed from "/src/assets/images/FolderClosed.svg"
import FolderOpened from "/src/assets/images/FolderOpened.svg"
import { useEffect, useState } from "react"

function Main() {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])

    function handleToggleCategory(id) {
        const categoryToToggle = categories.find((category) => {
            return category.id === id
        })

        categoryToToggle.opened = !categoryToToggle.opened

        setCategories([...categories])
    }

    useEffect(() => {
        // fetch categories
        setCategories([
            {
                id: 1,
                name: "Movies вфыasds",
                color: "#e2a22d",
                opened: true,
                tasks: [
                    {
                        title: "Watch breaking bad",
                        description: "Tonight watch 1 season of breaking bad",
                    },
                    {
                        title: "Watch breaking bad",
                        description: "Tonight watch 1 season of breaking bad",
                    },
                    {
                        title: "Watch breaking bad",
                        description: "Tonight watch 1 season of breaking bad",
                    },
                ],
            },
            {
                id: 2,
                name: "Work",
                color: "#e2a2fd",
                opened: true,
                tasks: [
                    {
                        title: "Finish invoice",
                        description:
                            "Tomorrow finish doing the invoice you started doing today",
                    },
                ],
            },
        ])
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
                    />
                </div>
            </section>
            <section className="flex flex-wrap w-full h-full gap-4 my-10">
                {categories.map((category, idx) => (
                    <div className="flex flex-col w-[14rem] h-auto" key={idx}>
                        <button
                            onClick={() => handleToggleCategory(category.id)}
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
                                {category?.tasks.map((task, idx) => (
                                    <button
                                        key={idx}
                                        className="w-full border-2 rounded-md p-2 border-blue-300"
                                    >
                                        <h1 className="text-[1rem] text-center font-bold">
                                            {task?.title}
                                        </h1>
                                        <p className="text-slate-600  text-left">
                                            {task?.description}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </section>
        </main>
    )
}

export default Main
