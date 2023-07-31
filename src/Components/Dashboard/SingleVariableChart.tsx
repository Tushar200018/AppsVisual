import {ReactElement, useEffect, useMemo, useState } from "react"
import { AppDetails } from "../../data/webAppData"
import { ArcElement, BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from "chart.js"
import PieChart from "./PieChart"
import { Dropdown } from "../Shared/Dropdown"
import BarGraph from "./BarGraph"
import { Filter } from "../../Pages/Dashboard"

type AppChartProps = {
    appData: AppDetails[],
}
export const colors = [
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FFA500',
    '#800080',
    '#008000',
    '#FFC0CB',
    '#808080',
    '#FFD700'
  ];

Chart.register(CategoryScale,ArcElement,Title,LinearScale,BarElement,BarController,Tooltip, Legend)
if(window.innerWidth>=640){
    Chart.defaults.font.size = 12
}else{
    Chart.defaults.font.size = 9
}


export const Charts:Array<Filter> = [{text:"Bar Graph"}, {text:"Pie Chart"}]
export const yParamsLst = [
    {text: "Ratings"},
    {text: "Reviews"},
    {text: "Installations"},
    {text: "Positive Reviews"},
    {text: "Negative reviews"},
]

type YParamMapType = {
    [label:string]:Array<number>
}

export type ChartComponentMapType = {
    [label:string]:ReactElement
}

export default function SingleVariableChart({appData}:AppChartProps){
    const [chartType,setChartType] = useState({text:"Bar Graph"})
    const [yParam,setYParam] = useState(yParamsLst[2])

    const YAxisDataMap = useMemo(()=>{
        const map:YParamMapType = {
            "Ratings": appData.map(data=>data.rating),
            "Reviews": appData.map(data=>data.reviews),
            "Installations": appData.map(data=>data.installs),
            "Positive Reviews": appData.map(data => data.positiveReviews),
            "Negative reviews": appData.map(data=>data.negativeReviews)
        }
        return map
    },[appData])

    const ChartTypeToColorMap = useMemo(()=>{
        const map:{[label:string]:string[]} = {
            "Bar Graph": ["blue"],
            "Pie Chart": colors.slice(0,appData.length)
        }
        return map
    },[appData])
    
    const [yData,setYData] = useState(YAxisDataMap[yParam.text])

    const [chartData,setChartData] = useState({
        labels: appData.map(data=>data.name),
        datasets:[
            {
                label: yParam.text,
                data: yData,
                backgroundColor:ChartTypeToColorMap[chartType.text]
            }
        ]
    })

    const ChartComponentMap = useMemo(()=>{
        const chartMap:ChartComponentMapType = {
            "Bar Graph": <BarGraph chartData={chartData} yParam={yParam.text} />,
            "Pie Chart": <PieChart chartData={chartData}  yParam={yParam.text}/>
        } 
        return chartMap
    },[chartData,yParam])

    const [chartComponent,setChartComponent] = useState(ChartComponentMap[chartType.text])

    const handleResize = ()=>{
        if(window.innerWidth>=640){
            Chart.defaults.font.size = 12
        }else{
            Chart.defaults.font.size = 9
        }
    }
    
    useEffect(() => {
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    useEffect(()=>{
        setChartComponent(ChartComponentMap[chartType.text])
    },[chartType,ChartComponentMap])

    useEffect(()=>{
        setYData(YAxisDataMap[yParam.text])
    },[appData,yParam,YAxisDataMap])

    useEffect(()=>{
        setChartData({
            labels: appData.map(data=>data.name),
            datasets:[
                {
                    label: yParam.text,
                    data: yData,
                    backgroundColor:ChartTypeToColorMap[chartType.text]
                }
            ]
        })
    },[appData,yData,yParam,ChartTypeToColorMap,chartType])

    return (
        <div className="w-full flex items-center flex-col py-5 px-0 mt-8 sm:px-4 sm:shadow sm:ring-1 sm:ring-black sm:ring-opacity-5 md:rounded-lg">
            <div className="flex flex-wrap justify-center mb-5">
                <div className="md:mr-10 mr-2 mb-5 min-w-[10rem]">
                    <Dropdown
                        title="Chart Type"
                        setFilter={setChartType}
                        filterOptions={Charts}
                        selectedFilter={chartType}
                    />
                </div>
                <div className="min-w-[10rem] md:mr-10 mr-2 mb-5">
                    <Dropdown
                        title="Parameter"
                        setFilter={setYParam}
                        filterOptions={yParamsLst}
                        selectedFilter={yParam}
                    />
                </div>
            </div>
            {
                chartComponent
            }
            
        </div>
    )
}