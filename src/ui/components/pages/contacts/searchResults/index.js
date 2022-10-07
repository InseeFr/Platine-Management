import { useContext, useEffect, useState } from "react";
import { useAPI } from "core/hooks";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  IconButton,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccreditationsIcons } from "../accreditationsDetail/icons";
import { ContentPasteGo } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AppContext } from "App";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

export const ContactsSearchResults = ({ formValues }) => {
  const { getContacts } = useAPI();
  let [page, setPage] = useState(1);

  const { setLoading } = useContext(AppContext);

  const [pageState, setPageState] = useState({
    data: [],
    total: 0,
    page: 1,
    pageSize: 5,
  });

  const nbPages = Math.ceil(pageState.total / pageState.pageSize);

  const handleChange = (e, p) => {
    setPage(p);
    console.log("p = " + p);
    setPageState(old => ({
      ...old,
      page: p,
    }));
  };

  useEffect(() => {
    setLoading(true);
    setPageState(old => ({ ...old, isLoading: true }));
    (async () => {
      const { data, error } = await getContacts({
        ...formValues,
        pageNo: pageState.page - 1,
        pageSize: pageState.pageSize,
      });
      setLoading(false);
      if (!error && data) {
        setPageState(old => ({
          ...old,
          isLoading: false,
          data: data.content,
          total: data.totalElements,
        }));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState.page, pageState.pageSize]);

  return (
    <>
      (<Typography variant="h6">Nombre de résultats: {pageState.total}</Typography>
      {pageState.data.map(c => (
        <>
          <Accordion
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              p: 0,
              margin: 2,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <PermIdentityIcon size="large" />
              <Divider>
                <Typography variant="h6">{c.identifier}</Typography>
                <Typography>
                  {c.lastName} {c.firstName}
                </Typography>
                <Typography variant="subtitile2" marginLeft="5%">
                  {" "}
                  {c.email}
                </Typography>

                <Link to={"/pilotage/contacts/" + c.identifier}>
                  <IconButton aria-label="Accéder au questionnaire">
                    <ContentPasteGo />
                  </IconButton>
                </Link>
              </Divider>
            </AccordionSummary>
            <AccordionDetails>
              <AccreditationsIcons idec={c.identifier}></AccreditationsIcons>
            </AccordionDetails>
          </Accordion>
        </>
      ))}
      <Stack spacing={2}>
        <Pagination count={nbPages} page={page} onChange={handleChange} />
      </Stack>
      ;
    </>
  );
};
