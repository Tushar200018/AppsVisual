import {useEffect, useMemo, useState } from "react"
import { AppDetails } from "../../data/webAppData"
import { ArcElement, BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, PointElement, Title, Tooltip } from "chart.js"
import { Dropdown } from "../Shared/Dropdown"
import MultiAxisBarGraph from "./MultiAxisBarGraph"
import ScatterChart from "./ScatterChart"
import { Filter } from "../../Pages/Dashboard"
import { ChartComponentMapType } from "./SingleVariableChart"

type AppChartProps = {
    appData: AppDetails[],
}

Chart.register(CategoryScale,ArcElement,Title,LinearScale,BarElement,BarController,Tooltip, Legend,PointElement)

const yParamsLst = [
    {text: "Ratings"},
    {text: "Reviews"},
    {text: "Installations"},
    {text: "Positive Reviews"},
    {text: "Negative Reviews"},
]


type YParamMapType = {
    [label:string]:Array<number>
}

export const Charts:Array<Filter> = [{text:"Bar Graph"}, {text:"Scatter Chart"}]


export default function DoubleVariableChart({appData}:AppChartProps){
    const [chartType,setChartType] = useState({text:"Bar Graph"})

    const [yParam1,setYParam1] = useState(yParamsLst[2])
    const [yParam2,setYParam2] = useState(yParamsLst[1])

    const YAxisDataMap = useMemo(()=>{
        const map:YParamMapType = {
            "Ratings": appData.map(data=>data.rating),
            "Reviews": appData.map(data=>data.reviews),
            "Installations": appData.map(data=>data.installs),
            "Positive Reviews": appData.map(data => data.positiveReviews),
            "Negative Reviews": appData.map(data=>data.negativeReviews)
        }
        return map
    },[appData])
    
    const [yData1,setYData1] = useState(YAxisDataMap[yParam1.text])
    const [yData2,setYData2] = useState(YAxisDataMap[yParam2.text])

    const [chartData,setChartData] = useState({
        labels: appData.map(data=>data.name),
        datasets:[
            {
                label: yParam1.text,
                data: yData1,
                backgroundColor:"blue",
                yAxisID: 'y1',
            },
            {
                label: yParam2.text,
                data: yData2,
                backgroundColor:"orange",
                yAxisID: 'y2',
            }
        ]
    })

    const ChartComponentMap = useMemo(()=>{
        const chartMap:ChartComponentMapType = {
            "Bar Graph": <MultiAxisBarGraph chartData={chartData} yParam1={yParam1.text} yParam2={yParam2.text}/>,
            "Scatter Chart": <ScatterChart
                            xData={yData1}
                            yData={yData2}
                            xParam={yParam1.text}
                            yParam={yParam2.text}
                            appNames={appData.map(data=>data.name)}
                        />
        } 
        return chartMap
    },[chartData,yParam1,yParam2,yData1,yData2,appData])

    const [chartComponent,setChartComponent] = useState(ChartComponentMap[chartType.text])

    useEffect(()=>{
        setChartComponent(ChartComponentMap[chartType.text])
    },[chartType,ChartComponentMap])

    useEffect(()=>{
        setYData1(YAxisDataMap[yParam1.text])
        setYData2(YAxisDataMap[yParam2.text])
    },[appData,yParam1,yParam2,YAxisDataMap])

    useEffect(()=>{
        console.log(yData2)
        setChartData({
            labels: appData.map(data=>data.name),
            datasets:[
                {
                    label: yParam1.text,
                    data: yData1,
                    backgroundColor:"blue",
                    yAxisID: 'y1',
                },
                {
                    label: yParam2.text,
                    data: yData2,
                    backgroundColor:"orange",
                    yAxisID: 'y2',
                }
            ]
        })
    },[appData,yData1,yData2,yParam1,yParam2])

    return (
        <div className="w-full flex items-center flex-col py-5 px-2 mt-8 md:px-4 shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <div className="flex flex-wrap justify-center mb-12">
                <div className="md:mr-10 mr-2 mb-5 min-w-[10rem]">
                    <Dropdown
                        title="Chart Type"
                        setFilter={setChartType}
                        filterOptions={Charts}
                        selectedFilter={chartType}
                    />
                </div>
                <div className="md:mr-10 mr-2 mb-5 min-w-[10rem]">
                    <Dropdown
                        title="Parameter 1"
                        setFilter={setYParam1}
                        filterOptions={yParamsLst}
                        selectedFilter={yParam1}
                    />
                </div>
                <div className="md:mr-10 mr-2 mb-5 min-w-[10rem]">
                    <Dropdown
                        title="Parameter 2"
                        setFilter={setYParam2}
                        filterOptions={yParamsLst}
                        selectedFilter={yParam2}
                    />
                </div>
            </div>
            {
                chartComponent
            }
            
        </div>
    )
}