import { useCallback, useMemo, useState, useEffect } from "react";
import { subDays, subHours } from "date-fns";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { ContactsTable } from "components/ContactsTable";
import { applyPagination } from "utils/applyPagination";
import { ContactAPI } from "apis/ContactAPI";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [contacts, setContacts] = useState([]); // New state for fetched contacts

  useEffect(() => {
    // Fetch contacts from API
    const fetchContacts = async () => {
      try {
        const fetchedContacts = await ContactAPI.fetchAllContacts();
        setContacts(fetchedContacts);
      } catch (error) {
        console.error("Failed to fetch contacts", error);
      }
    };

    fetchContacts();
  }, []);

  const customers = useMemo(() => {
    console.log("contacts", contacts);
    return applyPagination(contacts, page, rowsPerPage);
  }, [contacts, page, rowsPerPage]);

  const handlePageChange = useCallback((event: any, value: any) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  }, []);

  const handleAddButton = () => {
    navigate(`/register`);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4" sx={{ fontWeight: "700" }}>
                  Contacts
                </Typography>
              </Stack>
              <div>
                <Button
                  startIcon={<SvgIcon fontSize="small">{<PlusIcon />}</SvgIcon>}
                  variant="contained"
                  onClick={() => handleAddButton()}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <ContactsTable
              count={contacts.length}
              items={customers}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Home;
