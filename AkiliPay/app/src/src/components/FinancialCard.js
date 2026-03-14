import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';

const FinancialCard = ({ title, amount, icon, color }) => {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Icon name={icon} size={30} color={colors.white} />
      <Text style={styles.cardLabel}>{title}</Text>
      <Text style={styles.cardValue}>Ksh {amount.toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardLabel: {
    color: colors.white,
    fontSize: 14,
    marginTop: 8,
    opacity: 0.9,
  },
  cardValue: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default FinancialCard;