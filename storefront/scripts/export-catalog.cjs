// Export src/data/products.ts as JSON (used by the Printify and Medusa sync scripts).
// Usage: node scripts/export-catalog.cjs > catalog.json
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const file = path.join(__dirname, '..', 'src', 'data', 'products.ts');
const out = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
const m = { exports: {} };
new Function('module', 'exports', 'require', out.outputText)(m, m.exports, require);
process.stdout.write(JSON.stringify(m.exports.products, null, 2));
