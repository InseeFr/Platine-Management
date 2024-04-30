import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { APISchemas } from "../types/api";

type Props = {
  identificationName?: string;
  address?: APISchemas["AddressDto"];
};
export const AddressInformations = ({ identificationName, address }: Props) => {
  const isStreetBoxDisplayed =
    address?.streetNumber || address?.repetitionIndex || address?.streetType || address?.streetName;

  const isCodeBoxDisplayed =
    address?.zipCode || address?.cityName || address?.cedexCode || address?.cedexName;

  const isSupplementDisplayed = address?.addressSupplement || address?.specialDistribution;
  return (
    <Stack spacing={1} typography={"bodyMedium"}>
      {identificationName && (
        <Typography variant="titleSmall">{identificationName.toUpperCase()}</Typography>
      )}
      {isStreetBoxDisplayed && (
        <Box component={"span"}>
          {address?.streetNumber} {address?.repetitionIndex} {address?.streetType} {address?.streetName}
        </Box>
      )}
      {isSupplementDisplayed && (
        <Box component={"span"}>
          {address?.addressSupplement} {address?.specialDistribution}
        </Box>
      )}
      {isCodeBoxDisplayed && (
        <Box component={"span"}>
          {address?.zipCode} {address?.cityName} {address?.cedexCode} {address?.cedexName}
        </Box>
      )}
      <Box component={"span"}>{address?.countryName}</Box>
    </Stack>
  );
};
