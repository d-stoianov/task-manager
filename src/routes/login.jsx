import { useState } from "react"
import { auth, googleProvider } from "../config/firebase"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import Registration from "../components/Registration"
import ForgotPassword from "../components/ForgotPassword"
import { useNavigate } from "react-router-dom"
import GoogleLogo from "../assets/images/GoogleLogo.png"
import service from "../api/service"

function Login() {
    const [credentials, setCredentials] = useState(null)
    const [showRegistation, setShowRegistation] = useState(false)
    const [showForgotPassword, setShowForgotPassword] = useState(false)

    const navigate = useNavigate()

    async function login(method) {
        try {
            switch (method) {
                case "email": {
                    const res = await signInWithEmailAndPassword(
                        auth,
                        credentials?.email,
                        credentials?.password
                    )

                    await service.addUser(res?.user?.uid, res?.user?.email)
                    break
                }
                case "google": {
                    const res = await signInWithPopup(auth, googleProvider)

                    await service.addUser(res?.user?.uid, res?.user?.email)
                    break
                }
            }
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    }

    if (showRegistation) return <Registration changeForm={setShowRegistation} />
    if (showForgotPassword)
        return <ForgotPassword changeForm={setShowForgotPassword} />

    return (
        <div className="absolute top-[20%] md:top-[20vh] left-[50%] -translate-x-1/2">
            <h1 className="text-center my-3 font-bold text-[1.25rem]">Login</h1>
            <form
                className="flex flex-col items-center gap-2 w-[20rem]"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    className="border-2 px-2 py-1 rounded-2xl w-full"
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            email: e.target.value,
                        })
                    }
                    placeholder="Email.."
                />
                <input
                    className="border-2 px-2 py-1 rounded-2xl w-full"
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            password: e.target.value,
                        })
                    }
                    type="password"
                    placeholder="Password.."
                />
                <button
                    className="w-full border-2 p-2 rounded-2xl bg-black text-white font-bold"
                    onClick={() => login("email")}
                >
                    Sign in
                </button>
                <button
                    className="w-full border-2 p-2 rounded-2xl bg-black text-white font-bold relative flex items-center justify-center"
                    onClick={() => login("google")}
                >
                    <img
                        className="absolute left-8 w-8 h-8"
                        src={GoogleLogo}
                        alt="google logo"
                    />
                    <h1>Sign in with Google</h1>
                </button>
                <p
                    onClick={() => setShowRegistation(true)}
                    className="cursor-pointer text-blue-600"
                >
                    Don't have an account yet ?
                </p>
                <p
                    onClick={() => setShowForgotPassword(true)}
                    className="cursor-pointer text-blue-600"
                >
                    Forgot your password ?
                </p>
            </form>
        </div>
    )
}

export default Login
