import { Camera, Image as ImageIcon, MapPin, Users, X } from 'lucide-react-native';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../theme/designSystem';

export default function AddPostScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <X size={24} color={Theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Share</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.inputCard}>
          <TextInput
            placeholder="Write a caption..."
            placeholderTextColor={Theme.colors.textTertiary}
            style={styles.input}
            multiline
          />
          <TouchableOpacity style={styles.mediaPlaceholder}>
            <ImageIcon size={32} color={Theme.colors.primary} />
            <Text style={styles.mediaLabel}>Add Photos/Videos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.optionsGrid}>
          <TouchableOpacity style={styles.optionCard}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(99, 102, 241, 0.1)' }]}>
              <Camera size={22} color={Theme.colors.primary} />
            </View>
            <Text style={styles.optionText}>Camera</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionCard}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(20, 184, 166, 0.1)' }]}>
              <ImageIcon size={22} color={Theme.colors.secondary} />
            </View>
            <Text style={styles.optionText}>Library</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.optionCard, { width: '100%', flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 20 }]}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(139, 92, 246, 0.1)', marginRight: 15, marginBottom: 0 }]}>
              <MapPin size={22} color={Theme.colors.accent} />
            </View>
            <Text style={styles.optionText}>Add Location</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.optionCard, { width: '100%', flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 20 }]}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(16, 185, 129, 0.1)', marginRight: 15, marginBottom: 0 }]}>
              <Users size={22} color={Theme.colors.success} />
            </View>
            <Text style={styles.optionText}>Tag People</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  closeButton: {
    padding: 6,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.roundness.md,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: Theme.colors.text,
    letterSpacing: -0.5,
  },
  postButton: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: Theme.roundness.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Theme.shadows.medium,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 15,
  },
  content: {
    padding: Theme.spacing.lg,
  },
  inputCard: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.roundness.xl,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginBottom: Theme.spacing.xl,
  },
  input: {
    fontSize: 18,
    minHeight: 140,
    color: Theme.colors.text,
    textAlignVertical: 'top',
    fontWeight: '500',
  },
  mediaPlaceholder: {
    height: 120,
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
    borderRadius: Theme.roundness.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Theme.colors.primary,
  },
  mediaLabel: {
    color: Theme.colors.primary,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionCard: {
    width: '48%',
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.lg,
    borderRadius: Theme.roundness.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.colors.text,
  },
});
