import { Chip } from "@mui/material";

type Props = {
  role: string;
};

export const roleColorsWidth = [
  { role: "administrateur", color: "#442F99", width: "145px" },
  { role: "responsable", color: "#0C8C87", width: "127px" },
  { role: "gestionnaire", color: "#3C75A2", width: "129px" },
  { role: "assistance", color: "#5A1741", width: "113px" },
];

export const RoleChip = ({ role }: Props) => {
  const color = role ? roleColorsWidth.find(r => r.role === role.toLowerCase())?.color : "black";
  const width = role ? roleColorsWidth.find(r => r.role === role.toLowerCase())?.width : undefined;
  return (
    <Chip
      label={role}
      variant={"role"}
      style={{
        color: color,
        width: width,
      }}
    />
  );
};
