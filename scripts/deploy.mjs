// Качва готовия dist/ в клона gh-pages на github.com/sefo3477/nextype-site, откъдето GitHub Pages го сервира на nextype.bg.
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const run = (cmd, cwd = 'dist') => execSync(cmd, { cwd, stdio: 'inherit' });
writeFileSync('dist/CNAME', 'nextype.bg\n');
writeFileSync('dist/.nojekyll', '');
run('git init -q -b gh-pages');
run('git add -A');
run('git -c user.name="Nextype" -c user.email="info@nextype.bg" commit -qm "Deploy nextype.bg"');
run('git push -f https://github.com/sefo3477/nextype-site.git gh-pages');
console.log('Качено в gh-pages.');
