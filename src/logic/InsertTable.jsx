export function generateInsertSQL({ tableName, rows }) {
  if (!tableName.trim()) {
    return { error: 'テーブル名を入力してください。' };
  }

  if (!Array.isArray(rows) || rows.length === 0) {
    return { error: '少なくとも1行のデータを入力してください。' };
  }

  
  const firstRow = rows[0];
  if (!firstRow.values || Object.keys(firstRow.values).length === 0) {
    return { error: 'カラム情報が見つかりません。' };
  }

  const columns = Object.keys(firstRow.values);

  const valuesList = rows.map((row) => {
    const vals = columns.map((col) => {
      const val = row.values[col];
      if (val === null || val === undefined || val === '') {
        return 'NULL';
      }
      return `'${String(val).replace(/'/g, "''")}'`;
    });
    return `(${vals.join(', ')})`;
  });

  const sql = `INSERT INTO ${tableName} (${columns.join(', ')})\nVALUES\n${valuesList.join(',\n')};`;

  return { sql };
}
