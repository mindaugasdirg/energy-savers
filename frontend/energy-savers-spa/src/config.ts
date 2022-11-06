export const options = {
    API_URL: process.env.NODE_ENV === "production" ? "https://energy-savers.azurewebsites.net" : "https://localhost:7091",
    IS_PLANET_VIEW_ENABLED: false
};