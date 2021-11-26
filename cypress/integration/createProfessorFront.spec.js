///<reference types="Cypress" />

import {loginPage} from './../page_objects/loginPage';
import {createProfessorPage} from './../page_objects/createProfessorPage';
const createProfessorUIPositive =require('../fixtures/createProfessorUIPositive.json');


describe('create professor via front tests', ()=> {
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
        cy.visit('/professors/create');
        cy.intercept(
            "POST",
            "https://gradebook-api.vivifyideas.com/api/professors/create",
            ()=>{}
        ).as("createdProfessor");
        
        cy.intercept(
            "GET",
            "https://gradebook-api.vivifyideas.com/api/professors",
            ()=>{}
        ).as("getProfessor");
        
    }) 

        createProfessorUIPositive.forEach((element)=>{
            it( element.name , () => {
                createProfessorPage.createProfessorUI(element);
                cy.wait('@createdProfessor').then((interception)=>{
                    expect(interception.response.statusCode).eq(200);
                })
                cy.wait('@getProfessor').then((interception)=>{
                    expect(interception.response.statusCode).eq(200);
                    const listProfessor= interception.response.body;
                    const lastProfessorObject= listProfessor.pop();
                    const professorId= lastProfessorObject.id;
                    console.log(professorId);
                    cy.writeFile('cypress/fixtures/professors.json', {"id" : professorId});
                })
                cy.url().should('contains', '/professors');
            })
        });
    })
