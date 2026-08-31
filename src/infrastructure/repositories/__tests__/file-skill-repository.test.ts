import { describe, it, expect, vi, beforeEach } from "vitest";
import { FileSkillRepository } from "../FileSkillRepository";
import { FileReader } from "../../data/FileReader";

vi.mock("../../data/FileReader");

describe("FileSkillRepository", () => {
	let repository: FileSkillRepository;

	beforeEach(() => {
		repository = new FileSkillRepository();
		vi.resetAllMocks();
	});

	it("should return all skills", async () => {
		const mockData = {
			skills: [{ id: "1", title: "Test Skill" }]
		};
		vi.mocked(FileReader.readJson).mockReturnValue(mockData);

		const result = await repository.getAllSkills();

		expect(result).toHaveLength(1);
		expect(result[0].id).toBe("1");
	});
});
