import { Button, CardActionArea, CircularProgress, Stack } from "@mui/material";
import { Row } from "../../ui/Row";
import { useInfiniteFetchQuery } from "../../hooks/useFetchQuery.ts";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useState } from "react";
import { VisibilitySpy } from "../../ui/VisibilitySpy.tsx";
import { CardGrid } from "../../ui/Layout/CardGrid.tsx";
import { type APIResponse } from "../../types/api.ts";
import { type ItemOf } from "../../types/utils.ts";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import { Link as CustomLink } from "../../ui/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextWithLeftIcon } from "../../ui/TextWithLeftIcon.tsx";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailIcon from "@mui/icons-material/Email";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import { useSearchFilterParams } from "../../hooks/useSearchFilter.ts";
import { ContactCardTitle } from "../../ui/SurveyUnit/SurveyUnitContacts.tsx";
import EditIcon from "@mui/icons-material/Edit";

const endpoint = "/api/contacts/search" as const;
type Item = ItemOf<Required<APIResponse<typeof endpoint, "get">>["content"]>;

export const SearchContacts = () => {
  const {
    results: contacts,
    hasNextPage,
    fetchNextPage,
    isLoading,
    count,
  } = useInfiniteFetchQuery(endpoint, {
    query: { ...useSearchFilterParams("contacts"), pageSize: 20, sort: "identifier" },
  });
  const [tab, setTab] = useState("me");

  return (
    <Stack spacing={3} sx={{ minHeight: 0 }}>
      <Row justifyContent={"space-between"}>
        <ToggleButtonGroup value={tab} exclusive onChange={(_, v) => setTab(v)}>
          <ToggleButton value="me" aria-label="left aligned">
            Mes contacts
          </ToggleButton>
          <ToggleButton value="all" aria-label="left aligned">
            Tout
          </ToggleButton>
        </ToggleButtonGroup>
        {count && <Typography variant="titleSmall">résultat: {count} contact(s)</Typography>}
      </Row>
      {isLoading && (
        <Row justifyContent={"space-around"} height={"100%"}>
          <CircularProgress />
        </Row>
      )}
      {!isLoading && contacts.length === 0 && (
        <Row justifyContent={"space-around"} height={"100%"}>
          <Typography variant="titleMedium">Aucun résultat</Typography>
        </Row>
      )}
      <CardGrid>
        {contacts.map(c => (
          <div key={c.identifier}>
            {/* This div prevent card from behing resized by the grid */}
            <ItemCard contact={c} />
          </div>
        ))}
        {hasNextPage && <VisibilitySpy onVisible={fetchNextPage} />}
      </CardGrid>
      <Button
        sx={{
          position: "fixed",
          bottom: "48px",
          right: "32px",
          borderRadius: 24,
          typography: "titleSmall",
          fontWeight: "500",
        }}
        size="large"
        fullWidth={false}
        variant="contained"
        endIcon={<EditIcon />}
      >
        <CustomLink to={"/contacts/createContact"} color="inherit" underline="none">
          Créer un nouveau contact
        </CustomLink>
      </Button>
    </Stack>
  );
};

export function ItemCard({ contact }: Readonly<{ contact: Item }>) {
  const isDisabled = false; // TODO : calculated this value

  const listSurveyUnitNames =
    contact.listSurveyUnitNames !== undefined && contact.listSurveyUnitNames?.length > 6
      ? `${contact.listSurveyUnitNames?.slice(0, 6).join(", ")}...`
      : contact.listSurveyUnitNames?.join(", ");

  const listSourcesId =
    contact.listSourcesId !== undefined && contact.listSourcesId?.length > 6
      ? `${contact.listSourcesId?.slice(0, 6).join(", ")}...`
      : contact.listSourcesId?.join(", ");

  return (
    <Card elevation={2} variant={isDisabled ? "disabled" : undefined} sx={{ height: "100%" }}>
      <CardActionArea sx={{ height: "100%" }} component={Link} to={`/contacts/${contact.identifier}`}>
        <Box px={3} py={2}>
          <Typography align="right" variant="titleLarge" color="text.tertiary" gutterBottom>
            #{contact.identifier}
          </Typography>

          <Stack gap={2.5}>
            <ContactCardTitle firstName={contact.firstName} lastName={contact.lastName} />

            <Stack spacing={0.5} color="text.secondary">
              <TextWithLeftIcon IconComponent={LocationOnIcon} text={contact.city} />
              <TextWithLeftIcon IconComponent={LocalPhoneOutlinedIcon} text={contact.phone} />
              <TextWithLeftIcon IconComponent={EmailIcon} text={contact.email} />
              <TextWithLeftIcon IconComponent={DesktopWindowsOutlinedIcon} text={contact.function} />
            </Stack>

            <Stack spacing={1} typography="titleSmall" color="text.hint">
              <div>{listSurveyUnitNames ?? ""}</div>
              <div>{listSourcesId ?? ""}</div>
            </Stack>
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  );
}
