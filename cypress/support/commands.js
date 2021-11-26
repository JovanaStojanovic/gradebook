// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginViaBackend", (email, password) =>{
    cy.request(
        'POST',
        'https://gradebook-api.vivifyideas.com/api/login',
        {
            email: email,
            password:password
        }
    ).its("body").then((response)=>{
        window.localStorage.setItem("token", response.loginToken);
    })
})

Cypress.Commands.add('createProfessorViaBackend', (last_name, first_name, imageUrl) => {
    cy.request(
        {
        method: 'POST',
        url: 'https://gradebook-api.vivifyideas.com/api/professors/create',
        body: {
            last_name: last_name,
            first_name: first_name,
            images: [imageUrl]
        },
        headers: {
            authorization: 'Bearer ' + window.localStorage.getItem('token')
        } 
    })
})
