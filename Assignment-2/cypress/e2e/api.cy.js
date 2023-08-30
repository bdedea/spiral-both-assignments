import posts from "../fixtures/posts.json";

Cypress.on("uncaught:exception", () => false);
describe("GET response from /posts", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
  });
  it("Check response status for all posts", () => {
    cy.getResponseAllPosts();
  });
  it("Check response status for single post", () => {
    cy.getResponseSinglePost();
  });
  it("Check if response is array and has the correct number of posts", () => {
    // 100 posts in this case
    cy.getResponseAliasArray();
  });
  it("Check correct properties are returned", () => {
    cy.request("GET", "/posts").then((response) => {
      // Just grabbing first item from array of objects (TO:DO - search through everything)
      expect(response.body[0]).to.have.keys("body", "title", "id", "userId");
    });
  });

  it("Check if webpage loads with data", () => {
    cy.intercept("**/posts").as("getPosts");
    cy.visit("/");
    cy.get('a[href*="/posts"]').eq(0).click();
    cy.wait("@getPosts");
    // Could check the page(body)for anything but just grabbing userId here
    cy.get("body").then(($el) => {
      Cypress.dom.isVisible($el);
      cy.contains("userId");
    });
  });
  it("Check if any changes in response data", () => {
    // Have a fixture file with all saved response information - this takes the request(response) and compares it to the file
    cy.request("GET", "/posts").then((response) => {
      expect(response.body).to.deep.equal(posts);
    });
  });
});

describe("POST a new post", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
  });
  it("Checks response status for a new request", () => {
    cy.postResource();
  });
  it("Check response to verfiy correct resources posted", () => {
    cy.postResource().then((response) => {
      const res = response.body.body;
      expect(res).to.include({
        body: "bar",
        title: "foo",
        userId: 1,
      });
      expect(response.body.id).to.eq(101);
    });
  });
});

//Expanding on this, I'd next verify other methods (PUT, DELETE, etc.)
