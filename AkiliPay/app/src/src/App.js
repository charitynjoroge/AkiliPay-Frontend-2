import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,y
  View,
  StatusBar,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components
import Header from './src/components/Header';
import NavigationButtons from './src/components/NavigationButtons';
import Modals from './src/components/Modals';

// Screens
import DashboardScreen from './src/screens/DashboardScreen';
import LedgerScreen from './src/screens/LedgerScreen';
import OperationsScreen from './src/screens/OperationsScreen';

// Services
import { fetchBusinessData, loginUser, registerBusiness, processTransaction } from './src/services/api';

// Constants
import colors from './src/constants/colors';

const App = () => {
  // State Management
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(null);
  const [business, setBusiness] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  
  // Modal States
  const [modalVisible, setModalVisible] = useState({
    login: false,
    business: false,
    transaction: false
  });

  // Form States
  const [formData, setFormData] = useState({
    login: { username: '', password: '' },
    business: { business_name: '' },
    transaction: { sms_text: '' }
  });

  // Load initial data
  useEffect(() => {
    checkUserSession();
  }, []);

  // Check if user is logged in
  const checkUserSession = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const businessData = await AsyncStorage.getItem('business');
      
      if (userData) setUser(JSON.parse(userData));
      if (businessData) {
        setBusiness(JSON.parse(businessData));
        loadBusinessData(JSON.parse(businessData).id);
      }
    } catch (error) {
      console.error('Session check failed:', error);
    }
  };

  // Load all business data
  const loadBusinessData = async (businessId) => {
    setLoading(true);
    const data = await fetchBusinessData(businessId);
    setTransactions(data.transactions);
    setCustomers(data.customers);
    setInventory(data.inventory);
    setDashboardData(data.dashboard);
    setLoading(false);
  };

  // Handle login
  const handleLogin = async () => {
    const result = await loginUser(formData.login.username, formData.login.password);
    if (result.success) {
      setUser(result.user);
      await AsyncStorage.setItem('user', JSON.stringify(result.user));
      setModalVisible({ ...modalVisible, login: false });
      setFormData({ ...formData, login: { username: '', password: '' } });
    }
    return result;
  };

  // Handle business registration
  const handleRegisterBusiness = async () => {
    if (!user) return { success: false, error: 'Please login first' };
    
    const result = await registerBusiness(formData.business.business_name, user.id);
    if (result.success) {
      setBusiness(result.business);
      await AsyncStorage.setItem('business', JSON.stringify(result.business));
      setModalVisible({ ...modalVisible, business: false });
      setFormData({ ...formData, business: { business_name: '' } });
      loadBusinessData(result.business.id);
    }
    return result;
  };

  // Handle transaction processing
  const handleProcessTransaction = async () => {
    if (!business) return { success: false, error: 'Register business first' };
    
    const result = await processTransaction(formData.transaction.sms_text, business.id);
    if (result.success) {
      setModalVisible({ ...modalVisible, transaction: false });
      setFormData({ ...formData, transaction: { sms_text: '' } });
      loadBusinessData(business.id);
    }
    return result;
  };

  // Handle logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('business');
    setUser(null);
    setBusiness(null);
    setTransactions([]);
    setCustomers([]);
    setInventory([]);
  };

  // Handle refresh
  const onRefresh = async () => {
    setRefreshing(true);
    if (business) await loadBusinessData(business.id);
    setRefreshing(false);
  };

  // Render current screen
  const renderScreen = () => {
    const props = {
      user,
      business,
      transactions,
      customers,
      inventory,
      dashboardData,
      loading
    };

    switch (activeScreen) {
      case 'dashboard':
        return <DashboardScreen {...props} />;
      case 'ledger':
        return (
          <LedgerScreen 
            {...props} 
            onAddPress={() => setModalVisible({ ...modalVisible, transaction: true })}
          />
        );
      case 'operations':
        return <OperationsScreen {...props} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <Header 
        user={user}
        business={business}
        onLoginPress={() => setModalVisible({ ...modalVisible, login: true })}
        onLogout={handleLogout}
        onBusinessPress={() => setModalVisible({ ...modalVisible, business: true })}
      />
      
      <NavigationButtons 
        activeScreen={activeScreen}
        onScreenChange={setActiveScreen}
      />
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {renderScreen()}
        </ScrollView>
      )}

      <Modals
        visible={modalVisible}
        formData={formData}
        onClose={(modalName) => setModalVisible({ ...modalVisible, [modalName]: false })}
        onFormChange={(modalName, field, value) => 
          setFormData({
            ...formData,
            [modalName]: { ...formData[modalName], [field]: value }
          })
        }
        onLogin={handleLogin}
        onRegisterBusiness={handleRegisterBusiness}
        onProcessTransaction={handleProcessTransaction}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
});

export default App;
