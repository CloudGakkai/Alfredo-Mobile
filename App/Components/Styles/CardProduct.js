import { connect } from "../../Lib/OsmiProvider"

export default connect({
  card: "bg-white rounded-md shadow-sm flex items-start justify-center mx-0.5 my-0.5",
  thumb: "rounded-t-md full h-150 self-center",
  content: "flex flex-wrap p-2",
  title: "text-base font-bold mb-1",
  price: "text-sm my-1 text-blue-500 font-bold",
  btnBuy: "bg-blue-500 self-center rounded-md px-3 py-1",
  btnBuyLabel: "text-white font-bold text-center"
})