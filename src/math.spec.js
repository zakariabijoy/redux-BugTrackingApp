import { isEven } from './math';


describe("isEven", () => {
    it("should return true if given number is an even number", () => {
        // function under test (SUT)
        const result = isEven(2);

        expect(result).toEqual(true);
    });

    it("should return false if given number is an odd number", () => {
        // function under test (SUT)
        const result = isEven(1);

        expect(result).toEqual(false);
    });

});
