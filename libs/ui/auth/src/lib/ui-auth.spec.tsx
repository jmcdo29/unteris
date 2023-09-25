import { render } from "@testing-library/react";

import UiAuth from "./ui-auth";

describe("UiAuth", () => {
	it("should render successfully", () => {
		const { baseElement } = render(<UiAuth />);
		expect(baseElement).toBeTruthy();
	});
});
