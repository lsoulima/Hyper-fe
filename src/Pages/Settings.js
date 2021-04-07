import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SecurityTwoToneIcon from "@material-ui/icons/SecurityTwoTone";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import { useForm } from "react-hook-form";
import { Snackbar, Box } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { HyperContext } from "../Context/context";
import { checkTokenAction, logout } from "../services/auth";
import { settingsAction } from "../services/profile";
// import { logout } from "../services/auth";

const LabelImage = styled.label`
  cursor: pointer;
  color: #fff;
  border-radius: 50%;
  input {
    display: none;
  }
  text-align: center;
  img {
    /* border-radius: 50%; */
    width: 150px;
    height: 150px;
  }
`;

const WhiteBorderTextField = styled(TextField)`
  & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: #fff !important;
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: #fff;
  }
  & label.Mui-focused {
    color: #fff;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #fff;
    }
  }
  label {
    color: #fff !important;
    font-size: 13px;
  }
  input:hover {
    border-color: red !important;
  }
  input {
    border-color: #fff;
    color: #fff;
  }
`;

const Wrapper = styled.div`
  & {
    background: url("./img/net.jpg") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    /* Set up proportionate scaling */
    width: 100%;
    height: 100%;
    @media (max-width: 768px) {
      & {
        height: auto;
      }
    }
  }
  .container {
    padding-top: 100px;
    height: 100%;
    min-height: 100%;
    width: 100%;
    background: rgba(51, 51, 51, 0.5);
    padding-bottom: 100px;
  }
  .paper {
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 0 0 15px 15px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .avatar {
    margin: 50px;
    background-color: red;
  }
  .form {
    width: 100%; // Fix IE 11 issue.
  }
  .submit {
    margin: 25px 0px;
    background: red;
  }
`;

export default function Settings() {
  const { state, dispatch } = useContext(HyperContext);
  const [tab, setTab] = useState(0);
  const [message, setMessage] = useState({});
  const { register, handleSubmit, errors } = useForm();
  const [open, setOpen] = useState(false);
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const onSubmit = async (data) => {
    console.log(data);
    console.log(state.token);

    const valideToken = await checkTokenAction(state.token);
    console.log(valideToken);

    if (valideToken) {
      const SettingsResponce = await settingsAction(state.token, data);
      setMessage(SettingsResponce);
      setOpen(true);
    } else {
      const res = await logout(state.token, dispatch);
      setMessage(res);
      setOpen(true);
    }
  };

  const TabPanel = (props) => {
    const { children, value, index } = props;

    return (
      <div role='tabpanel' hidden={value !== index}>
        {value === index && <div className='paper'>{children}</div>}
      </div>
    );
  };

  return (
    <Wrapper>
      <div className='container'>
        <Container component='main' maxWidth='sm'>
          <Paper elevation={5}>
            <Tabs
              value={tab}
              onChange={handleChange}
              variant='fullWidth'
              indicatorColor='secondary'
              textColor='red'
              TabIndicatorProps={{ style: { background: "red" } }}
              style={{ background: "rgb(8, 7, 8)", color: "white" }}>
              <Tab
                icon={<PersonPinIcon />}
                label='Info'
                style={{ padding: "20px 0" }}
              />
              <Tab
                icon={<SecurityTwoToneIcon />}
                label='Password'
                style={{ padding: "20px 0" }}
              />
            </Tabs>
          </Paper>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}>
            {state.success === true ? (
              <Alert onClose={handleClose} severity='success' variant='filled'>
                {state.message}
              </Alert>
            ) : (
              <Alert onClose={handleClose} severity='error' variant='filled'>
                {state.error}
              </Alert>
            )}
          </Snackbar>
          <TabPanel value={tab} index={0}>
            <Typography
              component='h1'
              variant='h5'
              style={{
                fontSize: "40px",
                fontWeight: 600,
                color: "#fff",
              }}>
              Loubna Soulimani
            </Typography>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  style={{ margin: "20px 0 20px 0", textAlign: "center" }}>
                  <LabelImage type='file'>
                    <img src='./img/avatar.jpeg' alt='avatar' />
                    <input type='file' />
                  </LabelImage>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <WhiteBorderTextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='firstname'
                    label='First Name'
                    name='firstname'
                    autoComplete='firstname'
                    autoFocus
                    inputRef={register({
                      required: "You must provide your firstname!",
                      pattern: {
                        value: /^[a-zA-Z]{3,20}$/,
                        message:
                          "The firstname must contain between 3 and 20 letters !",
                      },
                    })}
                  />
                  {errors.firstname && (
                    <Box
                      variant='filled'
                      color='red'
                      style={{ fontSize: "12px" }}>
                      {errors.firstname.message}
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <WhiteBorderTextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='lastname'
                    label='Last Name'
                    name='lastname'
                    inputRef={register({
                      required: "You must provide your lastname!",
                      pattern: {
                        value: /^[a-zA-Z]{3,20}$/,
                        message:
                          "The lastname  must contain between 3 and 20 letters !",
                      },
                    })}
                  />
                  {errors.lastname && (
                    <Box
                      variant='filled'
                      color='red'
                      style={{ fontSize: "12px" }}>
                      {errors.lastname.message}
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <WhiteBorderTextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='username'
                    label='User Name'
                    name='username'
                    inputRef={register({
                      required: "You must provide your username!",
                      pattern: {
                        value: /^[a-z]+(([-_.]?[a-z0-9])?)+$/,
                        message:
                          "The username must contain between 3 and 20 letters or numbers (-, _ or.) !",
                      },
                    })}
                  />
                  {errors.username && (
                    <Box
                      variant='filled'
                      color='red'
                      style={{ fontSize: "12px" }}>
                      {errors.username.message}
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <WhiteBorderTextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    inputRef={register({
                      required: "You must provide your email!",
                      pattern: {
                        value: /[a-zA-Z0-9-_.]{1,50}@[a-zA-Z0-9-_.]{1,50}\.[a-z0-9]{2,10}$/,
                        message: "Invalid email address !",
                      },
                    })}
                  />
                  {errors.email && (
                    <Box
                      variant='filled'
                      color='red'
                      style={{ fontSize: "12px" }}>
                      {errors.email.message}
                    </Box>
                  )}
                </Grid>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className='submit'>
                  Save
                </Button>
              </Grid>
            </form>
          </TabPanel>

          <TabPanel value={tab} index={1}>
            <form className='form' noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <WhiteBorderTextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    name='oldpassword'
                    label='Old Password'
                    type='password'
                    id='oldpassword'
                  />
                </Grid>
                <Grid item xs={12}>
                  <WhiteBorderTextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    name='newpassword'
                    label='New Password'
                    type='password'
                    id='newpassword'
                  />
                </Grid>
                <Grid item xs={12}>
                  <WhiteBorderTextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    name='confirmpassword'
                    label='Retype Password'
                    type='password'
                    id='confirmpassword'
                  />
                </Grid>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  className='submit'
                  color='primary'>
                  Save
                </Button>
              </Grid>
            </form>
          </TabPanel>
        </Container>
      </div>
    </Wrapper>
  );
}
