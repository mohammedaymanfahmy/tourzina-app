// import colors from '@/colors/colors';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


type IconButtonProps = {
  Icon: React.ComponentType<any>;
  isRounded?: boolean;
  onPress?: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  isRounded = true,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <MaterialCommunityIcons name="arrow-left" size={24} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
  },
});

export default IconButton;
