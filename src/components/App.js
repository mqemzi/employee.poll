import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import Navbar from "./Navbar";
import Login from "./Login";
import PollQuestion from "./PollQuestion";
import Page404 from "./Page404";

const App = ({ authedUser, dispatch }) => {
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);
  return (
    <>
      {authedUser !== null ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/add" element={<NewQuestion />} />
            <Route path="/questions/:question_id" element={<PollQuestion />} />
            <Route path="/404" element={<Page404 />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(App);
