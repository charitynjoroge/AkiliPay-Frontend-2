import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TransactionItem from '../components/TransactionItem';
import { calculateFinancials } from '../utils/helpers';
import colors from '../constants/colors';

const LedgerScreen = ({ transactions, business, onAddPress }) => {
  const financials = calculateFinancials(transactions);

  return (
    <View style={styles.container}>
      {/* Header with Add Button */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Transaction Ledger</Text>
          <Text style={styles.subtitle}>{transactions.length} total transactions</Text>
        </View>
        {business && (
          <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
            <Icon name="plus" size={20} color={colors.white} />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={[styles.summaryCard, { backgroundColor: colors.success }]}>
          <Text style={styles.summaryLabel}>Total Inflow</Text>
          <Text style={styles.summaryValue}>
            Ksh {financials.totalInflow.toLocaleString()}
          </Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: colors.danger }]}>
          <Text style={styles.summaryLabel}>Total Outflow</Text>
          <Text style={styles.summaryValue}>
            Ksh {financials.totalOutflow.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Transactions List */}
      <ScrollView style={styles.transactionsList}>
        {transactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="book-open" size={50} color={colors.lightGray} />
            <Text style={styles.emptyStateText}>No transactions yet</Text>
            {business && (
              <Text style={styles.emptyStateSubtext}>
                Tap the Add button to process an M-Pesa SMS
              </Text>
            )}
          </View>
        ) : (
          transactions.map((transaction, index) => (
            <TransactionItem key={index} transaction={transaction} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  addButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: colors.white,
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  summaryLabel: {
    color: colors.white,
    fontSize: 12,
    opacity: 0.9,
  },
  summaryValue: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  transactionsList: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    color: colors.gray,
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.lightGray,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default LedgerScreen;