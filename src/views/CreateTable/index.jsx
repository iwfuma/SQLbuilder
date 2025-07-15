// app/views/CreateTable/index.jsx

import React, { useState } from 'react';
import {
  Box, Button, Typography, TextField, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Paper, Select, MenuItem, Checkbox, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { generateCreateTableSQL } from '../../logic/CreateTable';
import CopyButton from '../../components/Button/button';


const DATA_TYPES = ['INT', 'VARCHAR', 'TEXT', 'DATE', 'DATETIME', 'BOOLEAN', 'FLOAT'];

const CreateTable = () => {
  const [tableName, setTableName] = useState('');
  const [tableComment, setTableComment] = useState('');
  const [rows, setRows] = useState([
    { id: 1, name: '', type: '', length: '', notnull: false, pk: false, fk: false, index: false },
  ]);
  const [createSQL, setCreateSQL] = useState('');

  const handleChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleAddRow = () => {
    const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    setRows([
      ...rows,
      { id: newId, name: '', type: '', length: '', notnull: false, pk: false, fk: false, unique: false ,index: false },
    ]);
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const generateSQL = () => {
    const result = generateCreateTableSQL({ tableName, tableComment, rows });

    if (result.error) {
      alert(result.error);
    } else {
      setCreateSQL(result.sql);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>テーブル定義</Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="テーブル名"
          fullWidth
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          placeholder="例: users"
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="説明（コメント）"
          fullWidth
          multiline
          rows={2}
          value={tableComment}
          onChange={(e) => setTableComment(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>カラム名</TableCell>
              <TableCell>データ型</TableCell>
              <TableCell>長さ</TableCell>
              <TableCell>NOT NULL</TableCell>
              <TableCell>PK</TableCell>
              <TableCell>FK</TableCell>
              <TableCell>Unique</TableCell>
              <TableCell>Index</TableCell>
              <TableCell>削除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <TextField
                    variant="standard"
                    value={row.name}
                    onChange={(e) => handleChange(row.id, 'name', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    variant="standard"
                    value={row.type}
                    onChange={(e) => handleChange(row.id, 'type', e.target.value)}
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>選択</em>
                    </MenuItem>
                    {DATA_TYPES.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    value={row.length}
                    onChange={(e) => handleChange(row.id, 'length', e.target.value)}
                    disabled={row.type !== 'VARCHAR'}
                    type="number"
                    inputProps={{ min: 1 }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={row.notnull}
                    onChange={(e) => handleChange(row.id, 'notnull', e.target.checked)}
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={row.pk}
                    onChange={(e) => handleChange(row.id, 'pk', e.target.checked)}
                  />
                </TableCell>
                <TableCell align="center">
                    <Checkbox
                        checked={row.fk}
                        onChange={(e) => handleChange(row.id, 'fk', e.target.checked)}
                    />
                </TableCell>
                <TableCell align="center">
                    <Checkbox
                        checked={row.unique}
                        onChange={(e) => handleChange(row.id, 'unique', e.target.checked)}
                        disabled={row.pk} // PKは自動でユニークだから無効化してもいいです
                    />
                </TableCell>
                <TableCell align="center">
                    <Checkbox
                        checked={row.index}
                        onChange={(e) => handleChange(row.id, 'index', e.target.checked)}
                        disabled={row.pk}
                    />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDeleteRow(row.id)}
                    disabled={rows.length === 1}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddRow}>
          行を追加
        </Button>
        <Button variant="contained" color="primary" onClick={generateSQL}>
          CREATE文を生成
        </Button>
      </Box>

      {createSQL && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">生成されたSQL</Typography>
          <Paper variant="outlined" sx={{ p: 2, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
            {createSQL}
          </Paper>
          <Box sx={{ mt: 2 }}>
            <CopyButton textToCopy={createSQL} disabled={!createSQL} />
          </Box>
        </Box>
      )}
    </Box>
    
  );
};

export default CreateTable;
