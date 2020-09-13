import { connect } from '../../Lib/OsmiProvider'

export default connect({
  container: "flex bg-gray-100",
  inputView: "flex full mb-5",
  label: "font-bold",
  inputForm: "row items-center flex bg-white rounded-full px-3 mt-2 shadow-md",
  inputText: "flex mx-2",
  error: "text-red-600 mb-1 ml-3",
  btnConfirm: "items-center px-3 py-3 bg-blue-500 mt-5 rounded-full shadow-md",
  btnConfirmText: "text-white font-bold text-base",
})
