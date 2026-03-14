import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';

const TransactionItem = ({ transaction }) => {
  const isInflow = transaction.type === 'inflow';
  const isSuspicious = transaction.ml_flag === 'Suspicious';

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Icon
          name={isInflow ? 'arrow-down' : 'arrow-up'}
          size={24}
          color={isInflow ? colors.success : colors.danger}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{transaction.name}</Text>
          <Text style={styles.code}>{transaction.transaction_code}</Text>
          <Text style={styles.date}>{transaction.date}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={[styles.amount, { color: isInflow ? colors.success : colors.danger }]}>
          {isInflow ? '+' : '-'} Ksh {transaction.amount}
        </Text>
        {isSuspicious && (
          <View style={styles.suspiciousBadge}>
            <Icon name="alert" size={12} color={colors.white} />
            <Text style={styles.suspiciousText}>ML Alert</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  code: {
    fontSize: 10,
    color: colors.lightGray,
    marginTop: 2,
  },
  date: {
    fontSize: 10,
    color: colors.border,
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  suspiciousBadge: {
    backgroundColor: colors.danger,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  suspiciousText: {
    color: colors.white,
    fontSize: 8,
    marginLeft: 2,
  },
});

export default TransactionItem;