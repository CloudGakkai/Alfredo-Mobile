import { connect } from '../../Lib/OsmiProvider'

export default connect({
  container: "mx-3 mt-3 flex",
  secA: "justify-center items-center py-3 bg-white rounded-md shadow-md",
  status: "bg-yellow-500 text-white px-3 py-2 font-bold rounded-md mt-2",
  alert: "bg-yellow-400 mt-3 font-bold p-3 text-center",
  pay: "mt-3 bg-white justify-start items-center py-3 rounded-md shadow-md",
  confirm: "items-center px-3 py-3 bg-blue-500 mt-5 rounded-full shadow-md",
  emptyState: "flex items-center justify-center"
})