import React, { useEffect, useState } from "react";
import { EnergyPie, PieData } from "../plot/EnergyPie";
import Divider from '@mui/material/Divider';


const splitLabels = (json: {name: string, value: number}[]) => {
    const labels = json.map(x => x.name);
    const values = json.map(x => x.value);

    return {
        labels,
        values
    }
}

export const WeeklyStats = () => {
    const [usedData, setUsedData] = useState<PieData | undefined>(undefined);
    const [optimalData, setOptimalData] = useState<PieData | undefined>(undefined);
    
    useEffect(() => {
        const url = "https://localhost:7091/Energy/categories?energyType=";

        const sendRequest = async (energyType: string) => {
            const response = await fetch(url + energyType);
            const json = await response.json();
            return json;
        }

        const fetchData = async () => {
          try {
            const [usedResponse, optimalResponse] = await Promise.all([
                await sendRequest("0"),
                await sendRequest("1")
            ])

            setUsedData(splitLabels(usedResponse.categories));
            setOptimalData(splitLabels(optimalResponse.categories));
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
      }, []);

    return ( 
        <>
            {usedData ? <EnergyPie data={usedData}/> : <p>No data</p> } 
            <Divider light /> 
            {optimalData ? <EnergyPie data={optimalData}/> : <p>No data</p> }
        </>
    );
};
