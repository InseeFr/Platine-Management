import { CardActionArea, Stack } from "@mui/material";
import { FilterListBySelector } from "../../ui/Search/FilterListBySelector.tsx";
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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { TextWithLeftIcon } from "../../ui/TextWithLeftIcon.tsx";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailIcon from "@mui/icons-material/Email";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";

const endpoint = "/api/contacts" as const;
type Item = ItemOf<Required<APIResponse<typeof endpoint, "get">>["content"]>;

export const SearchContacts = () => {
  const { results: contacts, hasNextPage, fetchNextPage } = useInfiniteFetchQuery(endpoint);
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
        <FilterListBySelector />
      </Row>

      <CardGrid>
        {contacts.map(c => (
          <div key={c.identifier}>
            {/* This div prevent card from behing resized by the grid */}
            <ItemCard contact={c} />
          </div>
        ))}
        {hasNextPage && <VisibilitySpy onVisible={fetchNextPage} />}
      </CardGrid>
    </Stack>
  );
};

export function ItemCard({ contact }: { contact: Item }) {
  const isDisabled = false; // TODO : calculated this value
  return (
    <Card elevation={2} variant={isDisabled ? "disabled" : undefined}>
      <CardActionArea component={Link} to={`/contacts/${contact.identifier}`}>
        <Box px={3} py={2}>
          <Typography align="right" variant="titleMedium" color="text.tertiary" gutterBottom>
            #{contact.identifier}
          </Typography>

          <Stack gap={2.5}>
            <Row gap={1}>
              <PersonOutlineOutlinedIcon />
              <Typography
                variant="titleLarge"
                fontWeight={600}
                color="text.primary"
              >{`${contact.firstName} ${contact.lastName}`}</Typography>
            </Row>

            <Stack spacing={0.5} color="text.secondary">
              <TextWithLeftIcon IconComponent={LocationOnIcon} text={contact.address?.cityName} />
              <TextWithLeftIcon IconComponent={LocalPhoneOutlinedIcon} text={contact.phone} />
              <TextWithLeftIcon IconComponent={EmailIcon} text={contact.email} />
              <TextWithLeftIcon IconComponent={DesktopWindowsOutlinedIcon} text={contact.function} />
            </Stack>

            <Stack spacing={1} typography="titleSmall" color="text.hint">
              <div>Carrefour, Auchan, E.Leclerc</div>
              <div>EVA, PIAAC</div>
            </Stack>
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  );
}
