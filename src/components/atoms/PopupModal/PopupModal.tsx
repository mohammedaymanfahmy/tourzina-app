import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import AppButton from "../AppButton/AppButton";
import colors from "../../../colors/colors";

interface PopupButton {
  label: string;
  onPress: () => void;
  variant?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  color?: string;
  loading?: boolean;
  disabled?: boolean;
}

interface PopupModalProps {
  visible: boolean;
  onClose?: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  buttons?: PopupButton[];
  dismissible?: boolean;
  overlayColor?: string;
}

const { width: screenWidth } = Dimensions.get("window");

const PopupModal: React.FC<PopupModalProps> = ({
  visible,
  onClose,
  title,
  description,
  icon,
  buttons = [],
  dismissible = true,
  overlayColor = "rgba(0, 0, 0, 0.5)",
}) => {
  const handleOverlayPress = () => {
    if (dismissible && onClose) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <Pressable
        style={[styles.overlay, { backgroundColor: overlayColor }]}
        onPress={handleOverlayPress}
      >
        <Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
          {/* Icon */}
          {icon && <View style={styles.iconContainer}>{icon}</View>}

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Description */}
          {description && <Text style={styles.description}>{description}</Text>}

          {/* Buttons */}
          {buttons.length > 0 && (
            <View style={styles.buttonContainer}>
              {buttons.map((button, index) => (
                <AppButton
                  key={index}
                  label={button.label}
                  onPress={button.onPress}
                  variant={button.variant || "contained"}
                  color={button.color || colors.primary}
                  size="md"
                  fullWidth={buttons.length === 1}
                  loading={button.loading}
                  disabled={button.disabled}
                  style={[
                    styles.button,
                    buttons.length > 1 && styles.multipleButtons,
                  ]}
                />
              ))}
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modal: {
    backgroundColor: colors.background,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
    maxWidth: screenWidth - 48,
    minWidth: 280,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.white,
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.gray60,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  button: {
    marginBottom: 0,
  },
  multipleButtons: {
    flex: 1,
  },
});

export default PopupModal;
