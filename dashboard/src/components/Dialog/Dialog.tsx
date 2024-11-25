import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

const CancelButton = styled(Button)({
  color: '#B0BEC5', // soft gray for cancel button
  backgroundColor: '#424242', // dark background for button
  border: '1px solid #B0BEC5',
  padding: '6px 16px',
  // fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#616161', // slightly darker gray on hover
  },
});

const DeleteButton = styled(Button)({
  color: '#fff',
  backgroundColor: '#d32f2f',
  padding: '6px 16px',

  transition: 'transform 0.2s',
  '&:hover': {
    backgroundColor: '#b71c1c', // darker red on hover
    // transform: 'scale(1.05)',
    
  },
});

export default function AlertDialog({ open, onClose, onConfirmDelete,key }: any) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: {
          background: 'rgb(18 32 49)', 
          // gradient background for dialog
          color: '#fff',
          borderRadius: '10px', 
          padding: '5px',
          boxShadow: '0 0 0 rgba(0, 0, 0, 0.5)', 
       
        },
      }}
    >
      <DialogTitle 
        id="alert-dialog-title" 
        sx={{ 
          fontSize: '1.6rem', 
          fontWeight: 'bold', 
          color: 'white', // softer red color for title
          fontFamily: 'Satoshi, sans-serif'
        
        }}
      >
        Confirm Delete
      </DialogTitle>
      <DialogContent>
        <DialogContentText 
          id="alert-dialog-description" 
          sx={{ 
            fontSize: '1.15rem', 
            color: '#E0E0E0', 
            // textAlign: 'center', 
            lineHeight: '1.6',
             fontFamily: 'Satoshi, sans-serif'
          }}
        >
          Are you sure you want to delete this item? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'right', gap: '10px' , fontFamily: 'Satoshi, sans-serif' }}>
        <CancelButton onClick={onClose}>Cancel</CancelButton>
        <DeleteButton onClick={() => { onConfirmDelete(); onClose(); }} autoFocus>
          Delete
        </DeleteButton>
      </DialogActions>
    </Dialog>
  );
}
