import { connect } from '../../Lib/OsmiProvider'

export default connect({
  container: "flex bg-gray-500",
  hello: "text-4xl font-bold self-center",
  caption: "text-base self-center mb-5",
  inputView: "flex full mb-5",
  inputForm: "row items-center flex bg-white rounded-full px-3 shadow-lg",
  inputText: "flex mx-1",
  error: "text-red-600 mb-1 ml-3",
  btnRegister: "row justify-center px-3 py-2 mb-4 rounded-full bg-blue-500",
  btnRegisterText: "mr-2 font-bold text-lg text-white",
  check: "row items-center",
  btnLogin: "row justify-center px-3 py-2 mt-1 rounded-full bg-white",
  btnLoginText: "mr-2 font-bold text-lg text-black"
})