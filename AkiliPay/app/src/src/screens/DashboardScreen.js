import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FinancialCard from '../components/FinancialCard';
import { calculateFinancials, getFinancialAdvice } from '../utils/helpers';
import colors from '../constants/colors';

const DashboardScreen = ({
  user,
  business,
  transactions,
  customers,
  inventory,
  dashboardData,
}) => {
  const financials = calculateFinancials(transactions);
  const advice = getFinancialAdvice(financials);

  return (
    <ScrollView style={styles.container}>
      {/* Business Header */}
      <View style={styles.businessHeader}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.businessName}>
            {business?.business_name || 'Guest User'}
          </Text>
        </View>
      </View>

      {/* Financial Cards */}
      <View style={styles.financialCards}>
        <FinancialCard
          title="Revenue"
          amount={financials.totalInflow}
          icon="cash-plus"
          color={colors.success}
        />
        <FinancialCard
          title="Expenses"
          amount={financials.totalOutflow}
          icon="cash-minus"
          color={colors.danger}
        />
      </View>

      {/* Net Cashflow */}
      <View style={styles.netCashflowCard}>
        <Icon
          name={financials.netCashflow >= 0 ? 'trending-up' : 'trending-down'}
          size={40}
          color={financials.netCashflow >= 0 ? colors.success : colors.danger}
        />
        <Text style={styles.netCashflowLabel}>Net Cash Flow</Text>
        <Text
          style={[
            styles.netCashflowValue,
            { color: financials.netCashflow >= 0 ? colors.success : colors.danger },
          ]}>
          Ksh {financials.netCashflow.toLocaleString()}
        </Text>
      </View>

      {/* ML Alert */}
      {financials.suspiciousCount > 0 && (
        <View style={styles.suspiciousAlert}>
          <Icon name="alert-circle" size={24} color={colors.white} />
          <Text style={styles.suspiciousText}>
            {financials.suspiciousCount} suspicious transaction(s) detected
          </Text>
        </View>
      )}

      {/* Advice Card */}
      <View style={[styles.adviceCard, { backgroundColor: advice.color }]}>
        <Text style={styles.adviceTitle}>{advice.title}</Text>
        <Text style={styles.adviceMessage}>{advice.message}</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{customers.length}</Text>
          <Text style={styles.statLabel}>Customers</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{transactions.length}</Text>
          <Text style={styles.statLabel}>Transactions</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{inventory.length}</Text>
          <Text style={styles.statLabel}>Products</Text>
        </View>
      </View>

      {/* Savings Tips */}
      <View style={styles.savingsCard}>
        <Text style={styles.savingsTitle}>💰 Savings & Budgeting Tips</Text>
        
        <View style={styles.tipItem}>
          <Icon name="lightbulb-on" size={20} color={colors.warning} />
          <Text style={styles.tipText}>
            Save 20% of revenue: Ksh {(financials.totalInflow * 0.2).toLocaleString()}
          </Text>
        </View>
        
        <View style={styles.tipItem}>
          <Icon name="lightbulb-on" size={20} color={colors.warning} />
          <Text style={styles.tipText}>
            Emergency fund target: Ksh {(financials.totalOutflow * 3).toLocaleString()}
          </Text>
        </View>
        
        <View style={styles.tipItem}>
          <Icon name="lightbulb-on" size={20} color={colors.warning} />
          <Text style={styles.tipText}>
            Expense ratio: {financials.expenseRatio.toFixed(1)}% (Target: {'<'}70%)
          </Text>
        </View>
      </View>

      {/* ML Prediction */}
      {dashboardData?.cash_flow_status && (
        <View style={styles.predictionCard}>
          <Icon name="chart-line" size={24} color={colors.info} />
          <Text style={styles.predictionText}>{dashboardData.cash_flow_status}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  businessHeader: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeText: {
    fontSize: 14,
    color: colors.gray,
  },
  businessName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  financialCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  netCashflowCard: {
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  netCashflowLabel: {
    fontSize: 16,
    color: colors.gray,
    marginTop: 8,
  },
  netCashflowValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  suspiciousAlert: {
    backgroundColor: colors.danger,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  suspiciousText: {
    color: colors.white,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  adviceCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  adviceTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  adviceMessage: {
    color: colors.white,
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    justifyContent: 'space-around',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: colors.border,
  },
  savingsCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  savingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.gray,
    flex: 1,
  },
  predictionCard: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  predictionText: {
    marginLeft: 12,
    fontSize: 14,
    color: colors.info,
    flex: 1,
  },
});

export default DashboardScreen;