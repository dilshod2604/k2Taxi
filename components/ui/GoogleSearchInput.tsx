import React, { ComponentType, ElementType } from "react";
import "react-native-get-random-values";
import { Image, ImageSourcePropType, View } from "react-native";
import {
  GooglePlacesAutocomplete,
  Styles,
} from "react-native-google-places-autocomplete";
import { TouchableOpacity } from "react-native-gesture-handler";

interface GoogleSearchInputProps {
  placeholder: string;
  styles?: Object | Partial<Styles> | undefined;
  icon?: ImageSourcePropType;
  TextInputBackgroundColor?: string;
  textInputContainerBackgroundColor?: string;
  initialLocation?: string;
  renderRightButton?: (() => JSX.Element | React.ComponentType<{}>) | undefined;
  handlePress?: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  className?: string;
  showRightButton?: boolean;
}

const googleApi = process.env.EXPO_PUBLIC_GOOGLE_API_KEY!;

if (!googleApi) {
  console.warn("Google API key is missing!");
}

const GoogleSearchInput = ({
  placeholder,
  TextInputBackgroundColor,
  handlePress,
  icon,
  textInputContainerBackgroundColor,
  className,
  initialLocation,
  showRightButton,
  renderRightButton,
}: GoogleSearchInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl mt-2 ${className}`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder={placeholder}
        debounce={200}
        styles={{
          textInputContainer: {
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#d4d4d4",
            marginHorizontal: 2,
            paddingHorizontal: 10,
            borderRadius: 15,
            backgroundColor: textInputContainerBackgroundColor ?? "#f5f5f5",
          },
          textInput: {
            backgroundColor: TextInputBackgroundColor,
            fontSize: 16,
            fontWeight: "400",
            width: "100%",
            marginTop: 5,
            borderRadius: 15,
          },
          listView: {
            backgroundColor: TextInputBackgroundColor,
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        onPress={(data, detail = null) => {
          if (handlePress && detail?.geometry) {
            handlePress({
              latitude: detail.geometry.location.lat,
              longitude: detail.geometry.location.lng,
              address: data.description!,
            });
          }
        }}
        onFail={(error) => {
          console.log("error", error);
        }}
        query={{
          key: googleApi,
          language: "ru",
        }}
        renderLeftButton={() => (
          <View>
            <Image source={icon} resizeMode="cover" className="size-5" />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: initialLocation ? "black" : "gray",
          placeholder: initialLocation ?? placeholder,
        }}
        renderRightButton={showRightButton ? renderRightButton : undefined}
      />
    </View>
  );
};

export default GoogleSearchInput;
