export default class LoginPage {

    get loginPageButton(){
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

    login(element){
        element.email
            ?this.getInputField('email').type(element.email)
            :this.getInputField('email').clear();
        element.password
            ?this.getInputField('userPassword').type(element.password)
            :this.getInputField('userPassword').clear();
        this.loginPageButton.click();
    }
}
export const loginPage = new LoginPage();

