import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Page404 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>404 Error Page</h1>
      <p>The page does not exist</p>
      <Button variant="danger" type="submit" onClick={handleClick}>
        Go to Home
      </Button>
    </div>
  );
};

export default Page404;
