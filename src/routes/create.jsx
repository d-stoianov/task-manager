import { useNavigate } from "react-router-dom"
import ArrowBack from "../assets/images/arrowBack.svg"

function Create() {
    const navigate = useNavigate()

    function createCategory() {
        console.log("create category")
    }

    function createTask() {
        console.log("create task")
    }

    return (
        <main className="w-full h-full flex flex-col items-center justify-between">
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
                    <div className="py-3 flex gap-2">
                        <button
                            onClick={createCategory}
                            className="text-center w-8 h-8 md:w-10 md:h-10 border rounded-[50%] bg-white"
                        >
                            +
                        </button>
                    </div>
                </section>
                <section>
                    <h3 className="text-slate-700 text-[1rem] md:text-[1.5rem]">
                        Title
                    </h3>
                    <div className="py-3 flex flex-col gap-4">
                        <input
                            placeholder="Some title"
                            className="w-full md:w-[32rem] h-[2.25rem] md:h-[2.75rem] px-3 border rounded-2xl bg-white"
                        ></input>
                        <input
                            placeholder="Description (optional)"
                            className="w-full md:w-[32rem] h-[2.25rem] md:h-[2.75rem] px-3 border rounded-2xl bg-white"
                        ></input>
                    </div>
                </section>
            </section>
            <section className="my-2">
                <button
                    onClick={createTask}
                    className="w-full md:w-[32rem] h-[3rem] px-3 border rounded-2xl bg-black text-white"
                >
                    Create
                </button>
            </section>
        </main>
    )
}

export default Create
