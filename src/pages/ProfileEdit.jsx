import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../_services/userService";
import "./ProfileEdit.scss";

// @MUI
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

//--------------------------------------------------------------------------------

const initialFormValues = {
  firstName: "",
  lastName: "",
  birthday: "",
  email: "",
  password: "",
  phone_number: "",
};

//--------------------------------------------------------------------------------

export default function ProfileEdit() {
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const data = await userService.getMyProfile(token);
      setProfile(data);
      setFormValues({
        firstName: data.user_name,
        lastName: data.user_last_name,
        email: data.email,
        birthday: data.birthday,
        phone_number: data.phone_number,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  // UPDATE PROFILE  -----------------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, // key: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const updates = {
      user_name: data.get("firstName"),
      user_last_name: data.get("lastName"),
      birthday: data.get("birthday"),
      email: data.get("email"),
      password: data.get("password"),
      phone_number: data.get("phone_number"),
    };
    updateProfile(updates);
  };

  const updateProfile = async (updates) => {
    try {
      const userUpdates = await userService.updateMyProfile(token, updates);
      setProfile(userUpdates);
      navigate("/profile");
      console.log(userUpdates);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(assets/covers/cover_${profile.id}.jpg)`,
        }}
        className="back-img"
      >
        <Typography
          variant="h3"
          align="center"
          fontWeight={400}
          sx={{ color: "white", m: 5 }}
        >
          Edit my profile.
        </Typography>
        <Box
          sx={{
            marginTop: 4,
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              mt: 1,
              mb: 2,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={`assets/avatars/avatar_${profile.id}.jpg`}
              sx={{
                width: "20%",
                height: "20%",
              }}
            />
            <Typography
              sx={{ mt: 1, color: "white" }}
              component="h1"
              variant="h5"
            >
              {profile.user_name} {profile.user_last_name}
            </Typography>
          </Box>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              backgroundColor: "white",
              m: 10,
              mt: 5,
              p: 4,
              borderRadius: 4,
              border: "1px solid #e8e8e8",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Stack direction="column" spacing={2}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formValues.firstName}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: false,
                    }}
                  />
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formValues.lastName}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: false,
                    }}
                  />
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formValues.email}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: false,
                    }}
                  />
                  <TextField
                    required
                    fullWidth
                    id="birthday"
                    label="Birthday"
                    name="birthday"
                    autoComplete="date"
                    value={formValues.birthday}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: false,
                    }}
                  />
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone_number"
                    value={formValues.phone_number}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: false,
                    }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Stack direction="column" spacing={2}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    InputProps={{
                      readOnly: false,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                          ></IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save changes
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
}
