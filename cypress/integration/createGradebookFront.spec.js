///<reference types="Cypress" />

import {loginPage} from './../page_objects/loginPage';
import { createGradebook } from '../page_objects/createGradebook';
const createGradebookUIPositive =require('../fixtures/createGradebookPositive.json');
const prof= require('../fixtures/professors.json');

describe('create gradebook via front tests', ()=> {
    beforeEach('log into the app', () => {
        cy.visit("/login");
        loginPage.login({"email" : "mg@gmail.com", "password" : "Chandler1805"});
        cy.intercept(
            'POST',
            'https://gradebook-api.vivifyideas.com/api/login'
        ).as('loginUser');
        cy.wait('@loginUser').then((interception)=>{
            expect(interception.response.statusCode).eq(200);
        })
        cy.visit('/gradebook/create');
        cy.intercept(
            "POST",
            "https://gradebook-api.vivifyideas.com/api/gradebooks/store",
            ()=>{}
        ).as("createdGradebook");
    })

        createGradebookUIPositive.forEach((element)=>{
            it( element.name , () => {
                createGradebook.createGradebook(element, `${prof.id}`);
                cy.wait('@createdGradebook').then((interception)=>{
                    expect(interception.response.statusCode).eq(201);
                })
                cy.url().should('contains', '/gradebooks');
            })
        });
    })