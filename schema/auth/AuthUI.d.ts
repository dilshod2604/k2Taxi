import { TextInputProps } from "react-native";

interface IButtonProps {
  onPress?: any;
  title: string;
  bgVariant?: string;
  textVariant?: string;
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
  disabled ?: boolean
}

declare interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: any;
  labelShow?: boolean;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}
