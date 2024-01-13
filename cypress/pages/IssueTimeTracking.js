class TimeTracking { 
    constructor () {
        this.issueModal = '[data-testid="modal:issue-details"]'
        this.estimateBox = '[class="sc-dxgOiQ HrhWu"]'
        this.timeTrackingBox = '[class="sc-bMvGRv IstSR"]'
        this.timeTrackingModal = '[class="sc-CtfFt ibRYdW"]'
        this.timeTrackingText = '[class="sc-rBLzX irwmBe"]'
        this.timeSpent = '[class="sc-kpOJdX bYAXKl"]'
        this.timeRemaining = '[class="sc-kpOJdX bYAXKl"]'
        this.doneButton = '[class="sc-bwzfXH dIxFno"]'

    }
    getIssueModal() {
        return cy.get(this.issueModal)
    }
    
    addEstimation() {
        cy.get(this.issueModal)
        cy.get(this.estimateBox).invoke('click').clear().type('10')
        //Estimation is added and visible
        cy.get(this.timeTrackingBox).contains('10h estimated').should('be.visible')
    }
    editEstimation() {
        cy.get(this.issueModal)
        cy.get(this.estimateBox).invoke('click').clear().type('23')
        //Estimation is edited and visible
        cy.get(this.timeTrackingBox).contains('23h estimated').should('be.visible')
    }
    removeEstimation() {
        cy.get(this.issueModal)
        cy.get(this.estimateBox).invoke('click').clear()
        //Estimation is removed and is not visible
        cy.get(this.timeTrackingBox).contains('4h logged').should('be.visible')
    }
    addTimeTracking() {
        cy.get(this.timeTrackingBox).invoke('click')
        cy.get(this.timeTrackingModal).find(this.timeSpent).eq(0).click().clear().type('10')
        cy.get(this.timeRemaining).eq(2).invoke('click').clear().type('2')
        cy.get(this.doneButton).invoke('click')
        //Check that time is added and is
        cy.get(this.timeTrackingBox).children().contains('div', '10h logged', '2h remaining').should('be.visible')
        
    }
    editTimeTracking() {
        cy.get(this.timeTrackingBox).invoke('click')
        cy.get(this.timeTrackingModal).find(this.timeSpent).eq(0).click().clear().type('5')
        cy.get(this.timeRemaining).eq(2).invoke('click').clear().type('4')
        cy.get(this.doneButton).invoke('click')
        //Check that edited time is added and is visible
        cy.get(this.timeTrackingBox).children().contains('div', '5h logged', '4h remaining').should('be.visible')
    }
    removeTimeTracking() {
        cy.get(this.timeTrackingBox).invoke('click')
        cy.get(this.timeTrackingModal).find(this.timeSpent).eq(0).click().clear()
        cy.get(this.timeRemaining).eq(2).invoke('click').clear()
        cy.get(this.doneButton).invoke('click')
        //Check that edited time is removed and is not logged
        cy.get(this.timeTrackingBox).children().contains('No time logged').should('be.visible')
    }
    
}

export default new TimeTracking();