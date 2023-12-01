import { useState } from "react"
import { auth } from "../config/firebase"
import { sendPasswordResetEmail } from "firebase/auth"

function ForgotPassword({ changeForm }) {
    const [credentials, setCredentials] = useState(null)

    async function renewPassword() {
        try {
            await sendPasswordResetEmail(auth, credentials?.email)
        } catch (error) {
            console.error(error)
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
                    placeholder="Email.."
                />
                <button
                    className="w-full border-2 p-2 rounded-2xl bg-black text-white font-bold"
                    onClick={renewPassword}
                >
                    Send Email
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

export default ForgotPassword
