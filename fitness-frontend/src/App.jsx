import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ActivitiesPage from './pages/ActivitiesPage';
// Import the context from the library
import { AuthContext } from 'react-oauth2-code-pkce'; 
import ActivityDetail from './components/ActivityDetail';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00f2ff', // Neon Cyan
    },
    secondary: {
      main: '#bcfe2f', // Neon Lime
    },
    background: {
      default: '#0a0a0c', // Deep Midnight Black
      paper: '#16161a',   // Dark Grey for Cards
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '"Rajdhani", "Inter", sans-serif', // Sporty, techy font
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: 16,
        },
      },
    },
  },
});

function App() {
  // Use the library's context values
  const { token, tokenData, logIn, logOut, loading } = useContext(AuthContext);

  // Sync token to localStorage so your api.js interceptor can find it
  useEffect(() => {
    if (token && tokenData) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', tokenData.sub); // Keycloak uses 'sub' for user ID
    }
  }, [token, tokenData]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 20 }}>Loading...</Box>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar 
  position="sticky" 
  elevation={0} 
  sx={{ 
    // Deep black with slight transparency for "Glass" effect
    background: 'rgba(10, 10, 12, 0.8)', 
    backdropFilter: 'blur(10px)',
    borderBottom: '2px solid #00f2ff', // Neon Cyan underline
    color: 'white' 
  }}
>
  <Toolbar>
    <FitnessCenterIcon sx={{ mr: 2, color: '#00f2ff', filter: 'drop-shadow(0 0 5px #00f2ff)' }} />
    <Typography 
      variant="h6" 
      sx={{ 
        flexGrow: 1, 
        fontWeight: 'bold', 
        letterSpacing: 2,
        fontFamily: '"Rajdhani", sans-serif' // Matches your sporty theme
      }}
    >
      FITNESS<span style={{ color: '#00f2ff', textShadow: '0 0 10px #00f2ff' }}>TRACKER</span>
    </Typography>

    {token ? (
      <Button 
        variant="outlined" 
        onClick={() => logOut()}
        sx={{ 
          color: '#bcfe2f', 
          borderColor: '#bcfe2f',
          fontWeight: 'bold',
          '&:hover': {
            borderColor: '#00f2ff',
            color: '#00f2ff',
            boxShadow: '0 0 10px rgba(0, 242, 255, 0.3)'
          }
        }}
      >
        Logout
      </Button>
    ) : (
      <Button 
        variant="contained" 
        onClick={() => logIn()}
        sx={{ 
          bgcolor: '#00f2ff', 
          color: '#000', 
          fontWeight: 'bold',
          '&:hover': { bgcolor: '#bcfe2f' }
        }}
      >
        Login
      </Button>
    )}
  </Toolbar>
</AppBar>

          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Routes>
              {token ? (
                <>
                  <Route path="/activities" element={<ActivitiesPage />} />
                  <Route path="/activities/:id" element={<ActivityDetail />} />
                  <Route path="/" element={<Navigate to="/activities" replace />} />
                </>
              ) : (
                <Route path="*" element={
                  <Box sx={{ textAlign: 'center', mt: 10 }}>
                    <Typography variant="h5">Welcome! Please login to track your fitness.</Typography>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={() => logIn()}>Sign In</Button>
                  </Box>
                } />
              )}
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;