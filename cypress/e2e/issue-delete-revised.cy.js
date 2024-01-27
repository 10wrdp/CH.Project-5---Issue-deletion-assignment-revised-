describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.url().should('eq', `${Cypress.env("baseUrl")}project`).then((url) => {
      cy.visit(url + '/board')
      cy.contains('This is an issue of type: Task.').click()
    })
  });
  
  it('Check that issue is deleted', () => {
    //Click on 'Delete' button on issue modal
    issueModal().within(() => {
      cy.get('[class="sc-fOKMvo eJoEKV"]')
      .find('[class="sc-dUjcNx gHqxeK"]')
      .get('[data-testid="icon:trash"]')
      .click()
      })

      //Click 'Delete' button on confirmation modal
      deleteModal().within(() => {
        cy.contains("Are you sure you want to delete this issue?").should('be.visible')
        cy.get('[class="sc-bwzfXH dIxFno sc-kGXeez bLOzZQ"]')
        .contains('Delete issue').should('be.visible')
        .click()
    });
    
    //Confirm that the issue was deleted
    cy.get('[data-testid="board-list:backlog"]').children().should("have.length", 3)
    cy.get(issueModal).should('not.be.visible')
    //Confirm that delete confirmation modal is not visible
    cy.get(deleteModal).should('not.be.visible')    
  });

  it('Check that issue deletion can be canceled', () => {
    //Click on 'Delete' button on issue modal
    issueModal().within(() => {
      cy.get('[class="sc-fOKMvo eJoEKV"]')
      .find('[class="sc-dUjcNx gHqxeK"]')
      .get('[data-testid="icon:trash"]')
      .click()
      })
      //Click 'Cancel' button on confirmation modal
      deleteModal().within(() => {
        cy.contains("Are you sure you want to delete this issue?")
        .should('be.visible')
        cy.get('[class="sc-bwzfXH ewzfNn sc-kGXeez bLOzZQ"]')
        .contains('Cancel').should('be.visible')
        .click()
    });

    issueModal().within(() => {
      cy.get('[class="sc-fOKMvo eJoEKV"]')
      .children()
      .find('[data-testid="icon:close"]')
      .click()
    })

    //Confirm that the issue was not deleted
    cy.get('[data-testid="board-list:backlog"]').children().should("have.length", 4)
    cy.get(issueModal).should('not.be.visible')
    //Confirm that delete confirmation modal is not visible
    cy.get(deleteModal).should('not.be.visible')    
  });

  const deleteModal = () => cy.get('[data-testid="modal:confirm"]')
  const issueModal = () => cy.get('[data-testid="modal:issue-details"]')
});