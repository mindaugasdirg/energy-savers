import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import Box from "@mui/material/Box";
import { red } from "@mui/material/colors";

ChartJS.register(ArcElement, Tooltip, Legend);

export type PieData = { labels: string[]; values: number[] };

const pieData = ({ labels, values }: PieData) => ({
  labels,
  datasets: [
    {
      label: "# of Votes",
      data: values,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
});

export const EnergyPie = ({ data }: { data: PieData }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <h1>Good Morning Joey!</h1>
    <Box
      sx={{
        width: "90%",
        padding: "24px 20px", // theme padding
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: 4,
      }}
    >
      <h3>
        Your energy utilisation in the last 7 days increased by 15%
        <span>
          <ShowChartIcon sx={{ color: "red", marginLeft: "8px" }} />
        </span>
      </h3>

      <Pie data={pieData(data)} />
    </Box>
  </div>
);
