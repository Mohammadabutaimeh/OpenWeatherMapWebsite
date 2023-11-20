/// <reference types= "cypress" />


Cypress.on('uncaught:exception', (err, runnable) => {

    return false;
});

describe('Test OpenWeatherMap Website', () => {
    // 1 + 2 + 3
    it('Search for Weather by City', () => {
        // Visit the OpenWeatherMap Website:
        cy.visit("https://openweathermap.org/");
        cy.wait(3000)
        //   Search for Weather by City:
        cy.get('.search-container > input').type("London{enter}");
        cy.get('.search-dropdown-menu').should('be.visible');
        cy.get('.search-dropdown-menu > :nth-child(1)').click();
        //   Verify Weather Display:
        cy.get('#weather-widget > .section-content').should('be.visible');
        cy.get('.heading').should('be.visible');
        cy.get('.current-container > :nth-child(1) > h2').should('be.visible');
        cy.get(':nth-child(2) > .bold').should('be.visible');
    });

    // 4 + 5
    it('Select City from Map', () => {
        // Select City from Map:
        cy.visit("https://openweathermap.org/");
        cy.wait(3000)
        cy.visit("https://openweathermap.org/weathermap?basemap=map&cities=true&layer=radar&lat=31.9868&lon=35.9293&zoom=6");
        cy.get('.city-name').contains("Amman").click();
        // Verify Weather Display for Map Selection:
        cy.get('.city-full-info').should('be.visible');
        cy.get('.expanded .city-full-info .city-param-name').contains("country").should('be.visible');
        cy.get('.expanded .city-full-info .city-param-name').contains("temp").should('be.visible');
        cy.get('.expanded .city-full-info .city-param-name').contains("clouds").should('be.visible');
        cy.get('.expanded .city-full-info .city-param-name').contains("humidity").should('be.visible');
        cy.get('.expanded .city-full-info .city-param-name').contains("pressure").should('be.visible');
    });
    // 6 + 7
    it('Navigate to Weather Map Section:', () => {
        // Navigate to Weather Map Section:
        cy.visit("https://openweathermap.org/");
        cy.wait(3000)
        cy.get('#hamburger > img').click();
        cy.get('#mobile-menu > :nth-child(7) > a').click();
        // Verify Weather Map Display:
        cy.get('.global-map').should('be.visible');
    });
    // 8
    it('Switch Temperature Units from Metric: °C, m/s To Imperial: °F, mph', () => {
        // Switch Temperature Units from Metric: °C, m/s To Imperial: °F, mph
        cy.visit("https://openweathermap.org/");
        cy.wait(3000)
        cy.get('.switch-container > :nth-child(3)').click();
        cy.get('.current-temp').should('include.text', 'F');
    });
    // 9
    it('Explore Additional Features:', () => {
        // Navigate to Blog section 
        cy.viewport(1200, 800);
        cy.visit("https://openweather.co.uk/blog/category/weather");
        cy.get('#blog-categories').should('be.visible');

    });

    // 10
    it('Responsive Design Test', () => {
        // Responsive Design Test:
        cy.visit("https://openweathermap.org/");
        cy.wait(3000)
        cy.viewport(1200, 800);
        cy.get('#desktop-menu').should('be.visible');
        cy.get('#hamburger').should('not.be.visible');
        cy.wait(3000)
        cy.viewport(800, 600);
        cy.get('#desktop-menu').should('not.be.visible');
        cy.get('#hamburger').should('be.visible');
    });
})