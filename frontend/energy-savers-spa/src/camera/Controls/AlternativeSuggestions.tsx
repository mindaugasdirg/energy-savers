import Button from "@mui/material/Button";
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
    <Grid container direction="column" spacing={2} sx={{ marginLeft: "24px", marginRight: "24px" }}>
      <Grid item sx={{ marginBottom: "32px" }}>
        <HighlightTypography variant="h2">More green picks</HighlightTypography>
      </Grid>
      <Grid container direction="column" spacing={6}>
        {suggestions.map((suggestion, index) =>
          <Grid item container wrap="nowrap" key={index}>
            <Grid item sx={{ maxWidth: "80px", maxHeight: "80px", marginRight: "16px" }}>
              <img alt={suggestion.label} src={suggestion.url} width={80} height={80} />
            </Grid>
            <Grid item container direction="column" xs={6} sx={{ marginTop: "16px" }}>
              <Grid item zeroMinWidth>
                <Typography variant="h6" noWrap>{suggestion.label.length > 20 ? `${suggestion.label.substring(0, 20)}...` : suggestion.label}</Typography>
              </Grid>
              <Grid item>
                <HighlightTypography variant="subtitle2">{suggestion.provider}</HighlightTypography>
              </Grid>
            </Grid>
            <Grid item sx={{ marginTop: "16px" }}>
              <Button variant="contained" onClick={() => onSuggestionClicked(index)}>
                +{suggestion.value}
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};