import React , {useState}from 'react';
import {useHistory, Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const ClinicLogin = () =>
{
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const history = useHistory();

    const theme = createTheme();


    async function login()
    {
        let item={username,password};
        let result = await fetch("http://localhost:8000/api/cliniclogin",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json',
            },
            body:JSON.stringify(item)

        });
        result = await result.json();
        localStorage.setItem("user-info",JSON.stringify(result));
        if("error" in result){
            alert("Username or Password is not matched");
        }else if ("notVerified" in result){
            alert("User is not yet Verified");
        }
        else{
            global.owner_name = result.owner_name;
            history.push("/dashboard");
        }
    }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(../images/owner.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '10%'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{marginTop: '33%'}}></div>
            <img src="./images/logo.png" alt="" style={{width: 200}}/>
            <Typography component="h1" variant="h5" fontFamily={'Poppins, sans serif'}>
              Clinic Login
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={login}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to ="/ClinicRegister" variant="body2">
                    {"Clinic not yet Registered? Register here"}
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link to ="/welcome" variant="body2">
                    {"Back"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ClinicLogin;