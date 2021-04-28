# Execution of the task

### Assumptions

# Data model

There is no persisted data model. I obtained a mocked database by declaring a houses variable that gets updated while the server runs. Once the server stops no data is persisted.

# Tests

Tests are made so that I make sure that the data model is consistent. I didn't mock an API call.

# Client and graphics

The implementation of the client is made to be close to the look and feel of the mockup but it's not the same. It's done intentionally.

### Run the server

To run the server please cd into the server folder and run `yarn dev`
If you want to run tests for the server just run `yarn test`

### Run the client

Once you have started the server you are now ready to start the client. `cd` into the client folder.
If you want to run the client and test the application from your pc using Chrome dev tools for mobile phones skip this part.
If you wanto to run the client from a mobile using react local network proxy please edit `.env` file. Write your network ip, the one you can see by running `yarn start` where stated "On Your Network", as the `REACT_APP_HOST` environment variable.
To start the server run `yarn start`. For tests use `yarn test`
