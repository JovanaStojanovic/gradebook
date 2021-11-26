///<reference types="Cypress" />

import {loginPage} from './../page_objects/loginPage';
const userDataLoginNegative =require('../fixtures/loginDataNegative.json');
const userDataLoginPositive =require('../fixtures/loginDataPositive.json');

describe("login tests", () => {
    beforeEach("visit login page", () => {
        cy.visit("/login");
        cy.intercept(
            'POST',
            'https://gradebook-api.vivifyideas.com/api/login'
        ).as('loginUser');
    });

    userDataLoginNegative.forEach((element)=>{
        it( element.name , () => {
            loginPage.login(element);
            loginPage.title.should('be.visible');
            cy.wait('@loginUser').then((interception)=>{
                expect(interception.response.statusCode).eq(401);
            })
            loginPage.errorMessage.should('have.text', element.errorMessage);
        })
    });

    userDataLoginPositive.forEach((element)=>{
        it( element.name , () => {
            loginPage.login(element);
            cy.wait('@loginUser').then((interception)=>{
                expect(interception.response.statusCode).eq(200);
            })
            cy.url().should('contains', 'https://gradebook.vivifyideas.com/gradebooks');
        })
    });
});