import Card from "@mui/material/Card";
import { TitleWithIconAndDivider } from "../TitleWithIconAndDivider";
import { BinocularIcon } from "../Icon/BinocularIcon";
import { Row } from "../Row";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CircularProgress, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { AssociateSurveysTable } from "./AssociateSurveysTable";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import { useParams } from "react-router-dom";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import { ContactHeader } from "./ContactHeader";
import { AssociateAnotherAccount } from "./AssociateAnotherAccount";
import { AddRightsForm } from "./AddRightsForm";

export const AddRightsManagement = () => {
  const { id } = useParams();
  const { data: contact } = useFetchQuery("/api/contacts/{id}", {
    urlParams: {
      id: id!,
    },
  });

  if (!contact) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }
  return (
    <>
      <ContactHeader contact={contact} />
      <Divider variant="fullWidth" />
      <Stack p={3} spacing={3}>
        <Card sx={{ mx: 2, px: 6, py: 3 }} elevation={2}>
          <TitleWithIconAndDivider
            title={`Ajouter d’autres questionnaires liées au compte “${id}” `}
            IconComponent={BinocularIcon}
          />
          <Row spacing={1}>
            <InfoOutlinedIcon fontSize="smallIcon" />
            <Typography variant="bodyMedium">
              La liste des questionnaires auxquelles le répondant peut accéder avec son identifiant{" "}
              <strong>{id}</strong> peut être élargie à des questionnaires rattachés à son adresse
              courriel et figurant dans la liste ci-dessous
            </Typography>
          </Row>
          <AssociateSurveysTable />
        </Card>
        <Card sx={{ mx: 2, px: 6, py: 3 }} elevation={2}>
          <TitleWithIconAndDivider
            title={`Associer un autre compte au compte ${id}`}
            IconComponent={GroupAddOutlinedIcon}
          />
          <AssociateAnotherAccount contact={contact} />
        </Card>
        <Card sx={{ mx: 2, px: 6, py: 3 }} elevation={2}>
          <TitleWithIconAndDivider
            title={`Ajouter d'autres questionnaires au compte ${id} à partir de leurs caractéristiques`}
            IconComponent={LibraryAddOutlinedIcon}
          />
          <AddRightsForm contact={contact} />
        </Card>
      </Stack>
    </>
  );
};
