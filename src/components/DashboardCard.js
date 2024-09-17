import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const DashboardCard = ({ question }) => {
  const questionDate = new Date(question?.timestamp).toDateString();

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <div className="text-center">
            <Card.Title>{question?.author}</Card.Title>
            <Card.Text>{questionDate}</Card.Text>
          </div>
          <Link to={`questions/${question?.id}`}>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg">
                Show
              </Button>
            </div>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardCard;
