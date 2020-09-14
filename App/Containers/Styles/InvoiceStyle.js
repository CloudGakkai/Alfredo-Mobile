import { connect } from '../../Lib/OsmiProvider'

export default connect({
  emptyState: "flex items-center justify-center",
  container: "mx-1 flex",
  secA: "justify-center items-center pt-3 mx-2 pb-3 mb-3 bg-white rounded-md shadow-md",
  price: "text-4xl text-red-500 mb-3 font-bold",
  status: "bg-yellow-500 text-white px-3 py-2 font-bold rounded-md mb-5",
  alert: "mx-2 font-bold text-center",
  pay: "mb-3 bg-white mx-2 justify-start items-center py-3 rounded-md shadow-md",
  rekening: "text-base font-bold",
  btnConfirm: "items-center px-3 py-3 bg-blue-500 mx-2 mb-10 rounded-full shadow-md",
  btnConfirmText: "text-white font-bold text-base",
  panduanBox: "justify-center pt-3 pb-1 px-3 mx-2 mb-8 bg-white rounded-md shadow-md",
  panduanTitle: "text-black mb-3 text-lg font-bold",
  collapse: "border border-gray-300 rounded-md p-2 mb-3",
  panduanLabelParent: "flex row items-center",
  panduanLabel: "text-blue-500 font-bold flex",
})