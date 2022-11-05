import React, { useEffect, useState } from "react";
import { EnergyPie, PieData } from "../plot/EnergyPie";

const splitLabels = (json: {name: string, value: number}[]) => {
    const labels = json.map(x => x.name);
    const values = json.map(x => x.value);

    return {
        labels,
        values
    }
}

export const WeeklyStats = () => {
    const [data, setData] = useState<PieData | undefined>(undefined);
    
    useEffect(() => {
        const url = "https://localhost:7091/Energy/categories?energyType=0";

        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            setData(splitLabels(json.categories));
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
      }, []);

    return ( data ? <EnergyPie data={data}/> : <p>No data</p>);
};
