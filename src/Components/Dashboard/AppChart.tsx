import { useState } from "react";
import SingleVariableChart from "./SingleVariableChart";
import { AppDetails } from "../../data/webAppData";
import DoubleVariableChart from "./DoubleVariableChart";
import Tabs from "../Shared/Tabs";

type AppChartProps = {
    appData: AppDetails[],
}

export default function AppChart({appData}:AppChartProps){
    const [current,setCurrent] = useState("Single Parameter Chart")
    const tabs = [
        {
            name: "Single Parameter Chart",
            body: <SingleVariableChart appData={appData}/>
        },
        {
            name: "Double Parameter Chart",
            body: <DoubleVariableChart appData={appData}/>
        }
    ]
    return (
        <div>
            <Tabs tabs={tabs} current={current} setCurrent={setCurrent} />
        </div>
    )
}