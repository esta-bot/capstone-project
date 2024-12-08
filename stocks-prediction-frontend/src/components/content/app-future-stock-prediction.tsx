
import moment  from "moment";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import AppSymbolSelector from "./app-symbols-selector"
import { apiGetFutureStockPrediction } from "../../services/stocks-service"
import { useEffect, useState } from "react"
import { AppSpinner } from "./app-spinner"

const chartConfig = {
  close: {
    label: "Closing",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig


export default function AppFutureStockPrediction() {

  const [days, setDays] = useState("5")
  const [symbol, setSymbol] = useState("AAPL")
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    fetchFuturePredictionHandler()
  }, [])
  

  const fetchFuturePredictionHandler = async () => {
    
     try{
      
      setLoading(true)
      const data = await apiGetFutureStockPrediction({
        symbol: symbol,
        days: +days,
      })
      
      console.log("Response =>", data);
      setChartData(data.predictions)

     }catch(err) {
        console.log("Error =>", err);
     }finally {
      setLoading(false)
     }
  }

  const onDaysChangedHandler = async (val: string) => { 
    setDays(val)
  }

  const onSymbolChangedHandler = async (val: string) => { 
    setSymbol(val)
  }


  return (
    <div >
      <Card>
        <CardHeader>
          <CardTitle>Future Prediction</CardTitle>
          <CardDescription>
              { (chartData.length > 0) && 
              <p>{ moment(chartData[0]['date']).format('Do MMMM YYYY') } - { moment(chartData[chartData.length - 1]['date']).format('Do MMMM YYYY') }</p>
              }
            
            </CardDescription>
            <div className="flex gap-2">
                  <div className="flex-2 w-full">
                    <AppSymbolSelector defaultValue={symbol} onValueChange={onSymbolChangedHandler}  />
                  </div>
                  <div  className="flex-2 w-full">
                    <Select defaultValue={days} onValueChange={onDaysChangedHandler}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Days" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5 Days</SelectItem>
                            <SelectItem value="10">10 Days</SelectItem>
                            <SelectItem value="15">15 Days</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                  <div  className="flex-1 w-full">
                    <Button onClick={fetchFuturePredictionHandler} disabled={loading}>
                      { loading && <AppSpinner /> }
                      Refresh
                    </Button>
                  </div>
              </div>
          
        </CardHeader>
        <CardContent>
          { loading && <div  className="flex aspect-video justify-center items-center">
            <AppSpinner className="text-black" />
          </div>
          }
          { !loading && <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 8,
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
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="close"
                type="natural"
                fill="var(--color-close)"
                fillOpacity={0.4}
                stroke="var(--color-close)"
                dot={true}
                
              />
            </AreaChart>
          </ChartContainer> }
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              { (chartData.length > 0) && <div className="flex items-center gap-2 leading-none text-muted-foreground">
                {/* <p>Date ranges between: </p> */}
                Showing possible future closing values
              </div>
              }
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
    
  )
}