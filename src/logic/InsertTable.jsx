export const generateInsertSQL = ({ tableName, rows }) => {
  if (!tableName) {
    return { error: 'テーブル名を入力してください。' };
  }

  if (rows.length === 0 || rows.some(r => !r.column || r.value === '')) {
    return { error: '全てのカラム名と値を入力してください。' };
  }

  const columns = rows.map(r => r.column).join(', ');
  const values = rows.map(r => `'${r.value.replace(/'/g, "''")}'`).join(', ');
  const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;

  return { sql };
};
