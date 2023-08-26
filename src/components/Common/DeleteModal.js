import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const DeleteModal = ({ isDeleteDialogOpen, handleCloseDialogs, handleDeleteCar }) => {
  return (
    <Dialog open={isDeleteDialogOpen} onClose={handleCloseDialogs}>
      <DialogTitle>Delete Car</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this car?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialogs} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDeleteCar} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;