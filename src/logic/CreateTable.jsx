// app/logic/CreateTable.jsx

export function generateCreateTableSQL({ tableName, tableComment, rows }) {
  if (!tableName.trim()) {
    return { error: 'テーブル名を入力してください。' };
  }

  const hasInvalid = rows.some((row) => !row.name || !row.type);
  if (hasInvalid) {
    return { error: 'すべての行で「カラム名」と「データ型」を入力してください。' };
  }

  const columnDefs = rows.map((row) => {
    let typeDef = row.type;
    if (row.type === 'VARCHAR' && row.length) {
      typeDef += `(${row.length})`;
    }

    const constraints = [];
    if (row.notnull) constraints.push('NOT NULL');

    return `  ${row.name} ${typeDef} ${constraints.join(' ')}`.trim();
  });

  const primaryKeys = rows.filter((r) => r.pk).map((r) => r.name);
  if (primaryKeys.length > 0) {
    columnDefs.push(`  PRIMARY KEY (${primaryKeys.join(', ')})`);
  }

  const foreignKeys = rows
  .filter(r => r.fk && r.refTable && r.refColumn)
  .map(r =>
    `  FOREIGN KEY (${r.name}) REFERENCES ${r.refTable}(${r.refColumn})`
  );
  columnDefs.push(...foreignKeys);


  const uniqueKeys = rows.filter(r => r.unique && !r.pk).map(r => r.name);
    uniqueKeys.forEach(name => {
    columnDefs.push(`  UNIQUE KEY (${name})`);
});

  const indexes = rows.filter((r) => r.index && !r.pk).map((r) => `  INDEX (${r.name})`);
  columnDefs.push(...indexes);

  let sql = `CREATE TABLE ${tableName} (\n${columnDefs.join(',\n')}\n)`;
  if (tableComment) {
    sql += ` COMMENT='${tableComment}'`;
  }
  sql += ';';

  return { sql };
}
