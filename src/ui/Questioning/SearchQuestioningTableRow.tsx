import { Chip, TableCell, TableRow, Tooltip } from "@mui/material";
import { style } from "../Contact/SearchContactTable.tsx";
import { Link } from "../Link.tsx";
import { collectStatus } from "../../constants/collectStatus.ts";
import { getCollectStateChipColor } from "./SearchQuestioningTable.tsx";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type Props = {
  questioning: {
    id: number;
    campaign: string;
    identificationCode: string;
    contacts: {
      id: number;
      firstName: string;
      lastName: string;
    }[];
    status: string;
    lastCommunication: string;
    collectDate?: string;
    quality: string;
  };
  stateFilter: string;
};

export const SearchQuestioningTableRow = ({ questioning, stateFilter }: Props) => {
  return (
    <TableRow
      key={questioning.identificationCode}
      sx={style.root}
      hover
      component={Link}
      to={`/questionings/${questioning.id}`}
    >
      <TableCell>{questioning.campaign}</TableCell>
      <TableCell>{questioning.identificationCode}</TableCell>

      {questioning.contacts?.length && questioning.contacts?.length > 2 ? (
        <Tooltip
          title={questioning.contacts
            .slice(2)
            .map(contact => `${contact.firstName} ${contact.lastName}`)
            .join(", ")}
          sx={{ maxWidth: "30vw" }}
        >
          <TableCell sx={{ wordBreak: "break-word" }}>
            {`${questioning.contacts[0].firstName} ${questioning.contacts[0].lastName}, ${questioning.contacts[1].firstName} ${questioning.contacts[1].lastName}...`}
          </TableCell>
        </Tooltip>
      ) : (
        <TableCell sx={{ wordBreak: "break-word" }}>
          {questioning.contacts?.map(contact => `${contact.firstName} ${contact.lastName}`).join(", ")}
        </TableCell>
      )}

      <TableCell>
        <Chip
          sx={{
            typography: "titleSmall",
            maxWidth: stateFilter === "recovery" ? "11vw" : "14vw",
            textOverflow: "ellipsis",
          }}
          label={collectStatus.find(state => state.value === questioning.status)?.label ?? "Aucun état"}
          color={getCollectStateChipColor(questioning.status)}
        />
      </TableCell>
      <TableCell>
        <Chip
          sx={{
            typography: "titleSmall",
            maxWidth: stateFilter === "recovery" ? "11vw" : "14vw",
            textOverflow: "ellipsis",
          }}
          label={
            collectStatus.find(state => state.value === questioning.lastCommunication)?.label ??
            "Aucun état"
          }
        />
      </TableCell>
      <TableCell>
        {questioning.collectDate
          ? new Date(Date.parse(questioning.collectDate)).toLocaleDateString()
          : "N/A"}
      </TableCell>
      {stateFilter === "recovery" && <TableCell>{questioning.quality}</TableCell>}
      <TableCell align="right">
        <ChevronRightIcon fontSize="navigateIcon" color="primary" />
      </TableCell>
    </TableRow>
  );
};
