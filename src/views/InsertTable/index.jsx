import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Paper, IconButton,
  Table, TableHead, TableBody, TableCell, TableRow, TableContainer
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { generateInsertSQL } from '../../logic/InsertTable';
import CopyButton from '../../components/Button/button';

const InsertTable = () => {
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState(['']); // 初期1列
  const [rows, setRows] = useState([{ id: 1, values: {} }]);
  const [insertSQL, setInsertSQL] = useState('');

  // カラム名変更
  const handleColumnChange = (index, value) => {
    const updated = [...columns];
    updated[index] = value;
    setColumns(updated);
  };

  // カラム追加
  const addColumn = () => {
    setColumns([...columns, '']);
  };

  // カラム削除
  const deleteColumn = (index) => {
    const updated = [...columns];
    const removed = updated.splice(index, 1);
    setColumns(updated);

    setRows(rows.map(row => {
      const newValues = { ...row.values };
      delete newValues[removed[0]];
      return { ...row, values: newValues };
    }));
  };

  // セル値変更
  const handleCellChange = (rowId, column, value) => {
    setRows(prev =>
      prev.map(row =>
        row.id === rowId
          ? { ...row, values: { ...row.values, [column]: value } }
          : row
      )
    );
  };

  // 行追加
  const addRow = () => {
    const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
    setRows([...rows, { id: newId, values: {} }]);
  };

  // 行削除
  const deleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  // SQL生成
  const handleGenerate = () => {
    const result = generateInsertSQL({ tableName, columns, rows });
    if (result.error) {
      alert(result.error);
    } else {
      setInsertSQL(result.sql);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>INSERT文作成</Typography>

      <TextField
        label="テーブル名"
        fullWidth
        sx={{ mb: 2 }}
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col, i) => (
                <TableCell key={i}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      variant="standard"
                      value={col}
                      onChange={(e) => handleColumnChange(i, e.target.value)}
                      placeholder={`カラム${i + 1}`}
                      fullWidth
                    />
                    <IconButton onClick={() => deleteColumn(i)} size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              ))}
              <TableCell>
                <Button onClick={addColumn}>列を追加</Button>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                {columns.map((col, i) => (
                  <TableCell key={i}>
                    <TextField
                      variant="standard"
                      value={row.values[col] || ''}
                      onChange={(e) => handleCellChange(row.id, col, e.target.value)}
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={() => deleteRow(row.id)} disabled={rows.length === 1}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={addRow}>
          行を追加
        </Button>
        <Button variant="contained" onClick={handleGenerate}>
          INSERT文を生成
        </Button>
      </Box>

      {insertSQL && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">生成されたSQL</Typography>
          <Paper variant="outlined" sx={{ p: 2, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
            {insertSQL}
          </Paper>
          <Box sx={{ mt: 2 }}>
            <CopyButton textToCopy={insertSQL} disabled={!insertSQL} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default InsertTable;