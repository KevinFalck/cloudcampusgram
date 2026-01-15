import { ChevronRight, Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppState } from '../hooks/useAppState';
import { Theme } from '../theme/designSystem';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAppState();

  const handleLogin = () => {
    if (email && password) {
      login();
    } else {
      Alert.alert('Authentication', 'Please enter your academic credentials to proceed.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.meshGlow} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <View style={styles.logoWrapper}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>Gram</Text>
            </View>
          </View>
          <Text style={styles.title}>CloudCampus Gram</Text>
          <Text style={styles.subtitle}>Welcome back. Connect with your campus community.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Mail size={18} color={Theme.colors.textTertiary} style={styles.inputIcon} />
            <TextInput
              placeholder="Campus Email"
              placeholderTextColor={Theme.colors.textTertiary}
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={18} color={Theme.colors.textTertiary} style={styles.inputIcon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor={Theme.colors.textTertiary}
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Recover Access</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign In</Text>
            <ChevronRight size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signupText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  meshGlow: {
    position: 'absolute',
    top: -width,
    right: -width,
    width: width * 2,
    height: width * 2,
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
    borderRadius: width,
  },
  content: {
    flex: 1,
    paddingHorizontal: Theme.spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xxl,
  },
  logoWrapper: {
    ...Theme.shadows.glow,
    marginBottom: 24,
  },
  logoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.roundness.md,
    transform: [{ rotate: '-3deg' }],
  },
  logoText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: Theme.colors.text,
    letterSpacing: -1.5,
  },
  subtitle: {
    fontSize: 15,
    color: Theme.colors.textSecondary,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 22,
  },
  form: {
    marginBottom: Theme.spacing.lg,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.roundness.lg,
    marginBottom: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
    height: 64,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: Theme.colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Theme.spacing.xl,
  },
  forgotPasswordText: {
    color: Theme.colors.textTertiary,
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.roundness.lg,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.medium,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginRight: 8,
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Theme.spacing.xl,
  },
  footerText: {
    color: Theme.colors.textTertiary,
    fontSize: 15,
  },
  signupText: {
    color: Theme.colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },
});
