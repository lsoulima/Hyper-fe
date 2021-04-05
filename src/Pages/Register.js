import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import { Link } from "react-router-dom";
import registerAction from "../services/auth";
import { Box } from "@material-ui/core";
import { useForm } from "react-hook-form";

const ButtonAuth = styled.button`
  width: 100%;
  height: 36px;
  padding: 6px 16px 6px 16px;
  position: relative;
  margin-bottom: 20px;
  :hover {
    cursor: pointer;
  }

  i {
    position: absolute;
    left: 20px;
    font-size: 20px;
    margin: auto;
  }
  @media (max-width: 425px) {
    span {
      display: none;
    }
    i {
      font-size: 20px;
      position: absolute;
      left: 45%;
      top: 15%;
    }
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
    height: 100%;
    width: 100%;
    @media (max-width: 768px) {
      height: auto;
    }
  }
  .container {
    padding-top: 100px;
    height: 100%;
    width: 100%;
    background: rgba(51, 51, 51, 0.5);
    padding-bottom: 100px;
  }
  .paper {
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 15px;
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
    margin: theme.spacing(3, 0, 2);
    background: red;
  }
`;

export default function Register() {
  // const [state, Setstate] = useState();
  const { register, handleSubmit, errors } = useForm();
  // const [open, setOpen] = React.useState(false);
  // let history = useHistory();
  // const handleClose = (event, reason, state) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };

  const onSubmit = async (data) => {
    const res = await registerAction(data);
  };

  return (
    <Wrapper>
      <div className='container'>
        <Container component='main' maxWidth='sm'>
          <div className='paper'>
            <Typography
              component='h1'
              variant='h5'
              style={{
                alignSelf: "start",
                fontSize: "40px",
                fontWeight: 600,
                color: "#fff",
              }}>
              Sign Up
            </Typography>
            {/* <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              autoHideDuration={1000}
              onClose={handleClose}>
              {state === "0" ? (
                <Alert
                  onClose={handleClose}
                  severity='success'
                  variant='filled'>
                  Registered successfully, Please confirm your email
                </Alert>
              ) : (
                <Alert onClose={handleClose} severity='error' variant='filled'>
                  {state}
                </Alert>
              )}
            </Snackbar> */}
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12}>
                  <WhiteBorderTextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    min={3}
                    max={20}
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
                <Grid item xs={12}>
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
                <Grid item xs={12} md={6}>
                  <WhiteBorderTextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    inputRef={register({
                      required: "You must provide your password!",
                      pattern: {
                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$/,
                        message:
                          "Password must be at least eight characters long, at least one uppercase letter, one lowercase letter, one number and one special character !",
                      },
                    })}
                  />
                  {errors.password && (
                    <Box
                      variant='filled'
                      color='red'
                      style={{ fontSize: "12px" }}>
                      {errors.password.message}
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <WhiteBorderTextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    name='confirmpassword'
                    label='Retype Password'
                    type='password'
                    id='confirmpassword'
                    inputRef={register({
                      required: "You must confirm your password!",
                    })}
                  />
                  {errors.confirmpassword && (
                    <Box
                      variant='filled'
                      color='red'
                      style={{ fontSize: "12px" }}>
                      {errors.confirmpassword.message}
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type='submit'
                    fullWidth
                    // onClick={() => HandlSubmit()}
                    variant='contained'
                    color='primary'
                    className='submit'>
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <h4
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}>
                    OR
                  </h4>
                </Grid>
                <ButtonAuth>
                  <i class='lab la-google-plus-g'></i>
                  <span>Continue With Goolge</span>
                </ButtonAuth>
                <ButtonAuth>
                  <i class='lab la-github'></i>
                  <span>Continue With Github</span>
                </ButtonAuth>
                <ButtonAuth>
                  <i>42</i>
                  <span>Continue With Intra</span>
                </ButtonAuth>
                <Grid container>
                  <Grid
                    item
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}>
                    <Link to='/login' style={{ color: "#fff" }}>
                      Sign In
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    </Wrapper>
  );
}
