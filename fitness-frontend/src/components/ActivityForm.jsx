import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Stack, MenuItem, Grid, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addActivity } from '../services/api';

const ActivityForm = ({ onActivityAdded }) => {
  const [formData, setFormData] = useState({
    type: 'RUNNING', duration: '', caloriesBurned: '',
    additionalMetrics: { distance: '', heartRate: '', steps: '' }
  });

  // Common styles for Neon Inputs
  const neonInputStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'rgba(0, 242, 255, 0.3)' },
      '&:hover fieldset': { borderColor: '#00f2ff' },
      '&.Mui-focused fieldset': { borderColor: '#00f2ff' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#00f2ff' },
    '& .MuiInputBase-input': { color: '#fff' }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      duration: parseInt(formData.duration) || 0,
      caloriesBurned: parseInt(formData.caloriesBurned) || 0,
      startTime: new Date().toISOString().split('.')[0],
      additionalMetrics: {
        distance: parseFloat(formData.additionalMetrics.distance) || 0,
        heartRate: parseInt(formData.additionalMetrics.heartRate) || 0,
        steps: parseInt(formData.additionalMetrics.steps) || 0
      }
    };
    try {
      await addActivity(payload);
      onActivityAdded();
      setFormData({
        type: 'RUNNING', duration: '', caloriesBurned: '',
        additionalMetrics: { distance: '', heartRate: '', steps: '' }
      });
    } catch (error) { console.error(error); }
  };

  return (
    <Paper elevation={0} sx={{ 
      p: 4, mb: 4, borderRadius: 4, 
      bgcolor: '#16161a', // Dark background
      border: '1px solid rgba(0, 242, 255, 0.2)' 
    }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#00f2ff' }}>
        Track New Activity
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField select fullWidth label="Type" value={formData.type} sx={neonInputStyles}
              onChange={(e) => setFormData({...formData, type: e.target.value})}>
              {['RUNNING', 'CYCLING', 'SWIMMING', 'WEIGHT_TRAINING'].map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Duration (min)" type="number" sx={neonInputStyles}
              value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Calories" type="number" sx={neonInputStyles}
              value={formData.caloriesBurned} onChange={(e) => setFormData({...formData, caloriesBurned: e.target.value})} />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1, borderColor: 'rgba(0, 242, 255, 0.1)' }}>
              <Typography variant="caption" sx={{ color: '#bcfe2f' }}>ADDITIONAL METRICS</Typography>
            </Divider>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Distance (km)" type="number" sx={neonInputStyles}
              value={formData.additionalMetrics.distance}
              onChange={(e) => setFormData({...formData, additionalMetrics: {...formData.additionalMetrics, distance: e.target.value}})} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Heart Rate (bpm)" type="number" sx={neonInputStyles}
              value={formData.additionalMetrics.heartRate}
              onChange={(e) => setFormData({...formData, additionalMetrics: {...formData.additionalMetrics, heartRate: e.target.value}})} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Steps" type="number" sx={neonInputStyles}
              value={formData.additionalMetrics.steps}
              onChange={(e) => setFormData({...formData, additionalMetrics: {...formData.additionalMetrics, steps: e.target.value}})} />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth size="large" startIcon={<AddIcon />}
              sx={{ bgcolor: '#00f2ff', color: '#000', fontWeight: 'bold', '&:hover': { bgcolor: '#bcfe2f' } }}>
              ADD ACTIVITY
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ActivityForm;