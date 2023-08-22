import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { ContactAPI } from "apis/ContactAPI";
import { Contact } from "apis/entities/contacts";
import { ContactDetail } from "components/ContactDetail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  let navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);

  const handleCreate = async (newContact: Contact) => {
    try {
      const createdContact = await ContactAPI.createContact(newContact);
      setContact(createdContact);
      console.log("createdContact", createdContact);

      toast.success("Contact successfully created!", {
        onClose: () => setTimeout(() => navigate("/"), 3000),
      });
    } catch (error) {
      toast.error("Failed to create contact. Please try again.", {
        onClose: () => setTimeout(() => navigate("/"), 3000),
      });
    }
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography
                variant="h4"
                sx={{ fontWeight: "700", textAlign: "center" }}
              >
                Create contact
              </Typography>
            </div>
            <div>
              <Grid container xs={12} md={12} lg={12}>
                <ContactDetail contact={contact} onSave={handleCreate} />
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
      <ToastContainer />
    </>
  );
};

export default Register;
