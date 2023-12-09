describe('Issue deletion', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });
  
  it('Delete issue', () => {
    //Assert the visibility of the issue
    cy.get('.sc-cbkKFq').should('be.visible');
    //Delete the issue
    cy.get('[data-testid="icon:trash"]').click();
    //Confirm deletion
    cy.get('[data-testid="modal:confirm"]')
    cy.get('.dIxFno > .sc-bxivhb').click();
    //Confirm deletion dialogue is NOT visible
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    //Assert that the issue is not visible on Jira board
    cy.get('.sc-cbkKFq').should('not.exist');
    
    });

    it('Cancel deletion', () => {
      //Assert the visibility of the issue
      cy.get('.sc-cbkKFq').should('be.visible');
      //Delete the issue
      cy.get('[data-testid="icon:trash"]').click();
      //Click on 'Cancel' button
      cy.get('.sc-kgoBCf > .ewzfNn > .sc-bxivhb').click();
      //Close the modal window
      cy.get(':nth-child(4) > [data-testid="icon:close"]').click()
      //Confirm deletion dialogue is NON-existent
      cy.get('[data-testid="modal:confirm"]').should('not.exist');
      //Assert that the issue exists on Jira board
      cy.get('[class="sc-esjQYD DdvSq"]').should('exist');
    });
  })