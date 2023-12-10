import { auth } from "../config/firebase"
import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import ProfilePicture from "../assets/images/ProfilePicture.jpg"

async function logout() {
    try {
        await signOut(auth)
    } catch (error) {
        console.error(error)
    }
}

function Header({ tasks }) {
    const [isMenuOpened, setIsMenuOpened] = useState(false)

    return (
        <header className="flex w-full items-center justify-between">
            <div className="flex flex-col justify-center">
                <h3 className="md:text-[1.5rem]">
                    Hello,{" "}
                    {auth?.currentUser?.displayName || auth?.currentUser?.email}
                </h3>
                <h1 className="md:text-[2.25rem] font-bold">
                    Your tasks ({tasks.length})
                </h1>
            </div>
            <div className="flex flex-col items-center w-[4.25rem] md:w-[10rem] gap-2 relative">
                <button onClick={() => setIsMenuOpened(!isMenuOpened)}>
                    <img
                        className="rounded-[50%] w-[3rem] md:w-[4rem]"
                        src={auth?.currentUser?.photoURL || ProfilePicture}
                        alt="img"
                    />
                </button>

                <div className="absolute -bottom-7 md:-bottom-10 text-xs md:text-lg flex items-center">
                    {isMenuOpened && (
                        <button
                            className="rounded-lg border hover:bg-slate-200 px-2"
                            onClick={logout}
                        >
                            Sign out
                        </button>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
