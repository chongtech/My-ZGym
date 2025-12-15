import React from 'react';
import {
  Platform,
  ScrollView,
  ScrollViewProps,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';

// Removed react-native-keyboard-controller as it is not supported in Expo Go on Android
// import {
//   KeyboardAwareScrollView,
//   KeyboardAwareScrollViewProps,
// } from "react-native-keyboard-controller";

// type Props = KeyboardAwareScrollViewProps & ScrollViewProps;
type Props = ScrollViewProps & {
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
};

/**
 * KeyboardAwareScrollView wrapper.
 * Falls back to standard ScrollView + KeyboardAvoidingView to ensure compatibility with Expo Go.
 */
export function KeyboardAwareScrollViewCompat({
  children,
  keyboardShouldPersistTaps = 'handled',
  contentContainerStyle,
  style,
  ...props
}: Props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjust as needed
    >
      <ScrollView
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        contentContainerStyle={contentContainerStyle}
        style={style}
        {...props}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
