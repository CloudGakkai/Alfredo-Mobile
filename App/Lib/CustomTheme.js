import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default {
    "w-150": { width: 150 },
    "w-0": { width: 0 },
    "h-150": { height: 150 },
    "w-100": { width: 100 },
    "h-100": { height: 100 },
    "w-win": { width: width },
    "h-win": { height: width },
    "text-vertical-center": { textAlignVertical: 'center' },
    "mx-0.5": {marginHorizontal: 7},
    "my-0.5": {marginVertical: 7}
}