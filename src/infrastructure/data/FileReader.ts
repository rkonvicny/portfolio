import fs from "fs";
import path from "path";

export class FileReader {
	public static readJson<T>(fileName: string): T {
		const filePath = path.join(process.cwd(), "src", "data", fileName);
		const fileContent = fs.readFileSync(filePath, "utf-8");
		return JSON.parse(fileContent) as T;
	}
}
