import React from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';

const Modals = ({
  visible,
  formData,
  onClose,
  onFormChange,
  onLogin,
  onRegisterBusiness,
  onProcessTransaction,
}) => {
  // Handle login submission
  const handleLogin = async () => {
    const result = await onLogin();
    if (result?.success) {
      Alert.alert('Success', result.message);
    } else {
      Alert.alert('Error', result?.error || 'Login failed');
    }
  };

  // Handle business registration
  const handleRegisterBusiness = async () => {
    const result = await onRegisterBusiness();
    if (result?.success) {
      Alert.alert('Success', 'Business registered successfully');
    } else {
      Alert.alert('Error', result?.error || 'Registration failed');
    }
  };

  // Handle transaction processing
  const handleProcessTransaction = async () => {
    const result = await onProcessTransaction();
    if (result?.success) {
      Alert.alert('Success', 'Transaction processed successfully');
    } else {
      Alert.alert('Error', result?.error || 'Processing failed');
    }
  };

  return (
    <>
      {/* Login Modal */}
      <Modal visible={visible.login} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Login</Text>
              <TouchableOpacity onPress={() => onClose('login')}>
                <Icon name="close" size={24} color={colors.gray} />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={formData.login.username}
              onChangeText={(text) => onFormChange('login', 'username', text)}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={formData.login.password}
              onChangeText={(text) => onFormChange('login', 'password', text)}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => onClose('login')}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleLogin}>
                <Text style={styles.submitButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Business Registration Modal */}
      <Modal visible={visible.business} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Register Business</Text>
              <TouchableOpacity onPress={() => onClose('business')}>
                <Icon name="close" size={24} color={colors.gray} />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.input}
              placeholder="Business Name"
              value={formData.business.business_name}
              onChangeText={(text) => onFormChange('business', 'business_name', text)}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => onClose('business')}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleRegisterBusiness}>
                <Text style={styles.submitButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Transaction Modal */}
      <Modal visible={visible.transaction} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Transaction</Text>
              <TouchableOpacity onPress={() => onClose('transaction')}>
                <Icon name="close" size={24} color={colors.gray} />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Paste M-Pesa SMS here..."
              multiline
              numberOfLines={4}
              value={formData.transaction.sms_text}
              onChangeText={(text) => onFormChange('transaction', 'sms_text', text)}
              textAlignVertical="top"
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => onClose('transaction')}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleProcessTransaction}>
                <Text style={styles.submitButtonText}>Process</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.exampleBox}>
              <Text style={styles.exampleTitle}>Example SMS:</Text>
              <Text style={styles.exampleText}>
                RGF589KL2P Confirmed. You have received Ksh15,000.00 from 
                EVELYN NGANGA 0712345678 on 12/3/26 at 2:30 PM
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: colors.background,
  },
  cancelButtonText: {
    color: colors.gray,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: colors.primary,
  },
  submitButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  exampleBox: {
    marginTop: 20,
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  exampleTitle: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 12,
    color: colors.black,
    lineHeight: 18,
  },
});

export default Modals;