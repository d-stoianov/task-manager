import Header from "../components/Header"
import { auth } from "../config/firebase"

function Root() {
    return (
        <>
            <Header />
            <p>Hello {auth?.currentUser?.email}</p>
        </>
    )
}

export default Root
