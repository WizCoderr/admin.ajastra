import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import {AddSlider} from '../../components/addSlider/addSlider';
import SeeSlider from '../../components/seeSlider/seeSlider';

export default function SliderPage() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{ p: 4 }}>
            <Button variant="contained" onClick={handleOpen}>
                Add Slider
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Slider</DialogTitle>
                <DialogContent>
                    <AddSlider />
                </DialogContent>
            </Dialog>

            <Box sx={{ my:2 }}>
            </Box>

            <SeeSlider/>
        </Box>
    );
}
