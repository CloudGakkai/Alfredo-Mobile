import { connect } from "../../Lib/OsmiProvider"

export default connect({
  card: "bg-white rounded-md shadow-md p-3 row items-center justify-start mb-3",
  thumb: "rounded-md mr-3 w-100 h-100 justify-center ",
  content: "flex flex-wrap",
  title: "text-base font-bold mb-1",
  price: "text-sm",
  btnBuy: "bg-blue-500 rounded-md px-3 py-1",
  btnBuyLabel: "text-white font-bold text-center"
})