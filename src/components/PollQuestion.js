import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import ProgressBar from "react-bootstrap/ProgressBar";
import { handleAnswer } from "../actions/questions";
import { handleSaveQuestionAnswer } from "../actions/users";

const PollQuestion = ({ authedUser, questions, users, dispatch }) => {
  const [answered, setAnswered] = useState(false);
  const navigate = useNavigate();
  const questionId = useParams().question_id;
  const question = questions[questionId];
  const avatar = users[question?.author]?.avatarURL;
  const loggedIn = users[authedUser];
  const authedUserAnswers = loggedIn.answers;
  const optionOneVotes = question?.optionOne.votes.length;
  const optionTwoVotes = question?.optionTwo.votes.length;
  const votesTotal = optionOneVotes + optionTwoVotes;
  const optionSelectedByUser = users[authedUser].answers[question?.id];

  const calculatePercentage = (votes, total) => {
    return Math.floor((votes / total) * 100);
  };

  const percentageOptionOne = calculatePercentage(optionOneVotes, votesTotal);
  const percentageOptionTwo = calculatePercentage(optionTwoVotes, votesTotal);

  useEffect(() => {
    const loggedInAnswer = Object.keys(authedUserAnswers)
      .filter((answer) => {
        return answer === questionId;
      })
      .map((answer) => {
        return authedUserAnswers[answer];
      });
    if (loggedInAnswer.length > 0) {
      setAnswered(true);
    }
  }, [authedUser, authedUserAnswers, questionId]);

  useEffect(() => {
    if (question === undefined) {
      navigate("/404");
    }
  }, [navigate, question]);

  const handleClick = (e) => {
    e.preventDefault();
    const selectedOption = e.target.name;

    dispatch(
      handleAnswer({
        authedUser,
        qid: questionId,
        answer: selectedOption,
      })
    );
    dispatch(
      handleSaveQuestionAnswer({
        authedUser,
        qid: questionId,
        answer: selectedOption,
      })
    );
    
    // Update the state to reflect that the user has answered
    setAnswered(true);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <div className="text-center">
            <Card.Title>Poll by {question?.author}</Card.Title>
            <Image roundedCircle src={avatar} alt={question?.author} />
            <Card.Text>Would you rather</Card.Text>
            {!answered && (
              <div>
                <p className="poll-question">{question?.optionOne.text}</p>
                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    name="optionOne"
                    onClick={handleClick}
                  >
                    Click
                  </Button>
                </div>
                <p className="poll-question">{question?.optionTwo.text}</p>
                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    name="optionTwo"
                    onClick={handleClick}
                  >
                    Click
                  </Button>
                </div>
              </div>
            )}
            {answered && (
              <div>
                <div>
                  {optionSelectedByUser === "optionOne" && (
                    <span>You voted for: </span>
                  )}
                  <p className="poll-question">{question?.optionOne.text}</p>
                  <ProgressBar
                    now={percentageOptionOne}
                    label={`${percentageOptionOne}%`}
                  />
                  <p>People who voted: {optionOneVotes}</p>
                </div>
                <div>
                  {optionSelectedByUser === "optionTwo" && (
                    <span>You voted for: </span>
                  )}
                  <p className="poll-question">{question?.optionTwo.text}</p>
                  <ProgressBar
                    now={percentageOptionTwo}
                    label={`${percentageOptionTwo}%`}
                  />
                  <p>People who voted: {optionTwoVotes}</p>
                </div>
                <Button onClick={handleBack}>Go Back to Home</Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  users,
  authedUser,
  questions,
});

export default connect(mapStateToProps)(PollQuestion);
