import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { auth } from "../config/firebase"
import { onAuthStateChanged } from "firebase/auth"

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoute
