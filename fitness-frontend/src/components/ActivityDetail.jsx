// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getActivityDetail } from '../services/api';
// import { Box, Typography, Paper, Divider, Button, Stack, Skeleton, Grid, List, ListItem, ListItemText } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import PsychologyIcon from '@mui/icons-material/Psychology';

// const ActivityDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getActivityDetail(id)
//       .then(res => {
//         setData(res.data);
//         console.log("Activity Data:", res.data); // Helpful for debugging
//       })
//       .catch(err => console.error(err))
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 4 }} />;
//   if (!data) return <Typography>No details found.</Typography>;

//   return (
//     <Box sx={{ maxWidth: 900, mx: 'auto' }}>
//       <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>Back</Button>

//       <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', mb: 3 }}>
//         <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>{data.type} Summary</Typography>
        
//         <Grid container spacing={3}>
//           {/* Main Metrics */}
//           <Grid item xs={6} md={3}>
//             <Typography variant="caption" color="text.secondary">DURATION</Typography>
//             <Typography variant="h6" sx={{ fontWeight: 600 }}>{data.duration || "--"} min</Typography>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Typography variant="caption" color="text.secondary">CALORIES</Typography>
//             <Typography variant="h6" sx={{ fontWeight: 600, color: '#ef4444' }}>{data.caloriesBurned || "--"} kcal</Typography>
//           </Grid>
          
//           {/* Display Additional Metrics from DB */}
//           {data.additionalMetrics && Object.entries(data.additionalMetrics).map(([key, value]) => (
//             <Grid item xs={6} md={3} key={key}>
//               <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>{key}</Typography>
//               <Typography variant="h6" sx={{ fontWeight: 600 }}>{value || "--"}</Typography>
//             </Grid>
//           ))}
//         </Grid>
//       </Paper>

//       {/* AI Recommendation Card */}
//       {data.recommendation && (
//         <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#f0f7ff' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
//             <PsychologyIcon color="primary" fontSize="large" />
//             <Typography variant="h5" sx={{ fontWeight: 'bold' }}>AI Performance Analysis</Typography>
//           </Box>
//           <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 3, whiteSpace: 'pre-line', color: '#334155' }}>
//             {data.recommendation}
//           </Typography>
          
//           <Divider sx={{ my: 3 }} />

//           <Grid container spacing={4}>
//             {/* Improvements Section */}
//             <Grid item xs={12} md={4}>
//               <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#1e293b' }}>
//                 🚀 Improvements
//               </Typography>
//               <List dense>
//                 {data.improvements?.map((item, idx) => (
//                   <ListItem key={idx} disableGutters>
//                     <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2' }} />
//                   </ListItem>
//                 ))}
//               </List>
//             </Grid>

//             {/* Suggestions Section */}
//             <Grid item xs={12} md={4}>
//               <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#1e293b' }}>
//                 💡 AI Suggestions
//               </Typography>
//               <List dense>
//                 {data.suggestions?.map((item, idx) => (
//                   <ListItem key={idx} disableGutters>
//                     <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2' }} />
//                   </ListItem>
//                 ))}
//               </List>
//             </Grid>

//             {/* Safety Section - The missing part */}
//             <Grid item xs={12} md={4}>
//               <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#ef4444' }}>
//                 ⚠️ Safety Guidelines
//               </Typography>
//               <List dense>
//                 {data.safety?.map((item, idx) => (
//                   <ListItem key={idx} disableGutters>
//                     <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2' }} />
//                   </ListItem>
//                 ))}
//               </List>
//             </Grid>
//           </Grid>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default ActivityDetail;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getActivityDetail } from '../services/api';
import { Box, Typography, Paper, Divider, Button, Stack, Skeleton, Grid, List, ListItem, ListItemText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PsychologyIcon from '@mui/icons-material/Psychology';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivityDetail(id)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 4, bgcolor: '#16161a' }} />;
  if (!data) return <Typography sx={{ color: '#fff' }}>No details found.</Typography>;

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 2 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3, color: '#00f2ff' }}>BACK</Button>

      {/* Main Data Card */}
      <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: '#16161a', border: '1px solid rgba(255,255,255,0.1)', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#fff' }}>{data.type} Summary</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <Typography variant="caption" sx={{ color: '#00f2ff' }}>DURATION</Typography>
            <Typography variant="h6" sx={{ color: '#fff' }}>{data.duration || "--"} min</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="caption" sx={{ color: '#ef4444' }}>CALORIES</Typography>
            <Typography variant="h6" sx={{ color: '#fff' }}>{data.caloriesBurned || "--"} kcal</Typography>
          </Grid>
          {data.additionalMetrics && Object.entries(data.additionalMetrics).map(([key, value]) => (
            <Grid item xs={6} md={3} key={key}>
              <Typography variant="caption" sx={{ color: '#bcfe2f', textTransform: 'uppercase' }}>{key}</Typography>
              <Typography variant="h6" sx={{ color: '#fff' }}>{value || "--"}</Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* AI Recommendation Card - Neon Dark Fixed */}
      {data.recommendation && (
        <Paper elevation={0} sx={{ 
          p: 4, borderRadius: 4, 
          bgcolor: '#0a0a0c', 
          border: '1px solid #00f2ff',
          boxShadow: '0 0 15px rgba(0, 242, 255, 0.1)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <PsychologyIcon sx={{ color: '#00f2ff', fontSize: '2.5rem' }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#00f2ff', letterSpacing: 1 }}>
                AI PERFORMANCE ANALYSIS
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ color: '#e2e8f0', lineHeight: 1.8, whiteSpace: 'pre-line', mb: 4 }}>
            {data.recommendation}
          </Typography>
          
          <Divider sx={{ mb: 3, borderColor: 'rgba(0, 242, 255, 0.2)' }} />

          <Grid container spacing={4}>
            {/* 1. Improvements Section */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ color: '#bcfe2f', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                🚀 IMPROVEMENTS
              </Typography>
              <List dense>
                {data.improvements?.map((item, idx) => (
                  <ListItem key={idx} disableGutters>
                    <ListItemText primary={item} sx={{ color: 'rgba(255,255,255,0.8)' }} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* 2. Suggestions Section - RESTORED & NEON STYLED */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ color: '#00f2ff', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                💡 AI SUGGESTIONS
              </Typography>
              <List dense>
                {data.suggestions?.map((item, idx) => (
                  <ListItem key={idx} disableGutters>
                    <ListItemText primary={item} sx={{ color: 'rgba(255,255,255,0.8)' }} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* 3. Safety Section */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ color: '#ef4444', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                ⚠️ SAFETY
              </Typography>
              <List dense>
                {data.safety?.map((item, idx) => (
                  <ListItem key={idx} disableGutters>
                    <ListItemText primary={item} sx={{ color: 'rgba(255,255,255,0.8)' }} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default ActivityDetail;