import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

const Leaderboard = ({ leaderboardUsers }) => {
  return (
    <Table responsive bordered hover>
      <thead>
        <tr>
          <th>Users</th>
          <th>Answered</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {leaderboardUsers.map((user) => {
          const { name, avatarURL, answers, questions } = user;
          return (
            <tr key={name}>
              <td>
                <img
                  className="leaderboard-avatar"
                  src={avatarURL}
                  alt={name}
                />
                {name}
              </td>
              <td>{answers}</td>
              <td>{questions}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const mapStateToProps = ({ users }) => {
  const leaderboardUsers = Object.values(users)
    .map((user) => {
      const { id, name, avatarURL } = user;
      const answers = Object.values(user.answers).length;
      const questions = user.questions.length;
      const total = answers + questions;
      return { id, name, avatarURL, answers, questions, total };
    })
    .sort((a, b) => b.total - a.total);
  return { leaderboardUsers };
};

export default connect(mapStateToProps)(Leaderboard);
