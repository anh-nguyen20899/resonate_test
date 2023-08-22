import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { getInitials } from "utils/getInitials";
import { getRandomColor } from "utils/getRandomColor";
import { Contact } from "apis/entities/contacts";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { ContactAPI } from "apis/ContactAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ContactsTable = (props: any) => {
  let navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    null
  );
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const handleRowClick = (customer: Contact) => {
    navigate(`/contacts/${customer.id}`);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedContactId(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedContactId) {
      try {
        await ContactAPI.deleteContact(selectedContactId);
        setOpenDialog(false);
        toast.success("Contact successfully deleted!");
      } catch (error) {
        console.error("Failed to delete contact", error);
        toast.error("Failed to delete contact. Please try again.");
      }
    }
  };

  return (
    <>
      <Card>
        <Box sx={{ maxWidth: "100%", overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ paddingLeft: 6, fontWeight: 700 }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Company</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer: Contact) => {
                const isSelected = selected.includes(customer.id);
                const avatarBgColor = getRandomColor();
                const location = `${customer.address.suite} ${customer.address.street}, ${customer.address.city}`;

                return (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={isSelected}
                    onClick={() => handleRowClick(customer)}
                  >
                    <TableCell sx={{ paddingLeft: 6 }}>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar
                          sx={{
                            backgroundColor: avatarBgColor,
                          }}
                        >
                          {getInitials(customer.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {customer.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{location}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.company.name}</TableCell>
                    <TableCell align="center">
                      <SvgIcon
                        fontSize="small"
                        sx={{
                          color: "red",
                          "&:hover": {
                            cursor: "pointer",
                            transform: "scale(1.05)",
                          },
                        }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          handleDeleteClick(Number(customer.id));
                        }}
                      >
                        <TrashIcon />
                      </SvgIcon>{" "}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10]}
        />
      </Card>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

ContactsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
