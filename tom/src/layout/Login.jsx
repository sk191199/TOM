import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, TextField, Button, Typography, Link, InputAdornment, IconButton, } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { loginUser } from '../services/api';
import LsService, { storageKey } from '../services/localstorage';

const backgroundUrl =
  'https://www.tom.sg/wp-content/uploads/2021/12/banner.jpg';

const Login = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [errorMsg, setErrMesg] = useState(''); // string instead of object
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const user = LsService.getItem(storageKey);

  useEffect(() => {
    // console.log(user);
    if (user) {
      navigate('/dashboard');
    } else {
      return;
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    setErrMesg('');
    setErrors({ email: '', password: '' });

    if (!inputEmail || !inputPassword) {
      setErrors({
        email: !inputEmail ? 'Please fill the Email Id' : '',
        password: !inputPassword ? 'Please fill the password' : '',
      });
      setLoading(false);
      return;
    }

    try {
      const response = await loginUser({ email: inputEmail, password: inputPassword });
      console.log(response.data);
      console.log(response.data.user);

      if (response.status === 200) {
        // onLogin?.(response.data.user); // optional callback if you need
        LsService.setItem(storageKey, response.data.user);
        navigate('/dashboard');
      }
    } catch (error) {
      setErrMesg(error.response?.data?.message || 'Something went wrong');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: { xs: 0, sm: 10 },
        justifyContent: { xs: 'center', sm: 'flex-start' },
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
            src="https://www.tom.sg/wp-content/uploads/2021/11/tom_logo-300x135.png"
            alt="TOM Logo"
            sx={{ width: 120, mb: 1 }}
          />
        </Box>

        <Typography variant="body2">Email Address</Typography>
        <TextField
          size="small"
          placeholder="your email@company.com"
          fullWidth
          variant="outlined"
          type="email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          disabled={loading}
        />

        <Typography variant="body2">Password</Typography>
        <TextField
          size="small"
          placeholder="Enter your password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          variant="outlined"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          disabled={loading}
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
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

        {errorMsg && (
          <Typography sx={{ fontSize: '12px' }} color="error">
            {errorMsg}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Link href="#" underline="hover" fontSize={14}>
            Forgot password?
          </Link>
          <Link href="#" underline="hover" fontSize={14}>
            Need help?
          </Link>
        </Box>
      </Paper>

      {/* Background Overlay */}
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