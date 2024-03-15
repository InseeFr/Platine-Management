import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { APISchemas } from "../types/api";

type Props = {
  identificationName?: string;
  address?: APISchemas["AddressDto"];
};
export const AddressInformations = ({ identificationName, address }: Props) => {
  return (
    <Stack spacing={1} typography={"bodyMedium"}>
      <Typography variant="titleSmall">{identificationName?.toUpperCase()}</Typography>

      <Box component={"span"}>
        {`${address?.streetNumber ?? ""} ${address?.streetType ?? ""} ${
          address?.streetName ? address?.streetName.concat(",") : ""
        }
        ${address?.zipCode ? address?.zipCode.concat(",") : ""} ${address?.cityName ?? ""}`}
      </Box>
      <Box component={"span"}>
        {`
             ${address?.cedexCode ? address?.cedexCode.concat(",") : ""} 
            ${address?.countryName ?? ""} 
      `}
      </Box>
      <Box component={"span"}>{address?.addressSupplement ?? ""}</Box>
      <Box component={"span"}>{address?.specialDistribution ?? ""}</Box>
    </Stack>
  );
};
