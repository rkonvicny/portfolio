import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Projects } from "../projects";
import { Project } from "@/domain/entities/project";
import userEvent from "@testing-library/user-event";

vi.mock("@/data/app-settings", () => ({
	appSettings: {
		pageSettings: {
			enableExtendedSectionHeader: true
		},
		heroBackground: {}
	}
}));

vi.mock("@/data/portfolio.json", () => ({
	default: {}
}));

const mockProjects: Project[] = [
	{
		id: "1",
		title: "Project 1",
		shortDesc: "Description 1",
		fullDesc: "Long description 1",
		image: "/project1.jpg",
		tags: ["React"],
		features: ["Feature 1", "Feature 2"],
		githubUrl: "https://github.com/project1",
		liveUrl: "https://project1.com",
		category: "frontend"
	},
	{
		id: "2",
		title: "Project 2",
		shortDesc: "Description 2",
		fullDesc: "Long description 2",
		image: "/project2.jpg",
		tags: ["Node"],
		features: ["Feature 3"],
		githubUrl: "https://github.com/project2",
		liveUrl: "",
		category: "backend"
	}
];

describe("Projects Component", () => {
	it("renders section header", () => {
		render(<Projects projects={mockProjects} />);
		expect(screen.getByText("Vybrané projekty")).toBeInTheDocument();
	});

	it("renders projects correctly", () => {
		render(<Projects projects={mockProjects} />);

		expect(screen.getByText("Project 1")).toBeInTheDocument();
		expect(screen.getByText("Project 2")).toBeInTheDocument();
	});

	it("filters projects", async () => {
		const user = userEvent.setup();
		render(<Projects projects={mockProjects} />);

		// Initially both are visible
		expect(screen.getByText("Project 1")).toBeInTheDocument();
		expect(screen.getByText("Project 2")).toBeInTheDocument();

		// Click Frontend filter
		const frontendBtn = screen.getByRole("button", { name: /frontend/i });
		await user.click(frontendBtn);

		expect(screen.getByText("Project 1")).toBeInTheDocument();
		expect(screen.queryByText("Project 2")).not.toBeInTheDocument();

		// Click Backend filter
		const backendBtn = screen.getByRole("button", { name: /backend/i });
		await user.click(backendBtn);

		expect(screen.queryByText("Project 1")).not.toBeInTheDocument();
		expect(screen.getByText("Project 2")).toBeInTheDocument();
	});

	it("opens project modal on click", async () => {
		const user = userEvent.setup();
		render(<Projects projects={mockProjects} />);

		// Click on Project 1
		const project1 = screen.getByText("Project 1");
		await user.click(project1);

		// Use waitFor as there might be a re-render/animation
		await waitFor(() => {
			expect(screen.getByText("Long description 1")).toBeInTheDocument();
		});
		expect(screen.getByText("Feature 1")).toBeInTheDocument();
	});
});
