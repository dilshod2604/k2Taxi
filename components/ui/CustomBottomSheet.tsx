import React, { forwardRef, ReactNode, useCallback, useState } from "react";
import { StyleProp, Text, ViewStyle } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

type ViewType = "scroll" | "base";

interface CustomBottomSheetProps {
  snapPoints: string[];
  showBackdrop?: boolean;
  scroll?: ViewType;
  indicatorStyle?: StyleProp<ViewStyle>;
  isOpen?: boolean;
  children: ReactNode;
  className?: string;
  enablePanDownToClose?: boolean;
}

const CustomBottomSheet = forwardRef<BottomSheet, CustomBottomSheetProps>(
  (
    {
      snapPoints,
      showBackdrop,
      scroll = "base",
      indicatorStyle,
      isOpen,
      children,
      className,
      enablePanDownToClose,
    },
    ref
  ) => {
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      []
    );
    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        index={isOpen ? 0 : -1}
        enablePanDownToClose={enablePanDownToClose}
        {...(showBackdrop ? { backdropComponent: renderBackdrop } : {})}
        handleIndicatorStyle={indicatorStyle}
        enableDynamicSizing={false}
      >
        {scroll === "base" ? (
          <BottomSheetView className={className}>{children}</BottomSheetView>
        ) : (
          <BottomSheetScrollView className={className}>
            {children}
          </BottomSheetScrollView>
        )}
      </BottomSheet>
    );
  }
);

export default CustomBottomSheet;
