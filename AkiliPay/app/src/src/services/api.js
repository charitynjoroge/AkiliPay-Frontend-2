import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.x.x:5000'; // REPLACE WITH YOUR COMPUTER'S IP

// Fetch all business data
export const fetchBusinessData = async (businessId) => {
  try {
    const [transactionsRes, customersRes, inventoryRes, dashboardRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/transactions`),
      fetch(`${API_BASE_URL}/api/customers`),
      fetch(`${API_BASE_URL}/api/inventory`),
      fetch(`${API_BASE_URL}/api/dashboard`),
    ]);

    const transactions = await transactionsRes.json();
    const customers = await customersRes.json();
    const inventory = await inventoryRes.json();
    const dashboard = await dashboardRes.json();

    return { transactions, customers, inventory, dashboard };
  } catch (error) {
    console.error('Error fetching business data:', error);
    return { transactions: [], customers: [], inventory: [], dashboard: null };
  }
};

// Login user
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        user: { id: data.user_id, username },
        message: data.message,
      };
    }
    return { success: false, error: data.error || 'Login failed' };
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

// Register business
export const registerBusiness = async (businessName, userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/business/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ business_name: businessName, user_id: userId }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, business: data.business };
    }
    return { success: false, error: 'Registration failed' };
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

// Process M-Pesa SMS
export const processTransaction = async (smsText, businessId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/parse-sms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sms_text: smsText, business_id: businessId }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data: data.data };
    }
    return { success: false, error: data.error || 'Processing failed' };
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};