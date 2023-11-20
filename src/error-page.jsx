import { useRouteError } from "react-router-dom"

function ErrorPage() {
    const error = useRouteError()
    return (
        <div className="relative w-full top-[20%] flex flex-col gap-2 justify-center items-center">
            <h1>Oops!</h1>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}

export default ErrorPage
