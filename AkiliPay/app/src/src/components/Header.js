import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';

const Header = ({ user, business, onLoginPress, onLogout, onBusinessPress }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>AkiliPay</Text>
        {business && <Text style={styles.businessName}>{business.business_name}</Text>}
      </View>

      <View style={styles.userSection}>
        {user ? (
          <>
            <Text style={styles.userName}>{user.username}</Text>
            <TouchableOpacity onPress={onLogout} style={styles.iconButton}>
              <Icon name="logout" size={20} color={colors.danger} />
            </TouchableOpacity>
            {!business && (
              <TouchableOpacity style={styles.registerButton} onPress={onBusinessPress}>
                <Text style={styles.registerButtonText}>Register Business</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  businessName: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    marginRight: 8,
    fontSize: 14,
    color: colors.black,
  },
  iconButton: {
    padding: 4,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: colors.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  registerButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Header;