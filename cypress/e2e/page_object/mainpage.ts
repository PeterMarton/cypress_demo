class mainPage {
    store: string;

    elements = {
        title: () => cy.get("h1"),
        addForm: () => cy.get("h1"),
        labels: () => cy.get("label"),
        inputFieldNaming: (fieldName) => cy.get('[name="' + fieldName.toLowerCase() + '"]'),
        inputField: () => cy.get('input'),
        viewBoardItems: () => cy.get('tbody tr'),
        addButton: () => cy.get('form button'),
        deleteButton: () => cy.get('td button:nth-child(2)'),
        editButton: () => cy.get('td button:nth-child(1)')
    }

    valueCheck(temp: string) {
        this.store = temp;
    }

    getValue = () => this.store;

}

export default mainPage;