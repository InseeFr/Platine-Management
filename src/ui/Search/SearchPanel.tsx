import { Card, Tab, Tabs } from "@mui/material";
import { useState } from "react";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { Binocular } from "../Icon/Binocular.tsx";
import { SearchContactTabContent } from "./SearchContactTabContent.tsx";
import { SearchSurveyTabContent } from "./SearchSurveyTabContent.tsx";
import { SearchHeader } from "./SearchHeader.tsx";
import { SearchSurveyUnitsTabContent } from "./SearchSurveyUnitsTabContent.tsx";

type SearchPanelProps = {
  defaultTab: number;
};

export const SearchPanel = ({ defaultTab }: SearchPanelProps) => {
  const [currentTab, setCurrentTab] = useState(defaultTab);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <div>
      <Card elevation={2}>
        <Tabs value={currentTab} onChange={handleChange} variant="fullWidth">
          <Tab
            label="Contact"
            classes={"search"}
            icon={<PermIdentityIcon fontSize={"tabTitle"} />}
            iconPosition="top"
          />
          <Tab classes={"search"} label="Enquête" icon={<Binocular />} iconPosition="top" />
          <Tab
            classes={"search"}
            label="Unité enquêtée"
            icon={<CorporateFareIcon fontSize={"tabTitle"} />}
            iconPosition="top"
          />
        </Tabs>

        <SearchHeader tab={currentTab} />
        {currentTab === 0 && <SearchContactTabContent />}
        {currentTab === 1 && (
          <SearchSurveyTabContent
            surveys={[
              {
                shortWording: "enquête",
                year: "2019",
                periodicity: "periode",
              },
            ]}
          />
        )}
        {currentTab === 2 && <SearchSurveyUnitsTabContent />}
      </Card>
    </div>
  );
};
