import { describe, it, expect, vi, beforeEach } from "vitest";
import { FileProjectRepository } from "../FileProjectRepository";
import { FileReader } from "../../data/FileReader";

vi.mock("../../data/FileReader");

describe("FileProjectRepository", () => {
	let repository: FileProjectRepository;

	beforeEach(() => {
		repository = new FileProjectRepository();
		vi.resetAllMocks();
	});

	it("should return all projects", async () => {
		const mockData = {
			projects: [{ id: "1", title: "Test Project" }]
		};
		vi.mocked(FileReader.readJson).mockReturnValue(mockData);

		const result = await repository.getAllProjects();

		expect(result).toHaveLength(1);
		expect(result[0].id).toBe("1");
	});
});
