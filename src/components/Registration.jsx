import { useState } from "react"
import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"

function Registration({ changeForm }) {
    const [credentials, setCredentials] = useState(null)

    const navigate = useNavigate()

    async function signUp() {
        try {
            await createUserWithEmailAndPassword(
                auth,
                credentials?.email,
                credentials?.password
            )
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="absolute top-[20%] md:top-[20vh] left-[50%] -translate-x-1/2">
            <h1 className="text-center my-3 font-bold text-[1.25rem]">
                Registration
            </h1>
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
                <input
                    className="border-2 px-2 py-1 rounded-2xl w-full"
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            confirmPassword: e.target.value,
                        })
                    }
                    type="password"
                    placeholder="Confirm your password.."
                />
                <button
                    className="w-full border-2 p-2 rounded-2xl bg-black text-white font-bold"
                    onClick={signUp}
                >
                    Sign up
                </button>
                <p
                    onClick={() => changeForm(false)}
                    className="cursor-pointer text-blue-600"
                >
                    Back to Login
                </p>
            </form>
        </div>
    )
}

export default Registration
