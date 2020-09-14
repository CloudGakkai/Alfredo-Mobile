import { connect } from '../../Lib/OsmiProvider'

export default connect({
  emptyState: "flex items-center justify-center",
  container: "px-3 flex",
  secA: "justify-center items-center pt-5 pb-3 bg-white rounded-md shadow-md",
  price: "text-4xl text-red-500 font-bold",
  status: "bg-yellow-500 text-white px-3 py-2 font-bold rounded-md mt-2",
  alert: "bg-gray-400 mt-3 font-bold p-3 text-center",
  pay: "my-3 bg-white justify-start items-center py-3 rounded-md shadow-md",
  rekening: "text-base font-bold",
  btnConfirm: "items-center px-3 py-3 bg-blue-500 mt-5 mb-10 rounded-full shadow-md",
  btnConfirmText: "text-white font-bold text-base",
  panduanBox: "justify-center py-3 px-3 mb-3 bg-white rounded-md shadow-md",
  panduanTitle: "text-black mb-3 text-lg font-bold",
  collapse: "border border-gray-300 rounded-md p-2 mb-3",
  panduanLabel: "text-blue-500 font-bold ",
})