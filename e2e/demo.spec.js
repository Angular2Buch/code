describe('Protractor Demo Spec', function() {

    it('should have a title', function() {
        browser.get('http://johanneshoppe.github.io/Presentations2015/Tests-Karma-Protractor/examples/angular_calc/');

        expect(browser.getTitle()).toEqual('AngularJS Calculator');

    });
});
