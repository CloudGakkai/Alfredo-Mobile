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
  btnUpload: "row items-center justify-center py-3 flex bg-white rounded-full px-3 mt-2 shadow-md",
  btnUploadLabel: "text-black mr-3",
  backDrop: "flex items-center justify-center bg-soft-black",
  modalUpload: "w-p-80 bg-white rounded-lg p-6",
  modalTitle: "text-center text-black font-bold text-xl mb-5",
  optionGroup: "row justify-center",
  optionColumn: "items-center",
  optionLabel: "text-center font-medium text-lg text-gray-800 mt-2",
  deleteImage: "absolute z-20 right-0 p-1 rounded-full bg-red-600 top--2 right--2",
  previewImage: "full h-250"
})
