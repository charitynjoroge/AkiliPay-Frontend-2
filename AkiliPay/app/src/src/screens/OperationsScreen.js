import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';

const OperationsScreen = ({ customers, inventory, dashboardData }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>Business Operations</Text>

      {/* Customer Management */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="account-group" size={24} color={colors.primary} />
          <Text style={styles.cardTitle}>Customers ({customers.length})</Text>
        </View>

        {customers.slice(0, 3).map((customer, index) => (
          <View key={index} style={styles.listItem}>
            <Icon name="account" size={20} color={colors.gray} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{customer.name}</Text>
              <Text style={styles.itemDetail}>{customer.phone_number}</Text>
            </View>
            <Text style={styles.itemBadge}>
              {customer.total_transactions} txns
            </Text>
          </View>
        ))}

        {customers.length === 0 && (
          <Text style={styles.emptyText}>No customers yet</Text>
        )}
      </View>

      {/* Inventory Management */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="package" size={24} color={colors.success} />
          <Text style={styles.cardTitle}>Inventory ({inventory.length})</Text>
        </View>

        {inventory.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Icon
              name={item.quantity > 0 ? "package" : "package-variant-closed"}
              size={20}
              color={item.quantity > 0 ? colors.success : colors.danger}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.item_name}</Text>
              <Text style={styles.itemDetail}>Ksh {item.price}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: item.quantity > 0 ? colors.success : colors.danger }]}>
              <Text style={styles.statusText}>{item.quantity} in stock</Text>
            </View>
          </View>
        ))}

        {inventory.length === 0 && (
          <Text style={styles.emptyText}>No inventory items</Text>
        )}
      </View>

      {/* ML Predictions */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="chart-line" size={24} color={colors.purple} />
          <Text style={styles.cardTitle}>ML Cash Flow Predictions</Text>
        </View>

        <Text style={styles.predictionMain}>
          {dashboardData?.cash_flow_status || 'Analyzing your cash flow...'}
        </Text>
        
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '75%' }]} />
        </View>
        
        <Text style={styles.predictionDetail}>
          ML Confidence: 85% • Updated just now
        </Text>
      </View>

      {/* Automation Tools */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="cog" size={24} color={colors.orange} />
          <Text style={styles.cardTitle}>Automation Tools</Text>
        </View>

        <TouchableOpacity style={styles.toolItem}>
          <Icon name="message-text" size={24} color={colors.success} />
          <View style={styles.toolInfo}>
            <Text style={styles.toolName}>Auto-process M-Pesa SMS</Text>
            <Text style={styles.toolDesc}>Automatically parse transactions</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolItem}>
          <Icon name="file-document" size={24} color={colors.primary} />
          <View style={styles.toolInfo}>
            <Text style={styles.toolName}>Generate Monthly Report</Text>
            <Text style={styles.toolDesc}>PDF report with all transactions</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolItem}>
          <Icon name="email" size={24} color={colors.warning} />
          <View style={styles.toolInfo}>
            <Text style={styles.toolName}>Send Customer Invoices</Text>
            <Text style={styles.toolDesc}>Email invoices to customers</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolItem}>
          <Icon name="alert" size={24} color={colors.danger} />
          <View style={styles.toolInfo}>
            <Text style={styles.toolName}>Suspicious Transaction Alerts</Text>
            <Text style={styles.toolDesc}>ML-powered fraud detection</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginLeft: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBorder,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  itemDetail: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  itemBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    color: colors.primary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: colors.gray,
    padding: 16,
  },
  predictionMain: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 4,
  },
  predictionDetail: {
    fontSize: 12,
    color: colors.lightGray,
  },
  toolItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBorder,
  },
  toolInfo: {
    flex: 1,
    marginLeft: 12,
  },
  toolName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  toolDesc: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
});

export default OperationsScreen;