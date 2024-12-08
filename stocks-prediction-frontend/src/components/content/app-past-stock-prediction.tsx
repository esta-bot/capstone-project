import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import moment  from "moment";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
import { DatePickerWithRange } from "./app-date-selector"
import { Button } from "../ui/button"
import AppSymbolSelector from "./app-symbols-selector"
import { useEffect, useState } from "react"
import { AppSpinner } from "./app-spinner"
import { apiGetHistoricalStockPrediction } from "@/services/stocks-service"
import { DateRange } from "react-day-picker"


// const chartConfig = {
//   prediction: {
//     label: "Prediction",
//     color: "hsl(var(--chart-1))",
//   },
//   actual: {
//     label: "Actual",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig

const predictionsConfig = {
  predicted: {
    label: "Predicted",
    color: "hsl(var(--chart-1))",
  },
  actual: {
    label: "Actual",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function AppPastStockPrediction() {

  const [symbol, setSymbol] = useState("AAPL")
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<DateRange|null>(null)
  const [prediction, setPrediction] = useState([])
  const [mae, setMae] = useState<{ mae_high: number, mae_low: number, mae_close: number }|null>(null)
  const [dateRangeLimit, setDateRangeLimit] = useState<DateRange|null>(null)

  useEffect(() => {
    fetchHistoricalPredictionsHanlder()
  }, [])


  const fetchHistoricalPredictionsHanlder =  async () => {

    try{
      
      setLoading(true)
      const data = await apiGetHistoricalStockPrediction({
        symbol: symbol,
        start_date: dateRange?.from?.toISOString().split('T')[0] || null,
        end_date: dateRange?.to?.toISOString().split('T')[0] || null,
      })
      
      console.log("Historical predictions =>", data);  
      setDateRange({
        from: new Date(data.start_date),
        to: new Date(data.end_date),
      })
      console.log("start limit:", data.start_date_limit);
      console.log("end limit:", data.end_date_limit);
      
      setDateRangeLimit({
        from: new Date(data.start_date_limit),
        to: new Date(data.end_date_limit),
      })
      setPrediction(data.chartData)
      setMae(data.mae_scores)
    

     }catch(err) {
        console.log("Error =>", err);
     }finally {
      setLoading(false)
     }
  }

  const onSymbolChangedHandler = async (val: string) => { 
    setSymbol(val)
  }


  const onDateRangeSelected = async (val: DateRange|null) => { 
    // setEndDate(val)
    setDateRange(val)
  }

  

    return (
        <Card>
          <CardHeader>
            <CardTitle>Evaluation of AI Model</CardTitle>
            { dateRange && <CardDescription>
              { moment(dateRange.from).format('Do MMMM YYYY') } - { moment(dateRange.to).format('Do MMMM YYYY') }
            </CardDescription> }
            { prediction.length > 0 && 
              <div className="flex gap-2">
              <div className="flex-2 w-full">
                  <AppSymbolSelector defaultValue={symbol} onValueChange={onSymbolChangedHandler} />
               </div>
               <div className="flex-2 w-full">
                 <DatePickerWithRange 
                   onChange={onDateRangeSelected} 
                   startDate={dateRange?.from != null ? dateRange.from : new Date()}
                    endDate={dateRange?.to} 
                    startDateLimit={dateRangeLimit?.from != null ? dateRangeLimit.from : new Date()}
                    endDateLimit={dateRangeLimit?.to || null}
                    className=""
                    />
               </div>
               <div  className="flex-1 w-full">
                 <Button onClick={fetchHistoricalPredictionsHanlder} disabled={loading}>
                 { loading && <AppSpinner /> }
                   Refresh
                   </Button>
               </div>
           </div>
            }
          </CardHeader>
          <CardContent>
          { loading && <div  className="flex aspect-video justify-center items-center">
            <AppSpinner className="text-black" />
          </div>
          }
            { !loading && 
                <ChartContainer config={predictionsConfig}>
                <LineChart
                  accessibilityLayer
                  data={ prediction }
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="formattedDate"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Line
                    dataKey="predicted"
                    type="monotone"
                    stroke="var(--color-predicted)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    dataKey="actual"
                    type="monotone"
                    stroke="var(--color-actual)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            }
          </CardContent>
          {
            mae && (
              <CardFooter>
                <div className="flex w-full items-center gap-2 text-sm">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 leading-none text-muted-foreground">
                      <p>Mean Absolute Error (MAE):</p>
                      <TrendingUp size={16} />
                    </div>
                    <div className="flex items-center gap-2 leading-none text-primary-foreground">
                      <p>MAE closing: {mae['mae_close'].toFixed(2)}</p>
                      <p>MAE high: {mae['mae_high'].toFixed(2)}</p>
                      <p>MAE low: {mae['mae_low'].toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardFooter>
            )
          }
        </Card>
      )

}