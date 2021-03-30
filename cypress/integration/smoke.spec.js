describe('smoke', () => {
  it('should allow a typical user flow', () => {
    cy.visit('/')
    cy.findByText(/go to dashboard/i).click()

    // modify settings
    cy.findByRole('button', {name: /settings/i}).click()

    cy.findByLabelText(/number of budget period per month/i)
      .clear()
      .type('4')
    cy.findByLabelText(/how much is your current emergency fund/i)
      .clear()
      .type('10000')
    cy.findByLabelText(
      /How much do you want to transfer to Emergency Fund every budget period/i,
    )
      .clear()
      .type('100')
    cy.findByLabelText(
      /If you lost your job, you might be unemployed for how many months/i,
    )
      .clear()
      .type('12')

    cy.findByRole('button', {name: /done/i}).click()

    // edit period
    cy.findByRole('button', {name: /edit period/i}).click()
    cy.findByLabelText(/income/i)
      .clear()
      .type('800')
    cy.findByRole('button', {name: /done/i}).click()

    // log normal spending
    cy.findByRole('button', {name: /spend/i}).click()
    cy.findByLabelText(/description/i).type('lunch')
    cy.findByLabelText(/cost/i).clear().type('10')
    cy.findByRole('button', {name: /create/i}).click()

    // log emr spending
    cy.findByRole('button', {name: /use/i}).click()
    cy.findByLabelText(/description/i).type('house repair')
    cy.findByLabelText(/cost/i).clear().type('50')
    cy.findByRole('button', {name: /create/i}).click()

    // log spludge spending
    cy.findByRole('button', {name: /spludge/i}).click()
    cy.findByLabelText(/description/i).type('new shoes')
    cy.findByLabelText(/cost/i).clear().type('30')
    cy.findByRole('button', {name: /create/i}).click()

    // log fixed spending
    cy.findByRole('button', {name: /add/i}).click()
    cy.findByLabelText(/description/i).type('internet')
    cy.findByLabelText(/cost/i).clear().type('30')
    cy.findByRole('button', {name: /create/i}).click()

    // log goal spending
    cy.findByRole('button', {name: /create/i}).click()
    cy.findByLabelText(/description/i).type('vacation')
    cy.findByLabelText(/cost/i).clear().type('50')
    cy.findByLabelText(/current balance/i)
      .clear()
      .type('500')
    cy.findByLabelText(/goal amount/i)
      .clear()
      .type('1000')

    cy.findByRole('button', {name: /create/i}).click()

    // create next period
    cy.findByRole('button', {name: /next period/i}).click()
    cy.findByLabelText(/income/i).type('800')
    cy.findByLabelText(/phone/i).click()
    cy.findByLabelText(/new car/i).click()
    cy.findByRole('button', {name: /create/i}).click()
  })
})
