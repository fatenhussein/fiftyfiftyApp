import { Pressable, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function CustomButton({
  label,
  onPress,
  type = 'primary',
  bgColor,
  fgColor,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text style={[styles.text, styles[`text_${type}`], fgColor ? { color: fgColor } : {},]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginTop:10,
    width: '100%',
  },
  container_primary: {
    backgroundColor: '#FF5A46',
  },
  container_tertiary: {},

  text: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },

  text_tertiary: {
    color: 'gray',
  },
});
