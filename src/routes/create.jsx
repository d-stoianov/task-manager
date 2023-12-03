import { useNavigate } from "react-router-dom"
import ArrowBack from "../assets/images/ArrowBack.svg"
import TrashBin from "../assets/images/TrashBin.svg"
import { useEffect, useState, useRef } from "react"
import service from "../api/service"

function Create() {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const inputRef = useRef(null)
    const [task, setTask] = useState({})

    function createCategory() {
        const newCategory = {
            id: Math.floor(Math.random() * 10000 + 1),
            name: "",
            color: generateRandomColor(),
            selected: false,
            isEditing: true,
        }

        setCategories([...categories, newCategory])
    }

    function deleteCategory(categoryToDelete) {
        const choice = confirm(
            `Are you sure you want to delete category: ${categoryToDelete.name} ?`
        )
        if (choice) {
            const newCategories = categories.filter(
                (category) => category.id !== categoryToDelete.id
            )
            service.deleteCategory(categoryToDelete)
            setCategories(newCategories)
        }
    }

    async function handleCategoryNameChange(id, name) {
        let categoryToCreate = {}

        setCategories(
            categories.map((category) => {
                if (category.id === id) {
                    categoryToCreate = { ...category, name, isEditing: false }
                    return categoryToCreate
                }
                return category
            })
        )

        const { isEditing, selected, ...clearCategory } = categoryToCreate

        service.addCategory(clearCategory)
    }

    function handleCategoryClick(id) {
        const categoryToSelect = categories.find((category) => {
            return category.id === id
        })

        categories.forEach((category) => (category.selected = false))

        categoryToSelect.selected = true

        const { selected, isEditing, ...clearCategory } = categoryToSelect // exclude selected and isEditing, bc this property is needed only for client

        setTask({ ...task, category: clearCategory })
        setCategories([...categories])
    }

    function generateRandomColor() {
        const color = []
        for (let i = 0; i < 6; i++) {
            const randNum = Math.floor(Math.random() * 6 + 10) // rand num 9 -> 16 (to make mostly light)
            const hex = randNum.toString(16) // convert it to hex
            color.push(hex)
        }

        return "#" + color.join("")
    }

    function onTaskChange(e) {
        const { value, id } = e.target

        switch (id) {
            case "title":
                setTask({ ...task, title: value })
                break
            case "description":
                setTask({ ...task, description: value })
                break
        }
    }

    async function createTask() {
        // some validation

        service.addTask(task)
    }

    useEffect(() => {
        service.getCategories().then((res) => {
            setCategories(res)
        })
    }, [])

    useEffect(() => {
        if (inputRef.current) {
            // focus on new category
            inputRef.current.focus()
        }
    }, [categories])

    return (
        <main className="w-full mx-auto h-full flex flex-col justify-between">
            <section className="flex flex-col">
                <div>
                    <button className="" onClick={() => navigate("/")}>
                        <img className="w-8 h-8" src={ArrowBack} />
                    </button>
                </div>
                <h1 className="my-2 font-bold text-[2rem] md:text-[3rem]">
                    New task
                </h1>
                <section>
                    <h3 className="text-slate-700 text-[1rem] md:text-[1.5rem]">
                        Categories
                    </h3>
                    <div className="py-3 max-w-full md:max-w-[36rem] flex flex-wrap gap-4">
                        <button
                            onClick={() => createCategory()}
                            className="text-center w-8 h-8 md:w-10 md:h-10 border rounded-[50%] bg-white"
                        >
                            +
                        </button>
                        {categories?.map((category, idx) => {
                            if (category.isEditing) {
                                return (
                                    <input
                                        maxLength={12}
                                        key={idx}
                                        ref={inputRef}
                                        className="text-center px-3 w-[6rem] h-8 md:h-10 border rounded-2xl bg-white"
                                        onBlur={() =>
                                            handleCategoryNameChange(
                                                category.id,
                                                inputRef.current.value ||
                                                    "Unnamed"
                                            )
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleCategoryNameChange(
                                                    category.id,
                                                    inputRef.current.value ||
                                                        "Unnamed"
                                                )
                                            }
                                        }}
                                        style={{
                                            backgroundColor: category.color,
                                        }}
                                    />
                                )
                            } else {
                                return (
                                    <div key={idx} className="relative">
                                        <button
                                            onClick={() =>
                                                handleCategoryClick(category.id)
                                            }
                                            className="text-center px-3 min-w-[6rem] h-8 md:h-10 border rounded-2xl bg-white"
                                            style={{
                                                backgroundColor:
                                                    category.selected
                                                        ? "rgba(0, 0, 0, 0.35)"
                                                        : category.color,
                                            }}
                                        >
                                            {category.name}
                                        </button>
                                        <button
                                            onClick={() =>
                                                deleteCategory(category)
                                            }
                                            className="absolute z-[100] -top-2 -right-2"
                                        >
                                            <img
                                                src={TrashBin}
                                                className=" w-6 h-6"
                                            />
                                        </button>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </section>
                <section>
                    <h3 className="text-slate-700 text-[1rem] md:text-[1.5rem]">
                        Title
                    </h3>
                    <div className="py-3 flex flex-col gap-4">
                        <input
                            onChange={(e) => onTaskChange(e)}
                            id="title"
                            placeholder="Some title"
                            className="w-full md:w-[36rem] h-[2.25rem] md:h-[2.75rem] px-3 border rounded-2xl bg-white"
                        ></input>
                        <input
                            onChange={(e) => onTaskChange(e)}
                            id="description"
                            placeholder="Description (optional)"
                            className="w-full md:w-[36rem] h-[2.25rem] md:h-[2.75rem] px-3 border rounded-2xl bg-white"
                        ></input>
                    </div>
                </section>
            </section>
            <div className="w-full flex justify-center">
                <button
                    onClick={createTask}
                    className="w-full my-2 md:w-[36rem] h-[3rem] px-3 border rounded-2xl bg-black text-white"
                >
                    Create
                </button>
            </div>
        </main>
    )
}

export default Create
