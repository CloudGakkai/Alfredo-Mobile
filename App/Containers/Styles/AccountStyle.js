import { connect} from '../../Lib/OsmiProvider'

export default connect({
  container: 'bg-gray-100 flex',
  content: 'flex p-5',
  helloContainer: 'items-center text-center',
  btnContainer: 'row items-center mt-8',
  helloText: 'text-4xl font-semibold text-center',
  btnAuth: 'rounded-md py-3 px-5 bg-blue-500',
  btnAuthLabel: 'text-white text-lg font-medium text-center'
})
