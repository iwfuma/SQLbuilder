import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('sqlHistory')) || [];
    setHistory(stored);
  }, []);

  const handleCopy = (sql) => {
    navigator.clipboard.writeText(sql).then(() => {
      alert('SQLをコピーしました');
    });
  };

  const handleDelete = (id) => {
    const filtered = history.filter((item) => item.id !== id);
    setHistory(filtered);
    localStorage.setItem('sqlHistory', JSON.stringify(filtered));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>SQL履歴</Typography>
      {history.length === 0 ? (
        <Typography>履歴が存在しません。</Typography>
      ) : (
        history.map((item) => (
          <Paper key={item.id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>{item.tableName}</Typography>
            <Typography variant="body2" color="text.secondary">{item.createdAt}</Typography>
            <Box sx={{ mt: 1, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
              {item.sql}
            </Box>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={() => handleCopy(item.sql)}
              >
                コピー
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDelete(item.id)}
              >
                削除
              </Button>
            </Stack>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default History;