import { Bar} from "react-chartjs-2";

type ChartProps = {
    chartData: any,
    yParam1: string,
    yParam2: string,
}


function MultiAxisBarGraph({ chartData,yParam1,yParam2}:ChartProps) {
//    console.log(isSecondAxis)
  return (
    <div className="lg:w-[80%] w-[90%] h-[60vh]">
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio:false,
          scales: {
            y1: {
              type: 'linear' as const,
              display: true,
              position: 'left' as const,
              title:{
                text:yParam1,
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
            y2: {
              type: 'linear' as const,
              display: true,
              position: 'right' as const,
              grid: {
                drawOnChartArea: false,
              },
              title:{
                text:yParam2,
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
                    text:"Application Names",
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
          },
        }}
      />
    </div>
  );
}
export default MultiAxisBarGraph;