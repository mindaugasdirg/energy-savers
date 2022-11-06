import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import React from "react";
import { getApiUrl } from "../../common/apiUtilities";
import { usePost } from "../../common/hooks";
import { Suggestion } from "./types";

interface Props {
    imgData: string;
    onLoad: (responses: Suggestion[]) => void;
}

export const SuggestionLoading = ({ imgData, onLoad }: Props) => {

    const image = React.useMemo(() => imgData.substring(22), [imgData]);

    usePost(getApiUrl("/image"), { image }, onLoad);

    return (
        <Container maxWidth="xl">
            <CircularProgress />
        </Container>
    );
};