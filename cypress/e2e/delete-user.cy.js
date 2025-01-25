import { reqGetUser } from '../support/reqGetUser'

describe('Reqres', () => {
  it('Delete User', () => {
    reqGetUser('3').then(({ user }) => {
      // Delete user with id 3
      cy.request({
        method: 'DELETE',
        url: `/api/users/${user.id}`,
      }).then((response) => {
        // Validate status code
        expect(response.status).to.equal(204)

        // Logs for additional visibility
        cy.log(`User delete with name: ${user.fullName}`)
        cy.log(`User delete with job: ${user.job}`)
      })
    })
  })
})
