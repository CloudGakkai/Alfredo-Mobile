import { Platform } from "react-native"
import { connect } from '../../Lib/OsmiProvider'

const OS = Platform.OS

export default connect({
  container: "flex bg-gray-100",
  hello: "text-4xl font-bold self-center",
  caption: "text-base self-center mb-5",
  inputView: "flex full mb-5",
  inputForm: OS === 'ios' ? "row items-center flex bg-white rounded-full p-3 shadow-md" : "row items-center flex bg-white rounded-full p-3 py-1 shadow-md",
  inputText: "flex mx-2",
  error: "text-red-600 mb-1 ml-3",
  btnLogin: "row justify-center px-3 py-3 mb-4 mt-2 rounded-full bg-blue-500 shadow-md",
  btnLoginText: "mr-2 font-bold text-lg text-white",
  btnRegister: "row justify-center px-3 py-3 mt-2 rounded-full bg-white shadow-md",
  btnRegisterText: "mr-2 font-bold text-lg text-black",
})
