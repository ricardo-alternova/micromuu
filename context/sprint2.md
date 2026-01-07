Project Description:

Micromuu is an app to manage your cattle inventory.

This project will be managed by sprints. For each sprint I will provide an spec on an sprint#.md file. You will generate a new .md file with sprint#-plan.md with an implementation plan that you will work on until you finish it. Once finished you will:

1. create a new file sprint#-review.md where you will give a step by step guide of what I need to do to make this work.
2. On that file, list the tests you did (with a description) and add the test coverage.

_Tasks:_

- When a user logs in, they are taken to a dashboard where we can see a list of Farms. and a button to add a new one.
- A farm is an entity created by a user. This entity will have its own collection in the database and under the UID we will have the farm IDs.
- A Farm will have three fields for now: Name, location and a profile picture.
- The table on the dashboard will show these two fields.
- The user can edit a Farm. They can change the name, the location, the picture or they can archive it, which won't show it in the table.
