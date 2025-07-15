import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CopyButton = ({ textToCopy, disabled }) => {
  const [open, setOpen] = useState(false);

  const handleCopy = () => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy)
      .then(() => setOpen(true))
      .catch(() => alert('コピーに失敗しました'));
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ContentCopyIcon />}
        onClick={handleCopy}
        disabled={disabled}
        sx={{ minWidth: 120 }}
      >
        SQLをコピー
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          SQLをコピーしました！
        </Alert>
      </Snackbar>
    </>
  );
};

export default CopyButton;
