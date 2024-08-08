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
  };
};

export const SearchQuestioningTableRow = ({ questioning }: Props) => {
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
            maxWidth: "14vw",
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
            maxWidth: "14vw",
            textOverflow: "ellipsis",
          }}
          label={
            collectStatus.find(state => state.value === questioning.lastCommunication)?.label ??
            "Aucun état"
          }
          color={getCollectStateChipColor(questioning.status)}
        />
      </TableCell>
      <TableCell>
        {questioning.collectDate
          ? new Date(Date.parse(questioning.collectDate)).toLocaleDateString()
          : "N/A"}
      </TableCell>
      <TableCell align="right">
        <ChevronRightIcon fontSize="navigateIcon" color="primary" />
      </TableCell>
    </TableRow>
  );
};
