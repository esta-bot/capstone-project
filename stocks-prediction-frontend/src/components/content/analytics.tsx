import { Card } from "../ui/card";
import AppFutureStockPrediction from "./app-future-stock-prediction";
import AppPastStockPrediction from "./app-past-stock-prediction";

export default function Analytics() {

    return (
        <div className="space-y-5">
            <Card className="p-5 space-y-5">
                <div>
                    <h2 className="text-xl font-semibold text-gray-700">Future Prediction - Left</h2>
                    <p className="mt-2 text-gray-600">
                    The left graph displays the predicted stock values for future dates based on the AI model's analysis of historical data and technical indicators. It provides a visual representation of potential stock trends, helping users make informed decisions about future market movements. The predictions are updated dynamically and offer insights into potential closing balances.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-gray-700">Evaluation of AI Model Accuracy on Historical Data - Right </h2>
                    <p className="mt-2 text-gray-600">
                    The right graph compares the predicted stock values with the actual historical values for a past period. It helps evaluate the accuracy of the AI model by visualizing the differences between predictions and actual outcomes. The Mean Squared Error (MSE) metric is calculated to quantify the model's performance, providing a benchmark for improvement and ensuring reliability in future predictions.
                    </p>
                </div>
            </Card>
            <div className="flex flex-row gap-4">
                <div className="flex-1">
                    <AppFutureStockPrediction/>
                </div>
                <div className="flex-1">
                    <AppPastStockPrediction/>
                </div>
            </div>
        </div>
    )
}