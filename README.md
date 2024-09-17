# Employee Polls Web App

**Employee Polls** is a web application built in React, developed as part of Udacity's Frontend Nanodegree course. It allows employees to create and vote in polls to enhance collaboration and transparency within an organization.

## Project Overview

HR has requested a platform where employees can:
- Create polls with two options.
- Vote on polls and see which option has the most votes.
- View a leaderboard ranking employees by the number of polls they created and answered.

### Poll Creation
Employees can ask questions like, "Would you rather [option A] or [option B]?", with no option for answering both or neither.

### Leaderboard
A dashboard shows employee rankings based on polls created and answered, and top employees are incentivized with prizes.

### User Features
- Answer and view results of polls.
- See unanswered polls.
- Create new polls.
- View a leaderboard of top participants.

## Data Structure

### Users

| Attribute    | Type   | Description |
|--------------|--------|-------------|
| id           | String | Unique identifier for the user |
| password     | String | User's password for authentication |
| name         | String | User's full name |
| avatarURL    | String | URL path to the user's avatar image |
| questions    | Array  | List of IDs for the questions created by the user |
| answers      | Object | Key-value pairs where keys are question IDs and values are the selected option (`optionOne` or `optionTwo`) |

### Questions

| Attribute    | Type   | Description |
|--------------|--------|-------------|
| id           | String | Unique identifier for the question |
| author       | String | ID of the user who created the question |
| timestamp    | String | Date and time the question was created |
| optionOne    | Object | First voting option (includes text and votes) |
| optionTwo    | Object | Second voting option (includes text and votes) |

### Voting Options

| Attribute    | Type   | Description |
|--------------|--------|-------------|
| votes        | Array  | List of user IDs who voted for the option |
| text         | String | The text content of the voting option |

## Data Methods

- **_getUsers()**: Returns an object with user data.
- **_getQuestions()**: Returns an object with question data.
- **_saveQuestion(question)**: Saves a new question.
- **_saveQuestionAnswer(object)**: Saves a user's answer to a poll.

## Getting Started

1. Clone the project repository:
   ```bash
   git clone https://github.com/mqemzi/employee.poll.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Run tests:
   ```bash
   npm test
   ```

## Technologies Used

- **React**
- **Redux**
- **React Router**
- **React Bootstrap**
- **Jest**
- **React Testing Library**

## Credits
- Avatars sourced from [Freepik](https://www.freepik.com/).
