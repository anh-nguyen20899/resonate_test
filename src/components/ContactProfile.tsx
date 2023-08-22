import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { Contact } from "apis/entities/contacts";
import { getInitials } from "utils/getInitials";
import { getRandomColor } from "utils/getRandomColor";

interface ContactProps {
  contact: Contact;
}

const ContactProfile = ({ contact }: ContactProps) => {
  const avatarBgColor = getRandomColor();

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{
              height: 80,
              mb: 2,
              width: 80,
              backgroundColor: avatarBgColor,
            }}
          >
            {getInitials(contact.name)}
          </Avatar>
          <Typography gutterBottom variant="h5">
            {contact.name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {contact.address.street} {contact.address.city}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default ContactProfile;
