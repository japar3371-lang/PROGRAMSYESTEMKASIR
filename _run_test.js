const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const input = fs.readFileSync(path.join(dir, '_test_input.txt'), 'utf8');
try {
  const result = execSync(`npx tsx "${path.join(dir, 'kasir-kantin.ts')}"`, {
    input: input,
    cwd: dir,
    timeout: 15000,
    encoding: 'utf8'
  });
  console.log(result);
} catch (e) {
  console.log(e.stdout || e.message);
}
