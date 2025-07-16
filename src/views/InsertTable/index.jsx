import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Paper, IconButton, Table, TableHead,
  TableBody, TableCell, TableRow, TableContainer
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { generateInsertSQL } from '../../logic/InsertTable';
import CopyButton from '../../components/Button/button';

const InsertTable = () => {
  const [tableName, setTableName] = useState('');
  const [rows, setRows] = useState([{ id: 1, column: '', value: '' }]);
  const [insertSQL, setInsertSQL] = useState('');

  const handleChange = (id, field, value) => {
    setRows(prev =>
      prev.map(row => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const addRow = () => {
    const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
    setRows([...rows, { id: newId, column: '', value: '' }]);
  };

  const deleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleGenerate = () => {
    const result = generateInsertSQL({ tableName, rows });

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
              <TableCell>カラム名</TableCell>
              <TableCell>値</TableCell>
              <TableCell>削除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <TextField
                    variant="standard"
                    value={row.column}
                    onChange={(e) => handleChange(row.id, 'column', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    value={row.value}
                    onChange={(e) => handleChange(row.id, 'value', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => deleteRow(row.id)}
                    disabled={rows.length === 1}
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