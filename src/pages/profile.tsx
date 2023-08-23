import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { ContactAPI } from "apis/ContactAPI";
import { Contact } from "apis/entities/contacts";
import { ContactDetail } from "components/ContactDetail";
import ContactProfile from "components/ContactProfile";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Params {
  [key: string]: string | undefined;
}

const Profile = () => {
  let navigate = useNavigate();
  const { id } = useParams<Params>();
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const fetchedContact = await ContactAPI.fetchContactById(Number(id));
        setContact(fetchedContact);
      } catch (error) {
        console.error("Failed to fetch contact", error);
      }
    };

    if (id) {
      fetchContact();
    }
  }, [id]);

  const handleUpdate = async (updatedContact: Contact) => {
    try {
      await ContactAPI.updateContact(Number(id), updatedContact);
      setContact(updatedContact);
      toast.success("Contact updated successfully!", {
        autoClose: 3000,
        onClose: () => setTimeout(() => navigate("/"), 3000),
      });
    } catch (error) {
      console.error("Failed to update contact", error);
      toast.error("Failed to update contact. Please try again.", {
        autoClose: 3000,
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
              <Typography variant="h4" sx={{ fontWeight: "700" }}>
                Profile
              </Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                {contact && (
                  <>
                    <Grid xs={12} md={6} lg={4}>
                      <ContactProfile contact={contact} />
                    </Grid>
                    <Grid xs={12} md={6} lg={8}>
                      <ContactDetail contact={contact} onSave={handleUpdate} />
                    </Grid>
                  </>
                )}
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
      <ToastContainer />
    </>
  );
};

export default Profile;
