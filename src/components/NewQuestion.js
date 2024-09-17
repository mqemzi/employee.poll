import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { handleAddQuestion } from "../actions/questions";

const NewQuestion = ({ authedUser, dispatch }) => {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");

  const navigate = useNavigate();

  const question = {
    optionOneText,
    optionTwoText,
    author: authedUser,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (optionOneText.trim() === "" || optionTwoText.trim() === "") {
      alert("Both options are required!");
      return;
    }
    dispatch(handleAddQuestion(question));
    setOptionOneText("");
    setOptionTwoText("");
    navigate("/");
  };

  return (
    <Form className="form-new-question" onSubmit={handleSubmit}>
      <h1>Would You Rather</h1>
      <p className="text-center">Create Your Own Poll</p>
      <Form.Group className="mb-3" controlId="firstOption">
        <Form.Label>First Option</Form.Label>
        <Form.Control
          placeholder="Option One"
          type="text"
          value={optionOneText}
          onChange={(e) => setOptionOneText(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="secondOption">
        <Form.Label>Second Option</Form.Label>
        <Form.Control
          placeholder="Option Two"
          type="text"
          value={optionTwoText}
          onChange={(e) => setOptionTwoText(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

NewQuestion.propTypes = {
  authedUser: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(NewQuestion);
