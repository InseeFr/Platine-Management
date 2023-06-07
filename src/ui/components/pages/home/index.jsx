import { Box, Typography } from "@mui/material";
import { useAPI } from "core/hooks";
import { useEffect, useState } from "react";
import { HomeChip } from "ui/shared/chip";

export const Home = () => {
  const [nbContacts, setNbContacts] = useState(0);
  const [nbCampaigns, setNbCampaigns] = useState(0);
  const [nbSu, setNbSu] = useState(0);

  const { getAllContacts, getAllCampaigns, getAllSurveyUnits } = useAPI();

  useEffect(() => {
    (async () => {
      const { data: contacts, error: errorContacts } = await getAllContacts();
      if (!errorContacts) {
        setNbContacts(contacts?.totalElements);
      }
      const { data: campaigns, error: errorCampaigns } = await getAllCampaigns();
      if (!errorCampaigns) {
        setNbCampaigns(campaigns?.totalElements);
      }
      const { data: sus, error: errorSus } = await getAllSurveyUnits();
      if (!errorSus) {
        setNbSu(sus?.totalElements);
      }
    })();
  }, []);

  return (
    <>
      <Typography variant="h3">Welcome Home !</Typography>
      <Box sx={{ display: "flex" }}>
        <HomeChip nb={nbCampaigns} label="campagnes"></HomeChip>
        <HomeChip nb={nbContacts} label="contacts"></HomeChip>
        <HomeChip nb={nbSu} label="unités enquêtées"></HomeChip>
      </Box>
    </>
  );
};
