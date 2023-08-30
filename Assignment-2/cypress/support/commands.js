import "cypress-plugin-api";

// getResponse from all posts
Cypress.Commands.add("getResponseAllPosts", () => {
  // could also use cy request
  cy.api({
    method: "GET",
    url: "/posts",
  }).then((response) => {
    if (response.status !== 200) {
      expect(response.status, "GET request failed").to.eq(200);
    } else {
      expect(response.status, "GET request succeeded").to.eq(200);
    }
  });

  // getResponse from single post
  Cypress.Commands.add("getResponseSinglePost", () => {
    // could also use cy request
    cy.api({
      method: "GET",
      url: "/posts/1",
    }).then((response) => {
      if (response.status !== 200) {
        expect(response.status, "GET request failed").to.eq(200);
      } else {
        expect(response.status, "GET request succeeded").to.eq(200);
      }
    });

    // Alias custom command example
    Cypress.Commands.add("getResponseAliasArray", () => {
      cy.api("/posts").as("responseAlias");
      cy.get("@responseAlias").then((response) => {
        expect(response.status).to.eq(200);
        assert.isArray(response.body, "This response is an array");
        expect(response.body).to.have.lengthOf(
          100,
          "All 100 posts are returned"
        );
      });
    });

    // Command to POST a new post
    Cypress.Commands.add("postResource", () => {
      cy.api("POST", "/posts", {
        body: {
          title: "foo",
          body: "bar",
          userId: 1,
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        console.log(response.status);
        if (response.status !== 201) {
          throw new Error("HTTP status " + response.status);
        }
      });
    });

    // Command to write data from /posts to fixture file
    Cypress.Commands.add("savedResponseData", () => {
      cy.request("GET", "/posts").then((response) => {
        cy.writeFile("cypress/fixtures/posts.json", response.body);
      });
    });
  });
});
