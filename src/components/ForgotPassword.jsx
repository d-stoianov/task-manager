import { useState } from "react"
import { auth } from "../config/firebase"
import { sendPasswordResetEmail } from "firebase/auth"
import service from "../api/service"

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

function ForgotPassword({ changeForm }) {
    const [credentials, setCredentials] = useState(null)
    const [errors, setErrors] = useState({})
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState("")
    const [forgotPasswordError, setForgotPasswordError] = useState("")
    const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)

    const hasError = Object.values(errors).some((value) => value !== "")

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

    async function renewPassword() {
        setForgotPasswordLoading(true)
        const userExists = await service.userExist(credentials.email.trim())
        if (!userExists) {
            setForgotPasswordMessage("")
            setForgotPasswordError("No account found by this email")
            setForgotPasswordLoading(false)
            return
        }
        try {
            await sendPasswordResetEmail(auth, credentials?.email.trim())
            setForgotPasswordError("")
            setForgotPasswordMessage(
                "The link to renew your password has been sent to your email"
            )
        } catch (error) {
            console.error(error)
        } finally {
            setForgotPasswordLoading(false)
        }
    }

    return (
        <div className="absolute top-[20%] md:top-[20vh] left-[50%] -translate-x-1/2">
            <h1 className="text-center my-3 font-bold text-[1.25rem]">
                Renew password
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
                    placeholder="Email.."
                    name="email"
                />
                <p className="text-red-500 ml-2 w-full">{errors?.email}</p>
                <button
                    className={`w-full border-2 p-2 rounded-2xl bg-black text-white font-bold hover:bg-blue-600 transition delay-50 active:bg-blue-700 ${
                        hasError || forgotPasswordLoading
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                    }`}
                    disabled={hasError || forgotPasswordLoading}
                    onClick={renewPassword}
                >
                    {forgotPasswordLoading ? "Loading..." : "Send email"}
                </button>
                <p className="ml-2 text-center">{forgotPasswordMessage}</p>
                <p className="ml-2 text-center text-red-500">
                    {forgotPasswordError}
                </p>
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

export default ForgotPassword
