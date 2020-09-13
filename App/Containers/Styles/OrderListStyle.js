import { connect } from "../../Lib/OsmiProvider"

export default connect({
  card: "bg-white rounded-md shadow-sm flex p-3 mx-2 my-2",
  status: "bg-yellow-500 text-white font-bold px-2 py-1 self-end rounded-md",
  emptyState: "flex items-center justify-center"
})