describe("Game Testing", function () {
    describe("Button Effect", function () {
        it("should return false", function () {
            expect(buttonEffect(10)).toBe(false);
        });


    });

    describe("Power Checkbox Test", function () {
        var btnOn = document.getElementById("on");
        it("should show false", function () {
            expect(btnOn.checked).toBe(false);
        });
    });


});