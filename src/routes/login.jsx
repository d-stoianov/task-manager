import { useState } from "react"
import { auth, googleProvider } from "../config/firebase"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import Registration from "../components/Registration"
import ForgotPassword from "../components/ForgotPassword"
import { useNavigate } from "react-router-dom"
import GoogleLogo from "../assets/images/GoogleLogo.png"
import service from "../api/service"

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

function Login() {
    const [credentials, setCredentials] = useState(null)
    const [errors, setErrors] = useState({})
    const [showRegistation, setShowRegistation] = useState(false)
    const [showForgotPassword, setShowForgotPassword] = useState(false)
    const [loginError, setLoginError] = useState("")
    const [loginLoading, setLoginLoading] = useState(false)

    const hasError = Object.values(errors).some((value) => value !== "")

    const navigate = useNavigate()

    function onCredentialsBlur(e) {
        const { value, name } = e.target
        let localErrors = {}

        switch (name) {
            case "email":
                if (!value?.match(emailRegex) && value !== "") {
                    localErrors = { ...errors, email: "Invalid email" }
                } else {
                    localErrors = {
                        ...errors,
                        email: "",
                    }
                }
                break
        }

        setErrors(localErrors)
    }

    async function login(method) {
        setLoginLoading(true)
        try {
            switch (method) {
                case "email": {
                    const res = await signInWithEmailAndPassword(
                        auth,
                        credentials?.email.trim(),
                        credentials?.password.trim()
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
            if (error.code === "auth/invalid-login-credentials") {
                setLoginError("The pair of email and password is not valid")
            }
        } finally {
            setLoginLoading(false)
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
                    onBlur={(e) => onCredentialsBlur(e)}
                    placeholder="Email.."
                    name="email"
                />
                <p className="text-red-500 ml-2 w-full">{errors?.email}</p>
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
                    className={`w-full border-2 p-2 rounded-2xl bg-black text-white font-bold hover:bg-blue-600 transition delay-50 active:bg-blue-700 ${
                        hasError || loginLoading
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                    }`}
                    disabled={hasError || loginLoading}
                    onClick={() => login("email")}
                >
                    {loginLoading ? "Loading..." : "Sign in"}
                </button>
                <button
                    className="w-full border-2 p-2 rounded-2xl bg-black text-white font-bold hover:bg-blue-600 transition delay-50 active:bg-blue-700 relative flex items-center justify-center"
                    onClick={() => login("google")}
                >
                    <img
                        className="absolute left-8 w-8 h-8"
                        src={GoogleLogo}
                        alt="google logo"
                    />
                    <h1>Sign in with Google</h1>
                </button>
                <p className="text-red-500 ml-2">{loginError}</p>
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
