import { AuthProvider } from "./hooks/useAuth.tsx";
import { createBrowserRouter } from "react-router";
import Index from "./pages/index.tsx";
import { Outlet } from "react-router";
import LoginPage from "./pages/login.tsx";
import RegisterPage from "./pages/register.tsx";

const router = createBrowserRouter([
  {
    Component: () => (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        Component: Index,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/register",
        Component: RegisterPage,
      },
    ],
  },
]);

export default router;
