import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import mainPage from "../page_object/mainpage";

const TABLE_SIZE = 'tableSize';
const page = new mainPage();

When(/^I go to the main page$/, () => {
    cy.visit("");
});

Then(/^The title (.*) is displayed$/, (title: string) => {
    page.elements.title().should('have.text', title);
});
Then(/^The (\S+) form is displayed$/, function (formName: string) {
    page.elements.addForm().first().should('have.text', formName)
});

Then(/^(\S+) text field is displayed$/, function (label: string) {
    page.elements.labels().should('contain.text', label);
});

Then(/^(.*) has the proper input field naming$/, function (label: string) {
    page.elements.inputFieldNaming(label).should('exist');
});

Given(/^Add form is not filled$/, function () {
    page.elements.inputField().should('be.empty');
});

When(/^I click on Add button$/, function () {
    page.elements.viewBoardItems().then((tableSize: any) => {
        cy.setCookie(TABLE_SIZE, tableSize.length.toString());
    })
    page.elements.addButton().click();

});

Then(/^nothing happens$/, function () {
    cy.getCookie(TABLE_SIZE).then((tableSize) => {
        page.elements.viewBoardItems().then((a: any) => {
            expect(parseInt(tableSize.value)).to.be.equal(a.length);
        })
    })
});

When(/^I fill the Add form with (.*), (.*),(.*)$/, function (breed: string, nick: string, price: number) {
    page.elements.inputFieldNaming('breed').type(breed);
    page.elements.inputFieldNaming('nick').type(nick);
    page.elements.inputFieldNaming('price').type(price.toString());
});

Then(/^new dog has been added and the values\((.*), (.*),(.*)\) are displayed$/, function (breed: string, nick: string, price: number) {
    page.elements.viewBoardItems().last().should('contain', breed).should('contain', nick).should('contain', price);
    cy.getCookie(TABLE_SIZE).then((tableSize) => {
        page.elements.viewBoardItems().then((a: any) => {
            expect(parseInt(tableSize.value)).to.be.lessThan(a.length);
        })
    })
});

When(/^I click Delete button$/, function () {
    page.elements.viewBoardItems().then((tableSize: any) => {
        cy.setCookie(TABLE_SIZE, tableSize.length.toString());
    })
    page.elements.deleteButton().last().click();
});

Then(/^dog has been removed$/, function () {
    cy.getCookie(TABLE_SIZE).then((tableSize) => {
        page.elements.viewBoardItems().then((a: any) => {
            expect(parseInt(tableSize.value)).to.be.greaterThan(a.length);
        })
    })
});

When(/^I click on edit button$/, function () {
    page.elements.editButton().last().click();
});

Then(/^The values can be edited$/, function () {

    page.elements.viewBoardItems().last().find('td').then((last: any) => {
        let breedName = last.get(0).innerText;
        let nickName = last.get(1).innerText;
        let price = last.get(2).innerText;

        page.elements.inputFieldNaming('breed').should('have.value', breedName);
        page.elements.inputFieldNaming('nick').should('have.value', nickName);
        page.elements.inputFieldNaming('price').should('have.value', price);
    });
});

When(/^I check all the image urls$/, function () {
    cy.get('img').each((image: any) => {
        cy.wrap(image).should('have.attr', 'src')
    })

});
Then(/^all images are reachable$/, function () {
    cy.get('img').each((image: any) => {
        cy.wrap(image).invoke('attr', 'src').then((src) => {
            cy.request(src)
                .its('status')
                .should('eq', 200);
        })
    });
});