///<reference types="Cypress" />

import {registerPage} from './../page_objects/registerPage';
const userDataRegisterPositive =require('../fixtures/registerDataPositive.json');
var faker = require("faker");
var randomEmail = faker.internet.email();

describe('register tests', () => {
    beforeEach(() => {
      cy.visit('/register')
  
      cy.intercept(
        'POST',
        'https://gradebook-api.vivifyideas.com/api/register',
      ).as('registration')
  
    })
  
    userDataRegisterPositive.forEach((element)=>{
        it(element.name , () => {
            registerPage.register(element, randomEmail);
            cy.wait('@registration').then((interception)=>{
                expect(interception.response.statusCode).eq(201);
                let idUser = interception.response.body.user.id;
                console.log(idUser);
            })
            cy.url().should('contains', 'https://gradebook.vivifyideas.com/gradebooks');
        })
    });
  })