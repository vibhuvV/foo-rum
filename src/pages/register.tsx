import Button from "@/components/Button";
import RegisterForm from "@/containers/RegisterForm";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-6">
        <Link to="/" className="flex items-center justify-center gap-2">
          <img src="/foo-rum-logo.svg" />
          <h5 className="font-bold">foo-rum</h5>
        </Link>

        <Button variant="link" color="transparent" onClick={backToHome}>
          Back to home
        </Button>
      </nav>
      <main className="max-w-[360px] mx-auto mt-20">
        <RegisterForm onSignInRedirect={handleLoginRedirect} />
      </main>
    </>
  );
};

export default RegisterPage;
