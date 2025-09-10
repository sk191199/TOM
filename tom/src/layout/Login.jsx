import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const backgroundUrl =
  'https://www.tom.sg/wp-content/uploads/2021/12/banner.jpg'; // Replace with your actual image if needed

const Login = ({ onLogin }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Your login logic here
    if (onLogin) onLogin();
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: { xs: 0, sm: 10 }, // Responsive: 0 on mobile, 10 on sm+
        justifyContent:{ xs: 'center', sm: 'flex-start' }, // Center on mobile, start on sm+
        background: `url(${backgroundUrl}) center center / cover no-repeat`,
        position: 'relative',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 5 },
          width: { xs: '90%', sm: 400 },
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 3,
          zIndex: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Box
            component="img"
            src="https://www.tom.sg/wp-content/uploads/2021/11/tom_logo-300x135.png" // Replace with your TOM logo URL or import
            alt="TOM Logo"
            sx={{ width: 120, mb: 1 }}
          />
          
        </Box>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          Email Address
        </Typography>
        <TextField
          size="small"
          placeholder="your email@company.com"
          fullWidth
          variant="outlined"
        />
        <Typography variant="body2" sx={{ mt: 1, mb: 0.5 }}>
          Password
        </Typography>
        <TextField
          size="small"
          placeholder="Enter your password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ mt: 2, mb: 1, py: 1.2, fontWeight: 600, fontSize: 16, textTransform: 'none' }}
          onClick={handleLogin}
        >
          Sign In
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Link href="#" underline="hover" fontSize={14}>
            Forgot password?
          </Link>
          <Link href="#" underline="hover" fontSize={14}>
            Need help?
          </Link>
        </Box>
      </Paper>
      {/* Optional: Overlay for darkening background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default Login;