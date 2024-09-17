import { useState } from "react";
import { connect } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DashboardCard from "./DashboardCard";

const Dashboard = ({ allQuestions }) => {
  const [key, setKey] = useState("unanswered");

  return (
    <>
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="unanswered" title="Unanswered polls">
          {allQuestions.questionsUnanswered.map((question) => (
            <DashboardCard key={question.id} question={question} />
          ))}
        </Tab>
        <Tab eventKey="answered" title="Answered polls">
          {allQuestions.questionsAnswered.map((question) => (
            <DashboardCard key={question.id} question={question} />
          ))}
        </Tab>
      </Tabs>
    </>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => {
  const questionsAnsweredIds = Object.keys(users[authedUser].answers);
  const questionsAnswered = Object.values(questions)
    .filter((question) => questionsAnsweredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const questionsUnanswered = Object.values(questions)
    .filter((question) => !questionsAnsweredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    allQuestions: {
      questionsAnswered,
      questionsUnanswered,
    },
  };
};

export default connect(mapStateToProps)(Dashboard);
