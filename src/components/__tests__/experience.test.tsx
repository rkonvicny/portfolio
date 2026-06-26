import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Experience } from "../experience";
import { ExperienceItem } from "@/domain/entities/experience-item";

vi.mock("@/data/app-settings", () => ({
	appSettings: {
		pageSettings: {
			enableExtendedSectionHeader: true
		},
		heroBackground: {}
	}
}));

vi.mock("@/data/portfolio.json", () => ({
	default: {
		personal: {
			languages: ["Czech", "English"]
		}
	}
}));

const mockExperience: ExperienceItem[] = [
	{
		id: "1",
		role: "Software Engineer",
		company: "Tech Corp",
		period: "2020 - Present",
		description: ["Developed amazing things.", "Fixed bugs."],
		type: "work"
	},
	{
		id: "2",
		role: "Junior Developer",
		company: "Startup Inc",
		period: "2018 - 2020",
		description: ["Learned a lot."],
		type: "education"
	}
];

describe("Experience Component", () => {
	it("renders section header", () => {
		render(<Experience experience={mockExperience} />);
		expect(screen.getByText("Pracovní zkušenosti a vzdělání")).toBeInTheDocument();
	});

	it("renders experience items correctly", () => {
		render(<Experience experience={mockExperience} />);

		// Check for roles
		expect(screen.getByText("Software Engineer")).toBeInTheDocument();
		expect(screen.getByText("Junior Developer")).toBeInTheDocument();

		// Check for companies
		expect(screen.getByText("Tech Corp")).toBeInTheDocument();
		expect(screen.getByText("Startup Inc")).toBeInTheDocument();

		// Check for description
		expect(screen.getByText("Developed amazing things.")).toBeInTheDocument();
		expect(screen.getByText("Fixed bugs.")).toBeInTheDocument();
	});
});
