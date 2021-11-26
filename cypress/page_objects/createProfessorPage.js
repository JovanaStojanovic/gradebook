export default class CreateProfessorPage {

    get imageUrl(){
        return cy.get('input[type="text"]').eq(2);
    }
    getInputField(id){
        return cy.get(`#${id}`);
    }

    getButton(name){
        return cy.get('button').contains(name);
    }

    createProfessorUI(element){
        element.firstName
            ?this.getInputField('input-default').type(element.firstName)
            :this.getInputField('input-default').clear();
        this.getInputField('input-default1').type(element.lastName);
        this.getButton('Add Image').click();
        this.imageUrl.type(element.image);
        this.getButton('Submit').click();
    }
}
export const createProfessorPage = new CreateProfessorPage();