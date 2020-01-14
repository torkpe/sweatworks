# Sweatworks

## Setup/Installation

* Clone repository running `git clone https://github.com/torkpe/sweatworks.git`
* cd into sweatworks
* Run `npm install`
* Set environmental variables in .env
* Open another terminal
* cd into `frontend-web`
* Run `yarn install`
* Run yarn start to start frontend locally

PS: The frontend interacts directly with the live endpoint: `https://7jw1634f66.execute-api.us-east-1.amazonaws.com/dev/`

## Environment Variables
### Root directory
* NODE_ENV=`Current development stage`
* DB_URL=`URL to DB`

### Frontend-web
REACT_APP_BASE_URL=https://7jw1634f66.execute-api.us-east-1.amazonaws.com/dev

## Seeding / Migrations
Run
* `npm run migration` To run migrations
* `npm run seed` To run seed
* `npm run undo:seed` To undo seeding
* `npm run undo:migration` To undo migrations

## API
* Backend: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a20e2b1b9edc4f1d7d6f)

## Frontend
* URL: http://sweatworks.herokuapp.com

## Test
 * `npm test`
