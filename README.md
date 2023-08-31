# Spiral Assignments

Assignment to gauge architectural and coding skills

# Assignment 1

Create a test suite using any language/UI automation framework that you're comfortable with that searches Google fo "Ducks". Write any test cases that you feel are representative of those you would include in a full solution.

# Assignment 2

Create a test suite using JavaScript that you would like that performs requests to `https://jsonplaceholder.typicode.com/posts`, and validates the functionality. Write tests that demonstrate how you would approach verifying the response.

---

To run assignment 1 test, I'm just using `pytest` (can use `-s` too). Setup to run headed.

To run assignment 2 tests, run `npm i` and then either of these commands:

- `npm run cy:open --env version="test"` (to run in test runner)
- `npm run cy:run --env version="test"` (to run headless)
