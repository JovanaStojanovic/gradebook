///<reference types="Cypress" />


describe('create professor tests', ()=> {
    beforeEach('log into the app', () => {
        cy.loginViaBackend("mg@gmail.com", "Chandler1805");
        cy.visit('/professors/create');

        cy.intercept(
            "POST",
            "https://gradebook-api.vivifyideas.com/api/professors/create",
            ()=>{}
        ).as("createdProfessor");
    })

    it('create professor via backend', () => {
        cy.createProfessorViaBackend("bbbb", "ggggg", "https://upload.wikimedia.org/wikipedia/commons/a/a9/A_sunflower.jpg").then((response)=>{
        const idProfessor = response.body.id;
        console.log(idProfessor);
        
    })
})
})

