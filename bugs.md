- BUG #1: register user does not give ability to register an admin user

- BUG #2: logging in with invalid credentials returns a token instead of the error message

- BUG #3: 404 was not thrown when requesting /users/:username with a non existent user

- BUG #4: Non admin user unable to send patch request to update their own user profile

- BUG #5: None admin user was able to change admin status