import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface Suggestion {
  imgSrc: string;
  name: string;
  saving: string;
  score: number;
}

interface Props {
  suggestions: Suggestion[];
  onSuggestionClicked: (index: number) => void;
}

export const AlternativeSuggestions = ({ suggestions, onSuggestionClicked }: Props) => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h5">More green picks</Typography>
      <Grid container direction="column" spacing={2}>
        {suggestions.map((suggestion, index) =>
          <Grid item container key={index}>
            <Grid item sx={{ maxWidth: "100px", maxHeight: "100px" }}>
              <img alt={suggestion.name} src={suggestion.imgSrc} width={100} height={100} />
            </Grid>
            <Grid item container direction="column" xs={6}>
              <Grid item>
                <Typography variant="h6">{suggestion.name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">{suggestion.saving}</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button onClick={() => onSuggestionClicked(index)}>
                +{suggestion.score}
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container >
  );
};