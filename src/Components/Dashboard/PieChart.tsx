// src/components/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Dropdown } from "../Shared/Dropdown";
import { Charts, yParamsLst } from "./SingleVariableChart";
import { Filter } from "../../Pages/Dashboard";

type ChartProps = {
    chartData: any,
    yParam: string
}


function PieChart({ chartData,yParam }: ChartProps) {

    return (
        <div className="w-[90%] h-[70vh]">
            <Pie
                data={chartData}
                options={{
                    maintainAspectRatio: false,
                   
                }}
            />
        </div>
    );
}
export default PieChart;