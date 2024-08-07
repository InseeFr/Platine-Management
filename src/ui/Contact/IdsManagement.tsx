import Card from "@mui/material/Card";
import { TitleWithIconAndDivider } from "../TitleWithIconAndDivider.tsx";
import { BinocularIcon } from "../Icon/BinocularIcon.tsx";
import { APISchemas } from "../../types/api.ts";
import { Row } from "../Row.tsx";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { AssociateSurveysTable } from "./AssociateSurveysTable.tsx";
import { AssociateAnotherAccount } from "./AssociateAnotherAccount.tsx";

type Props = {
  contact: APISchemas["ContactDetailsDto"];
};

export const IdsManagement = ({ contact }: Props) => {
  return (
    <Stack spacing={3}>
      <Card sx={{ mx: 2, px: 6, py: 3 }} elevation={2}>
        <TitleWithIconAndDivider
          title={`Ajouter d’autres enquêtes liées à l’adresse de messagerie “${contact.email}” `}
          IconComponent={BinocularIcon}
        />
        <Row spacing={1}>
          <InfoOutlinedIcon fontSize="smallIcon" />
          <Typography variant="bodyMedium">
            La liste des enquêtes auxquelles le répondant peut accéder avec son identifiant{" "}
            <strong>{contact.identifier}</strong> peut être élargie à des enquêtes rattachées à son
            adresse courriel et figurant dans la liste ci-dessous
          </Typography>
        </Row>
        <AssociateSurveysTable />
      </Card>
      <Card sx={{ mx: 2, px: 6, py: 3 }} elevation={2}>
        <TitleWithIconAndDivider
          title={`Associer un autre compte au compte ${contact.identifier}`}
          IconComponent={GroupAddOutlinedIcon}
        />
        <AssociateAnotherAccount contact={contact} />
      </Card>
    </Stack>
  );
};
