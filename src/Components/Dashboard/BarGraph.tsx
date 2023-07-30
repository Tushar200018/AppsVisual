import { Bar} from "react-chartjs-2";

type ChartProps = {
    chartData: any,
    yParam: string
}


function BarGraph({ chartData,yParam }:ChartProps) {
   
  return (
    <div className="lg:w-[80%] w-[90%] h-[60vh]">
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio:false,
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
          }
        }}
      />
    </div>
  );
}
export default BarGraph;