import { dataToUser } from '../support/data'
import { reqGetUser } from '../support/reqGetUser'

const dataUser = dataToUser()

describe('Reqres', () => {
  it('Update User With PUT', () => {
    // Get user function and ensure it completes before proceeding
    reqGetUser('2').then(({ user }) => {
      // Update user with id 2
      cy.request({
        method: 'PUT',
        url: `/api/users/${user.id}`,
        body: {
          name: dataUser.name,
          job: dataUser.job,
        },
      }).then((response) => {
        // Validate status code
        expect(response.status).to.equal(200)

        // Validate response body
        const userUpdated = response.body
        cy.wrap(userUpdated).should((updateUser) => {
          expect(updateUser.name)
            .to.equal(dataUser.name, `Expected updated name to be "${dataUser.name}"`)
            .to.not.equal(user.fullName, `Expected updated name to differ from original "${user.fullName}"`)
          expect(updateUser.job)
            .to.equal(dataUser.job, `Expected updated job to be "${dataUser.job}"`)
            .to.not.equal(user.job, `Expected updated job to differ from original "${user.job}"`)
        })

        // Logs for additional visibility
        cy.log(`User updated successfully: User ID = ${user.id}`)
        cy.log(`Original Name: ${user.fullName} | Updated Name: ${userUpdated.name}`)
        cy.log(`Original Job: ${user.job} | Updated Job: ${userUpdated.job}`)
      })
    })
  })

  it('Update User With PATCH', () => {
    // Get user function and ensure it completes before proceeding
    reqGetUser('2').then(({ user }) => {
      // Update user with id 2
      cy.request({
        method: 'PATCH',
        url: `/api/users/${user.id}`,
        body: {
          job: dataUser.job,
        },
      }).then((response) => {
        // Validate status code
        expect(response.status).to.equal(200)

        // Validate response body
        const userUpdated = response.body
        cy.wrap(userUpdated).should((updateUser) => {
          expect(updateUser.job)
            .to.equal(dataUser.job, `Expected updated job to be "${dataUser.job}"`)
            .to.not.equal(user.job, `Expected updated job to differ from original "${user.job}"`)
        })

        // Logs for additional visibility
        cy.log(`User updated successfully: User ID = ${user.id}`)
        cy.log(`Original Name: ${user.fullName}`)
        cy.log(`Original Job: ${user.job} | Updated Job: ${userUpdated.job}`)
      })
    })
  })
})
