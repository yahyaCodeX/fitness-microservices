import React, { useState } from 'react';
import ActivityForm from '../components/ActivityForm';
import ActivityList from '../components/ActivityList';
import { Typography, Box } from '@mui/material';

const ActivitiesPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleActivityAdded = () => {
    // Incrementing this key forces the ActivityList to re-mount/refresh
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, color: '#1e293b' }}>
        Dashboard
      </Typography>
      <ActivityForm onActivityAdded={handleActivityAdded} />
      <ActivityList key={refreshKey} />
    </Box>
  );
};

export default ActivitiesPage;