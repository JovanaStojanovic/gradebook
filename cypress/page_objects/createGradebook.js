export default class CreateGradebook {

    get title(){
        return cy.get('h1');
    }

    get gradebookName(){
        return cy.get('input[id="name"]');
    }

    get id(){
        return cy.get('select[class="mb-4 custom-select"]');
    }

    createGradebook(element, idProf){
        element.gradebookName
            ?this.gradebookName.type(element.gradebookName)
            :this.gradebookName.clear();
        this.id.select(`${idProf}`);
        cy.get('button').contains('Submit').click();
    }
}
export const createGradebook = new CreateGradebook();