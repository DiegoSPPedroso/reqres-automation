describe('Reqres', () => {
  // Function to make the request and extract users
  const getUsers = (page, callback) => {
    // Makes the request to fetch users from the specified page
    cy.request({
      method: 'GET',
      url: `/api/users?page=${page}`,
    }).then((response) => {
      console.log('response: ', response)
      // Validates the response status
      expect(response.status).to.equal(200)

      const users = []

      cy.log(`Users from page ${page}: `)
      // Iterates over the user data and extracts relevant information
      response.body.data.forEach((user) => {
        const userId = user.id
        const firstName = user.first_name
        const lastName = user.last_name
        const email = user.email
        const avatar = user.avatar

        // Adds the user information to the array
        users.push({
          id: userId,
          firstName: firstName,
          lastName: lastName,
          email: email,
          avatar: avatar
        })

        // Logs the user information
        cy.log('######################################')
        cy.log(`ID: ${userId}`)
        cy.log(`Name: ${firstName} ${lastName}`)
        cy.log(`Email: ${email}`)
        cy.log(`Avatar: ${avatar}`)
      })

      // Calls the callback passing the users and total_pages
      callback(users, response.body.total_pages)
    })
  }

  it('List Users page 1', () => {
    getUsers(1, (users) => {
      // Here you can store and process users from page 1
    })
  })

  it('List Users page 2', () => {
    getUsers(2, (users) => {
      // Here you can store and process users from page 2
    })
  })

  it('List Users all pages', () => {
    let allUsers = []

    // Makes the request for users from page 1
    getUsers(1, (users, totalPages) => {
      // Adds the users from page 1 to the array
      allUsers = [...users]

      // Fetches users from all other pages sequentially
      cy.wrap([]).then(() => {
        for (let page = 2; page <= totalPages; page++) {
          // Waits for the page request to complete before continuing
          cy.wrap(null).then(() => {
            return getUsers(page, (users) => {
              // Adds the users from the current page to the array
              allUsers = [...allUsers, ...users]
            })
          })
        }
      }).then(() => {
        // Logs all users after the search
        cy.log('######################################')
        cy.log('All users from all pages:', allUsers)
      })
    })
  })
})
