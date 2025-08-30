import { LogIn, LogOut } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import Button from "@/components/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-6">
      <div className="flex items-center justify-center gap-2">
        <img src="/foo-rum-logo.svg" />
        <h5 className="font-bold">foo-rum</h5>
      </div>
      {user ? (
        <div className="flex items-center gap-1">
          <p>Hi {user.email}, </p>
          <Button
            variant="link"
            color="transparent"
            endIcon={<LogOut className="w-4 h-4" />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Button
          variant="link"
          color="transparent"
          endIcon={<LogIn className="w-4 h-4" />}
          onClick={handleLoginRedirect}
        >
          Login
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
