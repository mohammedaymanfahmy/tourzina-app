import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from "react-native-responsive-screen";

/**
 * Width-Percentage
 * Converts width dimension to responsive width
 * 375 - design base width (iPhone X)
 * @param dimension directly taken from design wireframes
 * @returns {number} responsive width value
 */
export const wp = (dimension: number) => {
  return wp2dp((dimension / 375) * 100);
};

/**
 * Height-Percentage
 * Converts height dimension to responsive height
 * 814 - design base height (iPhone X)
 * @param dimension directly taken from design wireframes
 * @returns {number} responsive height value
 */
export const hp = (dimension: number) => {
  return hp2dp((dimension / 814) * 100);
};
