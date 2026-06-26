import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SectionHeader } from "../section-header";

vi.mock("@/data/app-settings", () => ({
	appSettings: {
		pageSettings: {
			enableExtendedSectionHeader: true
		},
		heroBackground: {}
	}
}));

describe("SectionHeader", () => {
	it("renders subtitle correctly", () => {
		render(<SectionHeader title="O mně" subtitle="KDO JSEM" />);
		expect(screen.getByText("KDO JSEM")).toBeInTheDocument();
	});

	it("renders title when enableExtendedSectionHeader is true", () => {
		render(<SectionHeader title="O mně" subtitle="KDO JSEM" />);
		expect(screen.getByText("O mně")).toBeInTheDocument();
	});
});
