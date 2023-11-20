import { useState } from "react"
import { auth, googleProvider } from "../config/firebase"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import Registration from "../components/Registration"
import { useNavigate } from "react-router-dom"

function Login() {
    const [credentials, setCredentials] = useState(null)
    const [showRegistation, setShowRegistation] = useState(false)

    const navigate = useNavigate()

    async function login(method) {
        try {
            switch (method) {
                case "email": {
                    await signInWithEmailAndPassword(
                        auth,
                        credentials?.email,
                        credentials?.password
                    )
                    navigate("/")
                    break
                }
                case "google": {
                    await signInWithPopup(auth, googleProvider)
                    navigate("/")
                    break
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    if (showRegistation) return <Registration changeForm={setShowRegistation} />

    return (
        <div className="absolute top-[20%]  md:top-[20vh] left-[50%] -translate-x-1/2">
            <h1 className="text-center my-2">Login</h1>
            <form
                className="flex flex-col items-center gap-2"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    className="border-orange-500 border-2 px-2"
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            email: e.target.value,
                        })
                    }
                    placeholder="Email.."
                />
                <input
                    className="border-orange-500 border-2 px-2"
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            password: e.target.value,
                        })
                    }
                    type="password"
                    placeholder="Password.."
                />
                <div className="flex gap-4 my-2 items-center">
                    <button
                        className="border-2 p-1 rounded-lg"
                        onClick={() => login("email")}
                    >
                        Sign in
                    </button>
                    <button
                        className="border-2 p-1 rounded-lg"
                        onClick={() => login("google")}
                    >
                        Sign in with google
                    </button>
                </div>
                <p
                    onClick={() => setShowRegistation(true)}
                    className="cursor-pointer text-orange-500"
                >
                    Don't have an account yet ?
                </p>
            </form>
        </div>
    )
}

export default Login
