import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  
export default function AppSymbolSelector({defaultValue = "AAPL", onValueChange}: { defaultValue?: string, onValueChange?(value: string): void }) {


    return (
        <div >
            <Select defaultValue={defaultValue} onValueChange={onValueChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Symbol" />
                </SelectTrigger>
                <SelectContent> 
                    <SelectItem value="AAPL">AAPL</SelectItem>
                    {/* <SelectItem value="GOOGL">GOOGLE</SelectItem>
                    <SelectItem value="MSFT">MSFT</SelectItem> */}
                </SelectContent>
            </Select>
        </div>
    )
}