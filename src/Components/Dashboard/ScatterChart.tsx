import { useEffect, useState } from "react";
import {Scatter} from "react-chartjs-2";
import { colors } from "./SingleVariableChart";

type ChartProps = {
    yData: number[],
    xData: number[],
    yParam: string,
    xParam: string,
    appNames:string[]
}

type scatterDataType = {
    x:number,
    y:number
}[]

function ScatterChart({ yData,xData,yParam,xParam,appNames }:ChartProps) {
  const [chartData,setChartData] = useState<scatterDataType>([]) 
  useEffect(()=>{
    setChartData(()=>{
        const data:scatterDataType = []
        for(let i=0;i<xData.length;i++){
            data.push({
                x: xData[i],
                y: yData[i]
            })
        }
        return data
    })
  },[yData,xData])
  return (
    <div className="lg:w-[80%] w-[90%] h-[60vh]">
      <Scatter
        data={{
                datasets:[
                    {
                        data:chartData,
                        backgroundColor:colors.slice(0,xData.length)
                    }
                ]
            }}
        options={{
          maintainAspectRatio:false,
          plugins:{
            legend: {
                display: true, // Hide the default legend
                onClick: () => {}, // Disable legend clicking
                labels: {
                  generateLabels: () => {
                      return appNames.map((appName,idx) => ({
                        // Generate custom legend labels for each data point
                        text: appName,
                        fillStyle: colors[idx], 
                        pointStyle: 'circle', // Set the style for the legend marker (you can use other shapes as well)
                        pointRadius: 5, // Set the radius of the legend marker
                      }));
                  },
                },
              },
          },
          scales:{
            y:{
                title:{
                    text:yParam,
                    display: true,
                    font:{
                        weight:"bold",
                        size: 13
                    },
                    padding:{
                        bottom: 10
                    }
                }
            },
            x:{
                title:{
                    text:xParam,
                    display: true,
                    font:{
                        weight:"bold",
                        size: 13
                    },
                    padding:{
                        top: 10
                    }
                }
            }
          }
        }}
      />
    </div>
  );
}
export default ScatterChart;