export default class RegisterPage {

    get registerPageButton(){
        return cy.get('button[type="submit"]');
    }

    get title(){
        return cy.get('h4');
    }

    get errorMessage(){
        return cy.get('div[class="alert alert-danger"]');
    }

    getInputField(id){
        return cy.get(`#${id}`);
    }

    register(element, randomEmail){
        element.firstName
            ?this.getInputField('first_name').type(element.firstName)
            :this.getInputField('first_name').clear();
            this.getInputField('last_name').type(element.lastName);
            this.getInputField('email').type(randomEmail);
            this.getInputField('password').type(element.password);
            this.getInputField('password_confirmation').type(element.passwordConfirmation);
            element.terms
                ?this.getInputField('terms_conditions').check({force:true})
                :this.getInputField('terms_conditions').uncheck();
            this.registerPageButton.click();
    }
}
export const registerPage = new RegisterPage();