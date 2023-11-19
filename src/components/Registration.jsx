import { useState } from "react"
import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"

function Registration({ changeForm }) {
    const [credentials, setCredentials] = useState(null)

    async function signUp() {
        try {
            await createUserWithEmailAndPassword(
                auth,
                credentials?.email,
                credentials?.password
            )
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="relative top-[50vh] -translate-y-1/2 md:-translate-y-0  md:top-[20vh] left-[50%] -translate-x-1/2">
            <h1 className="text-center my-2">Registration</h1>
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
                <input
                    className="border-orange-500 border-2 px-2"
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
                    className="border-2 p-1 my-2 rounded-lg"
                    onClick={signUp}
                >
                    Sign up
                </button>
                <p
                    onClick={() => changeForm(false)}
                    className="cursor-pointer text-orange-500"
                >
                    Back to Login
                </p>
            </form>
        </div>
    )
}

export default Registration
