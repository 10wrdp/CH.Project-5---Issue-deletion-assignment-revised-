import IssueTimeTracking from "../pages/IssueTimeTracking";


describe('Add, edit, remove time estimation', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Add, edit, remove time estimation', () => {
        //add time estimation and check that it is visible
        IssueTimeTracking.addEstimation()
        //edit time estimation and check that it is visible
        IssueTimeTracking.editEstimation()
        //remove time estimation and check that it is removed
        IssueTimeTracking.removeEstimation()
    });

    it('Add, edit, remove time tracking', () => {
        //add time tracking and check that it is visible
        IssueTimeTracking.addTimeTracking()
        //edit time tracking and check that it is visible
        IssueTimeTracking.editTimeTracking()
        //remove time tracking and chech that it is not visible
        IssueTimeTracking.removeTimeTracking()
    })
});
