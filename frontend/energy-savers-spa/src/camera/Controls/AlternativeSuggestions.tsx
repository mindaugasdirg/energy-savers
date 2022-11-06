import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { HighlightTypography } from "../../common/components/ThemedTypography";
import { Suggestion } from "./types";

interface Props {
  suggestions: Suggestion[];
  onSuggestionClicked: (index: number) => void;
}

export const AlternativeSuggestions = ({ suggestions, onSuggestionClicked }: Props) => {
  return (
    <Container maxWidth="xl">
      <HighlightTypography variant="h2">More green picks</HighlightTypography>
      <Grid container direction="column" spacing={2}>
        {suggestions.map((suggestion, index) =>
          <Grid item container key={index}>
            <Grid item sx={{ maxWidth: "100px", maxHeight: "100px" }}>
              <img alt={suggestion.label} src={suggestion.url} width={100} height={100} />
            </Grid>
            <Grid item container direction="column" xs={6}>
              <Grid item>
                <Typography variant="h6">{suggestion.label}</Typography>
              </Grid>
              <Grid item>
                <HighlightTypography variant="subtitle2">{suggestion.provider}</HighlightTypography>
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => onSuggestionClicked(index)}>
                +{suggestion.value}
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container >
  );
};