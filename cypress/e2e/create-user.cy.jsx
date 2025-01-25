import { dataToUser } from '../support/data'

describe('Reqres', () => {
  it('Create User', () => {
    const dataUser = dataToUser()
    
    // Create a new user
    cy.request({
      method: 'POST',
      url: '/api/users',
      body: {
        name: dataUser.name,
        job: dataUser.job
      }
    }).then((response) => {
      // Validate status code
      expect(response.status).to.equal(201)

      // Validate response body
      const userCreated = response.body
      cy.wrap(userCreated).should((user) => {
        expect(user.name).to.equal(dataUser.name, `Expected name to be "${dataUser.name}"`)
        expect(user.job).to.equal(dataUser.job, `Expected job to be "${dataUser.job}"`)
      })

      // Logs for additional visibility
      cy.log(`User created with name: ${userCreated.name}`)
      cy.log(`User created with job: ${userCreated.job}`)
    })
  })
})
