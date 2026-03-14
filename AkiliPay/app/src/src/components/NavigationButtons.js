import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';

const NavigationButtons = ({ activeScreen, onScreenChange }) => {
  const buttons = [
    { id: 'dashboard', label: 'Dashboard', icon: 'view-dashboard' },
    { id: 'ledger', label: 'Ledger', icon: 'book' },
    { id: 'operations', label: 'Operations', icon: 'cog' },
  ];

  return (
    <View style={styles.container}>
      {buttons.map((button) => (
        <TouchableOpacity
          key={button.id}
          style={[styles.button, activeScreen === button.id && styles.activeButton]}
          onPress={() => onScreenChange(button.id)}>
          <Icon
            name={button.icon}
            size={24}
            color={activeScreen === button.id ? colors.primary : colors.gray}
          />
          <Text
            style={[
              styles.buttonText,
              activeScreen === button.id && styles.activeButtonText,
            ]}>
            {button.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  buttonText: {
    marginTop: 4,
    fontSize: 12,
    color: colors.gray,
  },
  activeButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default NavigationButtons;