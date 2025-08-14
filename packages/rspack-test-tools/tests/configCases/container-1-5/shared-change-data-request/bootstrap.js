import shared from "shared";

export function test(it) {
	it("should have correct value for remote module", () => {
		expect(shared).toBe("my-shared");
	});
}
