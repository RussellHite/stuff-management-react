import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens, semanticColors } from '../src/design';
import { Header } from '../src/components';
import { useUserStore } from '../src/store';

export default function AuthenticationScreen() {
  const insets = useSafeAreaInsets();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('demo@stuffhappens.com');
  const [password, setPassword] = useState('demo123');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { login, logout, user, isAuthenticated, isLoading } = useUserStore();

  const handleAuth = async () => {
    if (isLogin) {
      try {
        await login(email, password);
        Alert.alert('Success', 'Logged in successfully!');
      } catch (error) {
        Alert.alert('Error', error instanceof Error ? error.message : 'Login failed');
      }
    } else {
      Alert.alert('Info', 'Registration functionality coming soon!');
    }
  };

  const handleLogout = () => {
    logout();
    Alert.alert('Success', 'Logged out successfully!');
  };

  // Show user profile if authenticated
  if (isAuthenticated && user) {
    return (
      <View style={styles.container}>
        <Header title="Profile" showBackButton={true} />

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <View style={styles.profileHeader}>
              <View style={styles.avatar}>
                <MaterialIcons name="person" size={48} color="#007AFF" />
              </View>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <MaterialIcons name="logout" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.logoutButtonText}>Sign Out</Text>
            </TouchableOpacity>

            <View style={styles.note}>
              <MaterialIcons name="info" size={16} color="#666" />
              <Text style={styles.noteText}>
                You are successfully logged in! Profile editing and user management features coming
                soon.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Authentication" showBackButton={true} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, isLogin && styles.toggleButtonActive]}
              onPress={() => setIsLogin(true)}
            >
              <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, !isLogin && styles.toggleButtonActive]}
              onPress={() => setIsLogin(false)}
            >
              <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>Register</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {!isLogin && (
              <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
            )}

            <TouchableOpacity
              style={[styles.primaryButton, isLoading && styles.disabledButton]}
              onPress={handleAuth}
              disabled={isLoading}
            >
              <Text style={styles.primaryButtonText}>
                {isLoading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            {isLogin && (
              <TouchableOpacity style={styles.linkButton}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.note}>
            <MaterialIcons name="info" size={16} color="#666" />
            <Text style={styles.noteText}>
              This is a placeholder authentication screen. No actual authentication is implemented
              yet.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semanticColors.background.secondary,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: tokens.spacing.lg,
    marginBottom: tokens.spacing.md,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: semanticColors.background.secondary,
    borderRadius: tokens.borderRadius.sm,
    padding: tokens.spacing.xs,
    marginBottom: tokens.spacing.lg,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: tokens.spacing.sm,
    alignItems: 'center',
    borderRadius: tokens.borderRadius.xs,
  },
  toggleButtonActive: {
    backgroundColor: tokens.colors.white,
  },
  toggleText: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat',
    color: semanticColors.text.secondary,
  },
  toggleTextActive: {
    color: semanticColors.text.primary,
    fontFamily: 'Montserrat-SemiBold',
  },
  form: {
    gap: tokens.spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: semanticColors.border.light,
    borderRadius: tokens.borderRadius.sm,
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: tokens.spacing.md,
  },
  inputIcon: {
    marginRight: tokens.spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat',
    color: semanticColors.text.primary,
  },
  primaryButton: {
    backgroundColor: semanticColors.button.primary,
    paddingVertical: tokens.spacing.md,
    borderRadius: tokens.borderRadius.sm,
    alignItems: 'center',
    marginTop: tokens.spacing.sm,
  },
  primaryButtonText: {
    color: tokens.colors.white,
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat-SemiBold',
  },
  disabledButton: {
    opacity: 0.6,
  },
  linkButton: {
    alignItems: 'center',
    paddingVertical: tokens.spacing.sm,
  },
  linkText: {
    color: semanticColors.text.accent,
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat',
  },
  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: tokens.spacing.sm,
    marginTop: tokens.spacing.md,
    gap: tokens.spacing.sm,
  },
  noteText: {
    flex: 1,
    fontSize: tokens.fontSize.sm,
    fontFamily: 'Montserrat',
    color: semanticColors.text.secondary,
    lineHeight: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: tokens.spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: semanticColors.button.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: tokens.spacing.md,
  },
  userName: {
    fontSize: tokens.fontSize.lg,
    fontFamily: 'Besley-Bold',
    color: semanticColors.text.primary,
    marginBottom: tokens.spacing.xs,
  },
  userEmail: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat',
    color: semanticColors.text.secondary,
  },
  logoutButton: {
    backgroundColor: semanticColors.button.danger,
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.lg,
    borderRadius: tokens.borderRadius.sm,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: tokens.spacing.md,
  },
  logoutButtonText: {
    color: tokens.colors.white,
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat-SemiBold',
  },
});
