import { apiClient } from "./config.ts"
import moment from "moment"


export const apiGetTestDateRage = async () => {
    return apiClient.get("/test-date-range")
}

export const apiGetFutureStockPrediction = async (payload: { symbol: string, days: number}) => {
    const response = await apiClient.post("/predict", payload )
    const data = response.data
    const predictions = data.predictions.map( p => {
        // Convert and format the date
        const formattedDate = moment(p['date']).format('Do');
        return {...p, formattedDate: formattedDate }
    })
    return {
        ...data,
        predictions,
    }
}

export const apiGetHistoricalStockPrediction = async (payload: {symbol: string, start_date: string|null, end_date: string|null}) => {
    const response = await apiClient.post("/get-predictions-and-mse", payload)
    const data = response.data
    const predictions = data.predictions.map( (p) => {
        // Convert and format the date
        const formattedDate = moment(p['date']).format('Do');
        p['formattedDate'] = formattedDate
        return p
    })
    const actual = data.actual.map( (p) => {
        // Convert and format the date
        const formattedDate = moment(p['date']).format('Do');
        p['formattedDate'] = formattedDate
        return p
    })

    const chartData = data.actual.map( act => {
            const inputDate = act['date'];
            const commonDateFormat = inputDate.split('T')[0];
            const formattedDate = moment(commonDateFormat).format('Do');
            // console.log("formattedDate:", formattedDate);
            
            const pdt = data.predictions.find((el) => el['date'] == commonDateFormat)
            return {
                date: commonDateFormat,
                actual: act? act['close'].toFixed(2) : null,
                predicted: pdt['close'].toFixed(2),
                formattedDate: formattedDate
            }

    })
    return {
        ...data,
        predictions,
        actual,
        chartData
    }
}
