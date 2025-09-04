import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../../colors/colors";
import AntDesign from "@expo/vector-icons/AntDesign";

// example
// <Input placeHolder="search" autoCapitalize?="none" size="large" type="search" keyBoardType="numeric"/>

type InputProps = {
  placeHolder: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyBoardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "name-phone-pad"
    | "decimal-pad"
    | "twitter"
    | "web-search"
    | "visible-password";
  size: "small" | "medium" | "large";
  type?: "search" | "password" | "default";
};
type EyeIconProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const styles = StyleSheet.create({
  common: {
    borderRadius: 24,
    borderColor: `${colors.borderColor}`,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 2,
    backgroundColor: `${colors.settingsBackGround}`,
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  large: {
    width: "90%",
  },
  medium: {
    width: "45%",
  },
  small: {
    width: "20%",
  },
  input: {
    color: "#fff",
    fontSize: 16,
  },
  passwordInput: {
    color: "#fff",
    width: "90%",
    fontSize: 16,
  },
  searchInput: {
    color: "#fff",
    width: "90%",
    fontSize: 16,
  },
});

const EyeIcon = (props: EyeIconProps) => {
  return (
    <TouchableOpacity onPress={() => props.setVisible(!props.visible)}>
      <AntDesign name={props.visible ? "eyeo" : "eye"} size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const AppInput = (props: InputProps) => {
  const [visible, setVisible] = React.useState(true);

  return (
    <View style={[styles.common, styles[props.size]]}>
      {props.type === "search" && (
        <AntDesign
          name="search1"
          size={20}
          color={colors.placeHolder}
          style={{ marginRight: 8 }}
        />
      )}
      <TextInput
        placeholder={props.placeHolder}
        autoCorrect={false}
        secureTextEntry={props.type === "password" ? visible : false}
        underlineColorAndroid="transparent"
        placeholderTextColor={colors.placeHolder}
        autoCapitalize={props.autoCapitalize ? props.autoCapitalize : "none"}
        textContentType="password"
        style={
          props.type === "search"
            ? styles.searchInput
            : props.type === "password"
            ? styles.passwordInput
            : styles.input
        }
      />
      {props.type === "password" && (
        <EyeIcon visible={visible} setVisible={setVisible} />
      )}
    </View>
  );
};

export default AppInput;
