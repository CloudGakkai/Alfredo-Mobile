import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default {
  // width height
  "w-150": { width: 150 },
  "w-0": { width: 0 },
  "h-150": { height: 150 },
  "w-100": { width: 100 },
  "h-100": { height: 100 },
  "w-win": { width: width },
  "h-win": { height: width },
  "h-full": {height: "100%"},

  // margin padding
  "mx-0.5": {marginHorizontal: 7},
  "my-0.5": {marginVertical: 7},

  // typography
  "text-vertical-center": { textAlignVertical: 'center' },

  // position
  "bottom--2": {bottom: -8},
  "bottom--5": {bottom: -20},
  "bottom--6": {bottom: -24},
  "bottom--7": {bottom: -28},
}
