import { auth } from "../config/firebase"
import { signOut } from "firebase/auth"

async function logout() {
    try {
        await signOut(auth)
        // redirect to login
    } catch (error) {
        console.error(error)
    }
}

function Header() {

    return (
        <button
            className="absolute top-3 right-3 border-2 p-1 rounded-lg"
            onClick={logout}
        >
            Sign out
        </button>
    )
}

export default Header
