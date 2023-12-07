import { useState } from "react"
import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import service from "../api/service"
import { useNavigate } from "react-router-dom"
import Tooltip from "./Tooltip"

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

function Registration({ changeForm }) {
    const [credentials, setCredentials] = useState(null)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const [errors, setErrors] = useState({})
    const [signUpError, setSignUpError] = useState("")
    const [signUpLoading, setSignUpLoading] = useState(false)

    const hasError = Object.values(errors).some((value) => value !== "")

    const navigate = useNavigate()

    function onCredentialsBlur(e) {
        setIsPasswordFocused(false)
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
            case "password":
                if (!value?.match(passwordRegex) && value !== "") {
                    localErrors = {
                        ...errors,
                        password: "Invalid password",
                    }
                } else {
                    localErrors = {
                        ...errors,
                        password: "",
                    }
                }
                break
            case "confirmPassword":
                if (value !== credentials?.password && value !== "") {
                    localErrors = {
                        ...errors,
                        confirmPassword: "Passwords don't match",
                    }
                } else {
                    localErrors = {
                        ...errors,
                        confirmPassword: "",
                    }
                }
                break
        }

        setErrors(localErrors)
    }

    async function signUp() {
        setSignUpLoading(true)
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                credentials?.email.trim(),
                credentials?.password.trim()
            )
            await service.addUser(res?.user?.uid, res?.user?.email)
            navigate("/")
        } catch (error) {
            console.error(error)
            if (error.code === "auth/email-already-in-use") {
                setSignUpError("This email is already registered")
            }
        } finally {
            setSignUpLoading(false)
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
                    onBlur={(e) => onCredentialsBlur(e)}
                    type="email"
                    placeholder="Email.."
                    name="email"
                />
                <p className="text-red-500 ml-2 w-full">{errors?.email}</p>
                <div className="relative w-full">
                    {isPasswordFocused && (
                        <Tooltip
                            content={
                                <ul className="w-full text-white">
                                    <li>
                                        Contains at least one lowercase letter
                                    </li>
                                    <li>
                                        Contains at least one uppercase letter
                                    </li>
                                    <li>Contains at least one digit</li>
                                    <li>
                                        Has a minimum length of 8 characters
                                    </li>
                                </ul>
                            }
                        />
                    )}
                    <input
                        className="border-2 px-2 py-1 rounded-2xl w-full relative"
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                password: e.target.value,
                            })
                        }
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={(e) => onCredentialsBlur(e)}
                        type="password"
                        placeholder="Password.."
                        name="password"
                    />
                </div>
                <p className="text-red-500 ml-2 w-full">{errors?.password}</p>
                <input
                    className="border-2 px-2 py-1 rounded-2xl w-full"
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            confirmPassword: e.target.value,
                        })
                    }
                    onBlur={(e) => onCredentialsBlur(e)}
                    type="password"
                    placeholder="Confirm your password.."
                    name="confirmPassword"
                />
                <p className="text-red-500 ml-2 w-full">
                    {errors?.confirmPassword}
                </p>
                <button
                    className={`w-full border-2 p-2 rounded-2xl bg-black text-white font-bold hover:bg-blue-600 transition delay-50 active:bg-blue-700 ${
                        hasError || signUpLoading
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                    }`}
                    disabled={hasError || signUpLoading}
                    onClick={signUp}
                >
                    {signUpLoading ? "Loading..." : "Sign up"}
                </button>
                <p className="text-red-500 ml-2">{signUpError}</p>
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
