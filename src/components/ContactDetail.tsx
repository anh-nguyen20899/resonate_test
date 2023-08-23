import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Contact } from "apis/entities/contacts";

interface ContactProps {
  contact: Contact | null;
  onSave?: (updatedContact: Contact) => void;
}

export const ContactDetail = ({ contact, onSave }: ContactProps) => {
  const defaultContact: Contact = {
    id: 0,
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  };

  const actualContact = contact || defaultContact;

  const [values, setValues] = useState(actualContact);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let newState: any = { ...values };

    if (name.includes(".")) {
      const [mainProp, subProp, subSubProp] = name.split(".");

      if (!subSubProp) {
        // For properties like company.name
        newState[mainProp][subProp] = value;
      } else {
        // For properties like address.geo.lat
        newState[mainProp][subProp][subSubProp] = value;
      }
    } else {
      newState[name] = value;
    }

    setValues(newState as Contact);
  };

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      if (onSave) {
        onSave(values);
      }
    },
    [values, onSave]
  );

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card sx={{ padding: 3 }}>
        <CardHeader title="Information" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the full name"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  value={values.username}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="string"
                  value={values.phone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Suite"
                  name="address.suite"
                  onChange={handleChange}
                  value={values.address.suite}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Street"
                  name="address.street"
                  onChange={handleChange}
                  required
                  value={values.address.street}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="address.city"
                  onChange={handleChange}
                  required
                  value={values.address.city}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  name="address.zipcode"
                  onChange={handleChange}
                  value={values.address.zipcode}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Geography Latitude"
                  name="address.geo.lat"
                  onChange={handleChange}
                  value={values.address.geo.lat}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Geography Longitude"
                  name="address.geo.lng"
                  onChange={handleChange}
                  value={values.address.geo.lng}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Website"
                  name="website"
                  onChange={handleChange}
                  value={values.website}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="company.name"
                  onChange={handleChange}
                  required
                  value={values.company.name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Catch Phrase"
                  name="company.catchPhrase"
                  onChange={handleChange}
                  value={values.company.catchPhrase}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="BS"
                  name="company.bs"
                  onChange={handleChange}
                  value={values.company.bs}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Save Details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
