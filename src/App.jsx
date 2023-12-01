import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "./error-page"
import ProtectedRoute from "./routes/protected-route"
import Root from "./routes/root"
import Login from "./routes/login"
import Create from "./routes/create"

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Root />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/create",
        element: (
            <ProtectedRoute>
                <Create />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
