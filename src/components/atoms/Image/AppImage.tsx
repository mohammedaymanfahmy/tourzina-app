import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleProp,
  ImageStyle,
} from "react-native";
// Example usage:
// <AppImage
//   source={{ uri: 'https://example.com/image.png' }}
//   -- source={require('./path/to/local/image.png')}
//   style={{ width: 150, height: 150, borderRadius: 10 }}
//   containerStyle={{ alignItems: 'center', margin: 10 }}
//   resizeMode="contain"
// />

// it will take
// - source, style (user defined)
// - containerStyle (user defined)
// and any other image props except style or source because they are predefined

type AppImageProps = {
  source: any;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<any>;
} & Omit<ImageProps, "source" | "style">;

export default function AppImage({
  source,
  style,
  containerStyle,
  ...rest
}: AppImageProps) {
  return (
    <View style={containerStyle}>
      <Image style={[styles.image, style]} source={source} {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
});
