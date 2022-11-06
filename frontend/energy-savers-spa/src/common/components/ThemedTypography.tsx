import { DefaultComponentProps, OverrideProps } from "@mui/material/OverridableComponent";
import Typography, { TypographyTypeMap } from "@mui/material/Typography";

export const HighlightTypography = <C extends React.ElementType>(props: DefaultComponentProps<TypographyTypeMap> | { component: C; } & OverrideProps<TypographyTypeMap, C>) => 
  <Typography {...props} color="primary" />

export const AccentedTypography = <C extends React.ElementType>(props: DefaultComponentProps<TypographyTypeMap> | { component: C; } & OverrideProps<TypographyTypeMap, C>) => 
  <Typography {...props} color="secondary" />