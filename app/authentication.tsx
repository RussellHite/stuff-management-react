import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);

  const { 
    login, 
    logout, 
    signUp, 
    resetPassword,
    user, 
    isAuthenticated, 
    isLoading,
    initializeAuth 
  } = useUserStore();

  // Initialize auth when component mounts
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const validateForm = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }

    if (!isLogin) {
      if (!fullName) {
        Alert.alert('Error', 'Please enter your full name');
        return false;
      }
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return false;
      }
      if (password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long');
        return false;
      }
    }

    return true;
  };

  const handleAuth = async () => {
    if (!validateForm()) return;

    try {
      if (isLogin) {
        await login(email.trim(), password);
        Alert.alert('Success', 'Welcome back!');
      } else {
        const { emailSent } = await signUp(email.trim(), password, fullName.trim());
        
        if (emailSent) {
          Alert.alert(
            'Check Your Email',
            'We sent you a confirmation link. Please check your email and click the link to activate your account.',
            [
              {
                text: 'OK',
                onPress: () => {
                  setIsLogin(true);
                  setEmail('');
                  setPassword('');
                  setFullName('');
                  setConfirmPassword('');
                }
              }
            ]
          );
        } else {
          Alert.alert('Success', 'Account created successfully!');
        }
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Authentication failed');
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    try {
      await resetPassword(email.trim());
      Alert.alert(
        'Reset Email Sent',
        'Check your email for password reset instructions.',
        [
          {
            text: 'OK',
            onPress: () => setShowResetPassword(false)
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Password reset failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Success', 'You have been signed out');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Sign out failed');
    }
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
                {user.avatar ? (
                  <Image 
                    source={{ uri: user.avatar }} 
                    style={styles.avatarImage}
                    defaultSource={{ uri: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}` }}
                  />
                ) : (
                  <MaterialIcons name="person" size={48} color="#007AFF" />
                )}
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
            {!isLogin && (
              <View style={styles.inputContainer}>
                <MaterialIcons name="person" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!showResetPassword}
              />
            </View>

            {!showResetPassword && (
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
            )}

            {!isLogin && !showResetPassword && (
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
              onPress={showResetPassword ? handleResetPassword : handleAuth}
              disabled={isLoading}
            >
              <Text style={styles.primaryButtonText}>
                {isLoading 
                  ? 'Loading...' 
                  : showResetPassword 
                    ? 'Send Reset Email'
                    : isLogin 
                      ? 'Sign In' 
                      : 'Create Account'
                }
              </Text>
            </TouchableOpacity>

            {isLogin && !showResetPassword && (
              <TouchableOpacity 
                style={styles.linkButton}
                onPress={() => setShowResetPassword(true)}
              >
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            {showResetPassword && (
              <TouchableOpacity 
                style={styles.linkButton}
                onPress={() => {
                  setShowResetPassword(false);
                  setEmail('');
                }}
              >
                <Text style={styles.linkText}>Back to Sign In</Text>
              </TouchableOpacity>
            )}
          </View>

          {!showResetPassword && (
            <View style={styles.switchModeContainer}>
              <Text style={styles.switchModeText}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </Text>
              <TouchableOpacity 
                onPress={() => {
                  setIsLogin(!isLogin);
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                  setFullName('');
                }}
              >
                <Text style={styles.switchModeLink}>
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.note}>
            <MaterialIcons name="info" size={16} color="#666" />
            <Text style={styles.noteText}>
              {showResetPassword 
                ? 'Enter your email address to receive password reset instructions.'
                : isLogin
                  ? 'Sign in with your email and password. First time? Create an account below.'
                  : 'Create a new account. You may need to verify your email address.'
              }
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
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  switchModeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: tokens.spacing.md,
    gap: tokens.spacing.xs,
  },
  switchModeText: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat',
    color: semanticColors.text.secondary,
  },
  switchModeLink: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat-SemiBold',
    color: semanticColors.text.accent,
  },
});
