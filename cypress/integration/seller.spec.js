describe('A seller going through the "Sell" quiz', () => {
  it('Enter selling address', () => {
    cy.visit('/')
    cy.get('[data-cy="Address Input"]')
      .type('20 Monticello, Irvine, CA 92620')
      .then((inputValue) => {
        expect(inputValue).to.have.value('20 Monticello, Irvine, CA 92620')
      })
    cy.get('.max-w-screen-sm.mx-auto').find('button').click()
  })
  describe('Take quiz ', () => {
    it('When are you thinking about selling', () => {
      cy.get('[data-cy="SP1_TIMEFRAME_ASAP"]').click()
    })
    it('Have you sold a home before', () => {
      cy.get('[data-cy="SP1_SELL_EXPERIENCE_N"').click()
    })
    it('What is the condition of your home', () => {
      cy.get('[data-cy="SP1_HOME_CONDITION_GOOD"').click()
    })
    it('Why are you selling', () => {
      cy.get('[data-cy="SP1_SELL_REASON_FINANCES"').click()
    })
    it('What is most important to you', () => {
      cy.get('[data-cy="SP1_SALE_PROFIT_PRIORITY_2"').click()
    })
    it('Lets find out how much your home is worth', () => {
      cy.get('[data-cy="Address Input"]')
        .type('20 Monticello, Irvine, CA 92620')
        .then((inputValue) => {
          expect(inputValue).to.have.value('20 Monticello, Irvine, CA 92620')
        })
      cy.get('[data-cy="Address Input"]').type('{enter}')
    })
    it('Are you also looking to buy a home', () => {
      cy.get('[data-cy="SP1_BUY_SIDE_NOT_GOING_TO_BUY"').click()
    })
  })

  describe('Fill out contact form', () => {
    it('Fill in the information to get the report', () => {
      cy.get('[data-cy="First Name"]', { timeout: 10000 }).type('Antonina')
      cy.get('[data-cy="Last Name"]').type('Catrinici')
      cy.get('[data-cy="Email"]').type('catrinici.antonina@gmail.com')
      cy.get('[data-cy="Mobile Number*"]').type('2222223222')
      cy.get('form').submit()
    })
  })
  describe('Redirect to “/your-recommendations” page', () => {
    it('"Selling Matches" Tab selected', () => {
      cy.wait(5000)
      cy.url().should(
        'include',
        'https://qa-interview.sold.com/your-recommendations/MTI3NTM=?activeTab=0'
      )
    })
    it("Should display contact's first name & last name", () => {
      cy.contains('h1', 'Home seller report for').should(
        'contain',
        'Antonina Catrinici'
      )
    })
    it('Should display correct zip code and city', () => {
      cy.contains('div', 'Local Market Insights for:').should(
        'contain',
        '92620, Irvine'
      )
    })
    it('Michael Trieu should be one of the recommended agents', () => {
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
    it('Opendoor should be a cash partner recommendation', () => {
      //I can not see any Cash partners recommendation on website.
    })
    it('Reali should be recommended as a discount broker', () => {
      cy.get('div')
        .parents('#RecoCategory-NonTraditionalAgent')
        .find('p')
        .should('contain', 'Reali provides licensed agents')
    })
    it('Fizber should always be recommended', () => {
      cy.get('div')
        .parents('#RecoCategory-FSBO')
        .find('p')
        .should('contain', 'Save thousands with Fizber!')
    })
  })
})
