describe('issue details editing', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
          });
    });
    
    const expectedLength = 5
    let priority = ['Lowest', 'Low', 'Medium', 'Highest']
    priority.push('High')

    it('Checking drowdown menu for priority', () => {
        cy.get('[class="sc-cpmLhU dCLQTz"]').click()
        priority.forEach((priority) => {
           cy.get('[class="sc-hzDkRC OIdAg"]').children(expectedLength)
           .contains(priority).should('be.visible')
        })
        cy.get(priority)
        console.log(priority)
    });

    const name = 'Baby Yoda'
    const regex =  '/^[A-Za-z\s]$/'
    
    it('Reporter`s name has only characters in it', () => {
        cy.get('[data-testid="select:reporter"]')
        .contains(name).invoke('text')
        .should('equal', regex)
    });

    const title = '   This is a test  '

    it('Application removes unnecessary spaces', () => {
        cy.get('[class="sc-fMiknA edMYdI sc-epnACN dYOCoN"]')
        .click()
        .clear()
        .type(title)
        
        cy.get('[class="sc-bdVaJa fuyACr"]').click()
        
        cy.contains('This is a test')
        .click()
        .get('[class="sc-fMiknA edMYdI sc-epnACN dYOCoN"]')
        .click()
        .clear()
        .type(title.trim())

    });
});