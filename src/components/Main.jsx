import { useNavigate } from "react-router-dom"

function Main() {
    const navigate = useNavigate()

    return (
        <main className="flex w-full my-[3rem]">
            <div className="flex w-full items-center justify-center gap-[1rem] md:gap-[2rem]">
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
            </div>
        </main>
    )
}

export default Main
