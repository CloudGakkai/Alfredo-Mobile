import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default {
  "soft-black": "rgba(0,0,0, 0.5)",
  "bg-soft-black": { backgroundColor: "rgba(0,0,0, 0.5)" },
  "text-soft-black": { color: "rgba(0,0,0, 0.5)" },
  "border-soft-black": { borderColor: "rgba(0,0,0, 0.5)" },

  // width height
  "w-150": { width: 150 },
  "w-0": { width: 0 },
  "h-150": { height: 150 },
  "w-100": { width: 100 },
  "h-100": { height: 100 },
  "w-win": { width: width },
  "w-120": { width: 120 },
  "h-250": { height: 250 },
  "h-win": { height: width },
  "h-full": { height: "100%" },
  "w-p-80": { width: "80%" },

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
  "right--2": {right: -8},
  "top--2": {top: -8}
}
