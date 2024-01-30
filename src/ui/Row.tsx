import Stack from "@mui/material/Stack";
import { type StackProps } from "@mui/material";

/**
 * A horizontal stack
 */
export function Row(props: StackProps) {
  return <Stack direction="row" alignItems="center" {...props} />;
}
