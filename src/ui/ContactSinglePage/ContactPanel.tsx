import { Tabs } from "@mui/material";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { ContactTab } from "./ContactTab";
import { ContactInformationContent } from "./ContactInformationContent";

type Props = {
  defaultTab: number;
};

export const ContactPanel = ({ defaultTab }: Props) => {
  const [currentTab, setCurrentTab] = useState(defaultTab);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <div>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        sx={{
          px: 5,
          backgroundColor: "white",
        }}
      >
        <ContactTab label={"Infos contact"} />
        <ContactTab label={"Enquête(s)"} />
        <ContactTab label={"Gestion des identifiants"} />
        <ContactTab label={"Gestion des droits"} />
      </Tabs>

      <Stack>
        {currentTab === 0 && <ContactInformationContent />}
        {currentTab === 1 && "1"}
        {currentTab === 2 && "2"}
        {currentTab === 3 && "3"}
      </Stack>
    </div>
  );
};
