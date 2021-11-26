///<reference types="Cypress" />

//const loginData = require('../fixtures/loginDataPositive.json');
const createGradebookPositive =require('../fixtures/createGradebookPositive.json');
import {idProfessor} from './../integration/createProfessor.spec';
import {createGradebook} from './../page_objects/createGradebook';
import {loginPage} from './../page_objects/loginPage';
const userDataLoginPositive =require('../fixtures/loginDataPositive.json');


describe('create gradebook tests', ()=> {
    beforeEach('log into the app', () => {
        //cy.loginViaBackend("mg@gmail.com", "Chandler1805");
        cy.visit('/gradebook/create');
        cy.intercept(
            "POST",
            "https://gradebook-api.vivifyideas.com/api/gradebooks/store",
            ()=>{}
        ).as("createdGradebook");
    })

    createGradebookPositive.forEach((element)=>{
        it( element.name , () => {
            cy.visit("/gradebook/create");
            createGradebook.createGradebook(element, idProfessor);
            cy.wait('@createdGradebook').then((interception)=>{
                expect(interception.response.statusCode).eq(200);
            })
        })
    });
})
