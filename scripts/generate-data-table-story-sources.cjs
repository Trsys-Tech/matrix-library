const ts = require(process.cwd() + '/node_modules/typescript');
const fs = require('fs');
const path = 'src/components/data-table/DataTable.stories.tsx';
let text = fs.readFileSync(path, 'utf8');
const sf = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const defs = new Map();
const stories = [];
for (const s of sf.statements) {
  if (ts.isFunctionDeclaration(s) && s.name) defs.set(s.name.text, s);
  if (ts.isTypeAliasDeclaration(s) && s.name.text !== 'Story') defs.set(s.name.text, s);
  if (ts.isVariableStatement(s)) for (const d of s.declarationList.declarations) if (ts.isIdentifier(d.name)) {
    if (s.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword) && d.type?.getText(sf) === 'Story') stories.push([d.name.text,d]);
    else if (d.name.text !== 'meta') defs.set(d.name.text, s);
  }
}
const identifiers = node => { const found = new Set(); function visit(n) { if (ts.isIdentifier(n)) found.add(n.text); ts.forEachChild(n,visit); } visit(node); return found; };
const imports = sf.statements.filter(s => ts.isImportDeclaration(s) && !s.moduleSpecifier.text.startsWith('@storybook') && s.moduleSpecifier.text !== 'storybook/test' && s.moduleSpecifier.text !== './dataTableStorySources.json').map(s => s.getText(sf)).join('\n');
const snippets = {};
for (const [name,d] of stories) {
 const render = d.initializer.properties.find(p => p.name?.getText(sf) === 'render');
 const used = new Set();
 function collect(node) { for (const id of identifiers(node)) if (defs.has(id) && !used.has(id)) { used.add(id); collect(defs.get(id)); } }
 collect(render.initializer);
 const declarations = [...new Set([...used].map(id => defs.get(id)))].sort((a,b)=>a.pos-b.pos).map(n=>n.getText(sf)).join('\n\n');
 snippets[name] = imports + '\n\n' + declarations + '\n\nexport const Example = ' + render.initializer.getText(sf) + ';';
}
fs.writeFileSync('src/components/data-table/dataTableStorySources.json', JSON.stringify(snippets,null,2)+'\n');
