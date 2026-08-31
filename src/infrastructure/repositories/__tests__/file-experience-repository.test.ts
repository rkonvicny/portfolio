import { describe, it, expect, vi, beforeEach } from "vitest";
import { FileExperienceRepository } from "../FileExperienceRepository";
import { FileReader } from "../../data/FileReader";

vi.mock("../../data/FileReader");

describe("FileExperienceRepository", () => {
	let repository: FileExperienceRepository;

	beforeEach(() => {
		repository = new FileExperienceRepository();
		vi.resetAllMocks();
	});

	it("should return all experience items", async () => {
		const mockData = {
			experience: [{ id: "1", title: "Test Exp" }]
		};
		vi.mocked(FileReader.readJson).mockReturnValue(mockData);

		const result = await repository.getAllExperience();

		expect(result).toHaveLength(1);
		expect(result[0].id).toBe("1");
	});
});
