export const reqGetUser = (id) => {
  return cy.request({
    method: 'GET',
    url: `/api/users/${id}`,
  }).then((response) => {
    // Validate status code and response body
    expect(response.status).to.equal(200)
    let user = response.body.data
    expect(user).to.have.property('id')
    expect(user).to.have.property('first_name')
    expect(user).to.have.property('last_name')

    // Store original details for comparisons
    user.fullName = `${user.first_name} ${user.last_name}`
    user.job = user.job || 'No job specified'

    // Return the user object to be used in the test file
    return { user }
  })
}
