import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { apiGetFutureStockPrediction } from "@/services/stocks-service"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { AppSpinner } from "./app-spinner"
import moment from "moment"
import AppSymbolSelector from "./app-symbols-selector"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"

export default function FuturePredictionsTable() {

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
      
      console.log("Response =>", data.predictions);
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


  const ContentTable = () => {
    return (
        <Table>
            <TableCaption>List of stock data.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Predicted High</TableHead>
                <TableHead>Predicted Low</TableHead>
                <TableHead className="text-right">Predicted Closing Value</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { chartData.map((data) => {
                    return (<TableRow key={data["date"]}>
                                <TableCell className="font-medium">{moment(data['date']).format('Do MMMM YYYY')}</TableCell>
                                <TableCell>${data['high'].toFixed(2)}</TableCell>
                                <TableCell>${data['low'].toFixed(2)}</TableCell>
                                <TableCell className="text-right">${data['close'].toFixed(2)}</TableCell>
                            </TableRow>
                        )
                })
                }
            </TableBody>
        </Table>
    )
  }

    return  (
        <div className="space-y-5">
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
                {
                     !loading && <ContentTable />
                }
               
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