import { subtract } from "lodash"
import type { InvoiceData, Concept } from "../utils/types"
import currency from "currency.js"

const ProcessTable = () => {
    const data = {
        "from": {
            "name": "John Doe",
            "address": "1234 Elm St, Springfield, IL, 62701",
            "phone": "+1 (555) 123-4567",
            "email": "johndoe@example.com"
        },
        "to": {
            "name": "Jane Smith",
            "address": "5678 Oak St, Chicago, IL, 60601",
            "phone": "+1 (555) 987-6543",
            "email": "janesmith@example.com"
        },
        "concepts": [
            {
                "qty": "2",
                "concept": "Laptop",
                "unitPrice": "1200",
                "amount": "2400"
            },
            {
                "qty": "1",
                "concept": "Wireless Mouse",
                "unitPrice": "25",
                "amount": "25"
            },
            {
                "qty": "3",
                "concept": "USB-C Cable",
                "unitPrice": "10.00",
                "amount": "30"
            }
        ]
    }

    const { from, to, concepts } = data
    const sumTotal = concepts.reduce((acc: number, concept: Concept) => acc + Number(concept.amount), 0)
    const subTotal = currency(sumTotal)
    const vat = sumTotal * 0.15  // raw vat
    const Total = sumTotal + vat

    return (
        <>
            <div className=" flex flex-wrap justify-center md:justify-between divide-y-8 divide-transparent px-8">
                <div className="px-5 md:px-0">
                    <label className="text-gray-400 text-xs block">from:</label>
                    <span className="text-black font-extrabold block">{from.name}</span>
                    <span className="block">{from.address}</span>
                    <div>
                        <label className="text-gray-400 text-xs">Phone: </label>
                        <span className="">{from.phone}</span>
                    </div>
                    <label className="text-gray-400 text-xs ">Email: </label>
                    <span>{from.email}</span>

                </div>
                <div className="px-5 md:px-0">
                    <label className="text-gray-400 text-xs block ">to:</label>
                    <span className="text-black font-extrabold block text-right">{to.name}</span>
                    <span className="block text-right">{to.address}</span>
                    <div className="text-right">
                        <label className="text-gray-400 text-xs">Phone: </label>
                        <span className="">{to.phone}</span>
                    </div>
                    <div className="text-right">
                        <label className="text-gray-400 text-xs">Email: </label>
                        <span>{to.email}</span>
                    </div>

                </div>
            </div>
            <div className="container mx-auto mt-10 px-8">
                <table className="min-w-full">
                    <thead >
                        <tr className=" border-b-2 border-gray-500 rounded-lg ">
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">QTY.</th>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Concept</th>
                            <th className="py-2 px-4  text-sm font-medium text-gray-600 w-28">Unit Price</th>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 w-10">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {concepts.map((concept, index: any) => (

                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                                <td className="py-2 px-4 text-sm text-gray-700">{concept.qty}</td>
                                <td className="py-2 px-4 text-sm text-gray-700">{concept.concept}</td>
                                <td className="py-2 px-4 text-sm text-gray-700 text-right">{concept.unitPrice}</td>
                                <td className="py-2 px-4 text-sm text-gray-700 text-right ">{concept.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-gray-100">
                        <tr>
                            <td colSpan={3} className="py-2 px-4 text-right font-semibold text-sm text-gray-600">Subtotal</td>
                            <td className="py-2 px-4 text-sm text-gray-700 text-right">{subTotal.toString()}</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="py-2 px-4 text-right font-semibold text-sm text-gray-600">Vat</td>
                            <td className="py-2 px-4 text-sm text-gray-700 text-right">{vat}</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="py-2 px-4 text-right font-semibold text-sm text-black-600">Total</td>
                            <td className="py-2 px-4 text-sm text-gray-700 text-right">{Total}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>



    )
}
export default ProcessTable