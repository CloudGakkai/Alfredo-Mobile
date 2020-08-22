import { connect } from "../../Lib/OsmiProvider"

export default connect({
  emptyState: "flex items-center justify-center",
  card: "bg-white rounded-md shadow-md p-3 row items-start mb-3",
  thumb: "rounded-md mr-3 w-100 h-100",
  content: "flex flex-wrap",
  title: "text-base font-bold mb-1 flex-wrap",
  price: "text-sm",
  btnBuy: "bg-blue-500 rounded-md px-3 py-1 self-start",
  btnBuyLabel: "text-white"
})