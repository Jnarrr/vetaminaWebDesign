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
import axios from 'axios';
import swal from 'sweetalert';



function ClinicRegister() {

    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registration_number, setRegistration_number] = useState('');
    const [owner_name, setOwner_name] = useState('');
    const [clinic_name, setClinic_name] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [permit, setPermit] = useState('');
    const [verified, setVerified] = useState('false');

    const theme = createTheme();

    const saveClinic = (e) => {
        e.persist();
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('registration_number', registration_number);
        formData.append('owner_name', owner_name);
        formData.append('clinic_name', clinic_name);
        formData.append('phone_number', phone_number);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('permit', permit);
        formData.append('verified', verified);

        axios.post(`/api/add-clinic`, formData).then(res => {
            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setUsername('');
                setPassword('');
                setRegistration_number('');
                setOwner_name('');
                setClinic_name('');
                setPhone_number(''); 
                setAddress('');
                setEmail('');
                setPermit('');
                setVerified('');
                history.push('/ClinicLogin');
            }
            else if (res.data.status === 422){
                alert('All form must be filled')
            }
        });
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
            backgroundImage: 'url(../images/reg.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            
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
            <div style={{marginBottom: '-20px'}}></div>
            <img src="./images/logo.png" alt="" style={{width: 200}}/>
            <Typography component="h1" variant="h5" fontFamily={'Poppins, sans serif'} color="black">
              Register Clinic
            </Typography>
            <Box component="form" noValidate onSubmit={saveClinic} sx={{ mt: 1 }}>
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
              <TextField
                margin="normal"
                required
                fullWidth
                label="Registration Number"
                onChange={(e) => setRegistration_number(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Owner Name"
                onChange={(e) => setOwner_name(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Clinic Name"
                onChange={(e) => setClinic_name(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Phone Number"
                onChange={(e) => setPhone_number(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Clinic Address"
                onChange={(e) => setAddress(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Clinic Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                type="file"
                required
                fullWidth
                label="Permit"
                onChange={(e) => setPermit(e.target.files[0])}
              />
              <Button
                type='submit'
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register Clinic
              </Button>
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

export default ClinicRegister;