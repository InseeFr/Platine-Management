import { Box, CardActionArea, Stack } from "@mui/material";
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
import Typography from "@mui/material/Typography";
import { BinocularIcon } from "../../ui/Icon/BinocularIcon.tsx";

const endpoint = "/api/campaigns" as const;
type Item = ItemOf<Required<APIResponse<typeof endpoint, "get">>["content"]>;

export const SearchCampaigns = () => {
  const { results: contacts, hasNextPage, fetchNextPage } = useInfiniteFetchQuery(endpoint);
  const [tab, setTab] = useState("me");
  return (
    <Stack spacing={3} sx={{ minHeight: 0 }}>
      <Row justifyContent={"space-between"}>
        <ToggleButtonGroup value={tab} exclusive onChange={(_, v) => setTab(v)}>
          <ToggleButton value="me" aria-label="left aligned">
            Mes enquêtes
          </ToggleButton>
          <ToggleButton value="all" aria-label="left aligned">
            Tout
          </ToggleButton>
        </ToggleButtonGroup>
        <FilterListBySelector />
      </Row>

      <CardGrid>
        {contacts.map(c => (
          <div key={c.id}>
            {/* This div prevent card from behing resized by the grid */}
            <ItemCard campaign={c} />
          </div>
        ))}
        {hasNextPage && <VisibilitySpy onVisible={fetchNextPage} />}
      </CardGrid>
    </Stack>
  );
};

export function ItemCard({ campaign }: { campaign: Item }) {
  const isDisabled = false; // TODO : calculated this value
  return (
    <Card elevation={2} variant={isDisabled ? "disabled" : undefined}>
      <CardActionArea component={Link} to={`/campaigns/${campaign.id}`}>
        <Box px={3} py={2.5}>
          <Row gap={1} mb={5}>
            <BinocularIcon />
            <Typography variant="titleLarge" fontWeight={600} color="text.primary">
              {campaign.id}
            </Typography>
          </Row>
          <Box mb={2} typography="bodyMedium" fontWeight={600} color="text.secondary">
            {campaign.campaignWording}
          </Box>
          <Box typography="bodyMedium" fontWeight={600} color="text.secondary">
            {campaign.year}
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
