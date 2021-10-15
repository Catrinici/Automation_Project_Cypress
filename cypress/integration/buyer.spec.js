describe('A buyer going through the "Buy" quiz', () => {
  it('Enter buying location', () => {
    cy.visit('/')
    cy.get('div')
      .parents('.flex')
      .find('.cursor-pointer')
      .contains('Buy')
      .click()
    cy.get('[data-cy="Address Input"]')
      .type('Irvine, CA')
      .then((inputValue) => {
        expect(inputValue).to.have.value('Irvine, CA')
      })
    cy.get('.max-w-screen-sm.mx-auto').find('button').click()
  })
  describe('Take buyers quiz', () => {
    it('Where do you want to buy?', () => {
      cy.get('[data-cy="Address Input"]')
        .type('Irvine, CA')
        .then((inputValue) => {
          expect(inputValue).to.have.value('Irvine, CA')
        })
      cy.get('[data-cy="Address Input"]').type('{enter}')
    })
    it('How much are you looking to spend?', () => {
      cy.get('[data-cy="SP1_BUY_SIDE_500"]').click()
    })
    it('Would you like to know how much you qualify for?', () => {
      cy.get('[data-cy="SP1_MORTGAGE_BUY_NO"]').click()
    })
    it('What type of home?', () => {
      cy.get('[data-cy="SP1_BUYING_HOME_TYPE_SINGLE_FAMILY"]').click()
    })
    it('When are you thinking about buying?', () => {
      cy.get('[data-cy="SP1_BUYING_WHEN_FUTURE"]').click()
    })
    it('What is more important to you?', () => {
      cy.get('[data-cy="SP1_BUYING_IMPORTANCE_KNOWLEDGE_EXPERIENCE"]').click()
    })
    it('Are you also looking to sell a property?', () => {
      cy.get('[data-cy="SP1_BUYING_SELLING_NO"]').click()
    })
  })
  describe('Fill out contact Form', () => {
    it('Enter buyers information in the form', () => {
      cy.get('[data-cy="First Name"]', { timeout: 10000 }).type('Antonina')
      cy.get('[data-cy="Last Name"]').type('Catrinici')
      cy.get('[data-cy="Email"]').type('catrinici.antonina@gmail.com')
      cy.get('[data-cy="Mobile Number*"]').type('2222223222')
      cy.get('form').submit()
    })
  })

  describe('Redirect to “/your-recommendations” page', () => {
    it('"Buying Matches" Tab selected', () => {
      cy.url().should(
        'include',
        'https://qa-interview.sold.com/your-recommendations/MTI3NTM=?activeTab=1'
      )
    })
    it('Michael Trieu should be one of the recommended agents', () => {
      cy.wait(5000)
      cy.get('div')
        .parents('#RecoCategory-Agent')
        .find('h1')
        .should('contain', 'Michael Trieu')
    })
    it('Michael Trieu should be a featured agent', () => {
      cy.get('div')
        .parents('#RecoCategory-Agent')
        .find('span')
        .should('contain', 'FEATURED AGENT')
    })
    it('Reali should be recommended as a discount broker', () => {
      cy.get('div')
        .parents('#RecoCategory-NonTraditionalAgent')
        .find('p')
        .should('contain', 'Buy a home with Reali')
    })
    it('Opendoor should NOT be recommended', () => {
      cy.get('div')
        .parents('#RecoCategory-NonTraditionalAgent')
        .should('not.contain', 'Opendoor')
    })
    it('Fizber should NOT be recommended', () => {
      cy.get('div')
        .parents('#RecoCategory-NonTraditionalAgent')
        .should('not.contain', 'Fizber')
    })
  })
})
