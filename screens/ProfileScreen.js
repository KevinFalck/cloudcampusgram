import { Image as ExpoImage } from 'expo-image';
import { Bookmark, Grid, List, Settings } from 'lucide-react-native';
import { ActivityIndicator, Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppState } from '../hooks/useAppState';
import { Theme } from '../theme/designSystem';

const { width } = Dimensions.get('window');
const columnWidth = width / 3 - 1;

export default function ProfileScreen() {
  const { mainUser, loading } = useAppState();

  if (loading || !mainUser) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.coverArea}>
          <ExpoImage
            source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80' }}
            style={styles.coverImage}
            contentFit="cover"
          />
          <View style={styles.coverOverlay} />
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarBorder}>
              <ExpoImage
                source={{ uri: mainUser?.profileImage || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }}
                style={styles.avatar}
                contentFit="cover"
              />
            </View>
          </View>
          
          <View style={styles.profileHeaderInfo}>
            <Text style={styles.name}>{mainUser?.name || 'John Doe'}</Text>
            <Text style={styles.handle}>@{mainUser?.name?.toLowerCase().replace(' ', '_') || 'user'}_pro</Text>
            <Text style={styles.bio}>Digital Architect | UX/UI Specialist | Designing the future of social experience 🌌</Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareProfileButton}>
              <Text style={styles.shareProfileButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{mainUser.postsNumber}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{mainUser.followersNumber}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{mainUser.followsNumber}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Grid size={22} color={Theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <List size={22} color={Theme.colors.textTertiary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Bookmark size={22} color={Theme.colors.textTertiary} />
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          {(mainUser.addedImages || []).map((image) => (
            <TouchableOpacity key={image.id} style={styles.gridItem} activeOpacity={0.8}>
              <ExpoImage
                source={{ uri: image.url }}
                style={styles.gridImage}
                contentFit="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverArea: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 12, 18, 0.4)',
  },
  settingsButton: {
    position: 'absolute',
    top: 15,
    right: 20,
    backgroundColor: 'rgba(26, 31, 43, 0.6)',
    padding: 10,
    borderRadius: Theme.roundness.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -60,
    paddingHorizontal: Theme.spacing.lg,
  },
  avatarWrapper: {
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.glow,
  },
  avatarBorder: {
    width: 110,
    height: 110,
    borderRadius: Theme.roundness.full,
    borderWidth: 4,
    borderColor: Theme.colors.background,
    overflow: 'hidden',
    backgroundColor: Theme.colors.surface,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  profileHeaderInfo: {
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  name: {
    fontSize: 26,
    fontWeight: '900',
    color: Theme.colors.text,
    letterSpacing: -0.5,
  },
  handle: {
    fontSize: 14,
    color: Theme.colors.primary,
    fontWeight: '700',
    marginTop: 2,
  },
  bio: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.md,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: Theme.spacing.xl,
    width: '100%',
  },
  editButton: {
    flex: 2,
    height: 48,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.roundness.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.medium,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  shareProfileButton: {
    flex: 1,
    height: 48,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.roundness.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  shareProfileButtonText: {
    color: Theme.colors.text,
    fontWeight: '700',
    fontSize: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Theme.spacing.lg,
    backgroundColor: 'rgba(26, 31, 43, 0.5)',
    marginHorizontal: Theme.spacing.md,
    borderRadius: Theme.roundness.xl,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    paddingHorizontal: Theme.spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: Theme.colors.border,
    alignSelf: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: Theme.colors.text,
  },
  statLabel: {
    fontSize: 11,
    color: Theme.colors.textTertiary,
    textTransform: 'uppercase',
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: Theme.spacing.lg,
  },
  tab: {
    flex: 1,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: Theme.colors.primary,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 1.5,
    paddingBottom: 100,
  },
  gridItem: {
    width: columnWidth,
    height: columnWidth,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
});
