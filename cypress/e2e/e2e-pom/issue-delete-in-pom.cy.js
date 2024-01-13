/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //open issue detail modal with title from line 16  
    cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete issue successfully', () => {
    //Delete issue
    IssueModal.clickDeleteButton();
    //Confirm deletion && Confirm deletion dialog is not visible
    IssueModal.confirmDeletion();   
    //Assert that issue is NOT visible on board
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle); 
  });

  it('Should cancel deletion process successfully', () => {
    //Click on delete button  
    IssueModal.clickDeleteButton();
    //Click on 'Cancel' button  
    IssueModal.cancelDeletion();
    //Close issue detail modal
    IssueModal.closeDetailModal();
    //Assert that issue is visible on board
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle);
  });
});