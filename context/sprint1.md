Project Description:

Micromuu is an app to manage your cattle inventory.

This project will be managed by sprints. For each sprint I will provide an spec on an sprint#.md file. You will generate a new .md file with sprint#-plan.md with an implementation plan that you will work on until you finish it. Once finished you will:

1. create a new file sprint#-review.md where you will give a step by step guide of what I need to do to make this work.
2. On that file, list the tests you did (with a description) and add the test coverage.

_Stack:_

- Android, iOS and Web platforms using Expo and Expo Go. I want to use Typescript and React Native including React Native Web)
- Firestore for database.
- Firebase for storage, authentication and notifications.
- Material Design 3 for design language.
- Big focus on strong rules for the database and the storage.
- The application needs to be available in English and Spanish.
- .env file with secrets. Never expose secrets or api keys.
- We will develop and test functionality as we move forward. Our battery of tests must include unit tests and e2e tests using playwright.

_Tasks:_

- Create the Expo project and the structure of the directories.
- create a login with email and password authentication.
- create a registration form with these fields:

1. Name
2. Last name
3. Email

- Once a person registers, create a profile collection in the database. In this collection save the name, the last name.
- Once a person registers, log them in immediately, and show them a welcome screen.
- These screens should change language depending on the device's language.
- Create tests that validate the functionality of these features.
- Use the frontend skill to give the app a cowboy style.
