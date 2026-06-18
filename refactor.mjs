import fs from 'fs';
import path from 'path';

const fileMoves = [
  { old: 'src/domain/contact/ContactMessage.ts', new: 'src/domain/entities/ContactMessage.ts', newImport: '@domain/entities/ContactMessage' },
  { old: 'src/domain/experience/ExperienceItem.ts', new: 'src/domain/entities/ExperienceItem.ts', newImport: '@domain/entities/ExperienceItem' },
  { old: 'src/domain/projects/Project.ts', new: 'src/domain/entities/Project.ts', newImport: '@domain/entities/Project' },
  { old: 'src/domain/skills/SkillCategory.ts', new: 'src/domain/entities/SkillCategory.ts', newImport: '@domain/entities/SkillCategory' },
  
  { old: 'src/application/experience/ports/IExperienceRepository.ts', new: 'src/domain/repositories/IExperienceRepository.ts', newImport: '@domain/repositories/IExperienceRepository' },
  { old: 'src/application/projects/ports/IProjectRepository.ts', new: 'src/domain/repositories/IProjectRepository.ts', newImport: '@domain/repositories/IProjectRepository' },
  { old: 'src/application/skills/ports/ISkillRepository.ts', new: 'src/domain/repositories/ISkillRepository.ts', newImport: '@domain/repositories/ISkillRepository' },
  
  { old: 'src/application/contact/ports/IEmailService.ts', new: 'src/application/ports/IEmailService.ts', newImport: '@application/ports/IEmailService' },
  
  { old: 'src/application/contact/SubmitContactFormUseCase.ts', new: 'src/application/use-cases/SubmitContactFormUseCase.ts', newImport: '@application/use-cases/SubmitContactFormUseCase' },
  { old: 'src/application/experience/GetExperienceUseCase.ts', new: 'src/application/use-cases/GetExperienceUseCase.ts', newImport: '@application/use-cases/GetExperienceUseCase' },
  { old: 'src/application/projects/GetProjectsUseCase.ts', new: 'src/application/use-cases/GetProjectsUseCase.ts', newImport: '@application/use-cases/GetProjectsUseCase' },
  { old: 'src/application/skills/GetSkillsUseCase.ts', new: 'src/application/use-cases/GetSkillsUseCase.ts', newImport: '@application/use-cases/GetSkillsUseCase' },
  
  { old: 'src/infrastructure/contact/MockEmailService.ts', new: 'src/infrastructure/services/MockEmailService.ts', newImport: '@infrastructure/services/MockEmailService' },
  { old: 'src/infrastructure/experience/InMemoryExperienceRepository.ts', new: 'src/infrastructure/repositories/InMemoryExperienceRepository.ts', newImport: '@infrastructure/repositories/InMemoryExperienceRepository' },
  { old: 'src/infrastructure/projects/InMemoryProjectRepository.ts', new: 'src/infrastructure/repositories/InMemoryProjectRepository.ts', newImport: '@infrastructure/repositories/InMemoryProjectRepository' },
  { old: 'src/infrastructure/skills/InMemorySkillRepository.ts', new: 'src/infrastructure/repositories/InMemorySkillRepository.ts', newImport: '@infrastructure/repositories/InMemorySkillRepository' },
];

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 1. Move files
fileMoves.forEach(move => {
  if (fs.existsSync(move.old)) {
    ensureDir(move.new);
    fs.renameSync(move.old, move.new);
    console.log(`Moved ${move.old} -> ${move.new}`);
  }
});

// Helper: recursively get all TS/TSX files
function getFiles(dir, filesList = []) {
  if (!fs.existsSync(dir)) return filesList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, filesList);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      filesList.push(fullPath);
    }
  }
  return filesList;
}

const allFiles = getFiles('src');

// Generate regexes for each file move
// A regex to match any import path that resolves to the moved file.
// We just replace any import that ends with the old file's basename or contains its path.
// Actually, it's safer to just replace any string that looks like the old file path.
// Let's do a smart regex replacement:
// If file imports "ContactMessage" from anywhere, replace the FROM path with the new alias.

fileMoves.forEach(move => {
  const baseName = path.basename(move.old, '.ts'); // e.g. "ContactMessage"
  const regex = new RegExp(`(import\\s+.*?\\s+from\\s+['"])(.*?${baseName})(['"])`, 'g');
  
  allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content.replace(regex, `$1${move.newImport}$3`);
    if (content !== newContent) {
      fs.writeFileSync(file, newContent);
      console.log(`Updated imports in ${file} for ${baseName}`);
    }
  });
});

