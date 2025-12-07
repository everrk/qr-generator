import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

async function cleanDist() {
  await fs.rm(distDir, { recursive: true, force: true });
  await fs.mkdir(distDir, { recursive: true });
}

async function copyFile(source, destination) {
  const targetPath = path.join(distDir, destination);
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.copyFile(path.join(projectRoot, source), targetPath);
}

async function copyExtras() {
  const tasks = [
    copyFile('package.json', 'package.json'),
    copyFile('vite.config.js', 'vite.config.js'),
    copyFile('scripts/build.js', 'scripts/build.js'),
  ];

  await Promise.all(tasks);
}

async function copySrc() {
  const srcDir = path.join(projectRoot, 'src');
  const targetDir = path.join(distDir, 'src');
  await fs.mkdir(targetDir, { recursive: true });
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile()) {
      await fs.copyFile(path.join(srcDir, entry.name), path.join(targetDir, entry.name));
    }
  }
}

async function writeReadme() {
  const message = `
This project is prepared for offline evaluation.

The build step copies source assets into the dist/ folder without
fetching remote npm packages. Open dist/index.html in a modern browser
that supports ES modules to preview the marketing landing page and
AssetLibrary experience via the existing source files.

Use the bundled codebundle.zip inside dist/ to download the full source
package (entry HTML files, React sources, and the offline build script)
in one archive.
`;
  await fs.writeFile(path.join(distDir, 'README.txt'), message.trim() + '\n', 'utf8');
}

async function createDownloadBundle() {
  const archiveName = 'codebundle.zip';
  const entries = ['index.html', 'qr.html', 'src', 'package.json', 'vite.config.js', 'scripts', 'README.txt'];

  await new Promise((resolve, reject) => {
    exec(`zip -r ${archiveName} ${entries.join(' ')}`, { cwd: distDir }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || error.message));
        return;
      }
      console.log(stdout.trim());
      resolve();
    });
  });
}

async function main() {
  await cleanDist();
  await Promise.all([
    copyFile('index.html', 'index.html'),
    copyFile('qr.html', 'qr.html'),
    copyExtras(),
  ]);
  await copySrc();
  await writeReadme();
  await createDownloadBundle();
  console.log('✅ Offline build complete. Files copied to dist/ with codebundle.zip ready for download.');
}

main().catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});
