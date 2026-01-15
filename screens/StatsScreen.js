import { Image as ExpoImage } from 'expo-image';
import { ChevronLeft, Heart, MessageCircle, MoreHorizontal, Share2 } from 'lucide-react-native';
import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../theme/designSystem';

const { width } = Dimensions.get('window');

export default function StatsScreen({ route, navigation }) {
  const { post, user } = route.params;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={28} color={Theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post Insights</Text>
        <TouchableOpacity style={styles.moreButton}>
          <MoreHorizontal size={22} color={Theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ExpoImage
          source={{ uri: post.url }}
          style={styles.mainImage}
          contentFit="cover"
        />
        <View style={styles.imageOverlay} />

        <View style={styles.statsCard}>
          <View style={styles.userRow}>
            <View style={styles.avatarGlow}>
              <ExpoImage source={{ uri: user.url }} style={styles.avatar} />
            </View>
            <View>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.timestamp}>Posted {post.timeStamp}</Text>
            </View>
          </View>

          <View style={styles.metricsContainer}>
            <View style={styles.metricItem}>
              <View style={[styles.iconOuter, { borderColor: 'rgba(239, 68, 68, 0.2)' }]}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                  <Heart size={22} color="#EF4444" fill="#EF4444" />
                </View>
              </View>
              <Text style={styles.metricNumber}>{post.likes}</Text>
              <Text style={styles.metricLabel}>Likes</Text>
            </View>

            <View style={styles.metricItem}>
              <View style={[styles.iconOuter, { borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                  <MessageCircle size={22} color="#10B981" />
                </View>
              </View>
              <Text style={styles.metricNumber}>{post.conversations}</Text>
              <Text style={styles.metricLabel}>Comments</Text>
            </View>

            <View style={styles.metricItem}>
              <View style={[styles.iconOuter, { borderColor: 'rgba(99, 102, 241, 0.2)' }]}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(99, 102, 241, 0.1)' }]}>
                  <Share2 size={22} color={Theme.colors.primary} />
                </View>
              </View>
              <Text style={styles.metricNumber}>42</Text>
              <Text style={styles.metricLabel}>Shares</Text>
            </View>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: Theme.colors.text,
    letterSpacing: 0.5,
  },
  backButton: {
    padding: 6,
    backgroundColor: Theme.colors.surface,
    borderRadius: 12,
  },
  moreButton: {
    padding: 6,
  },
  mainImage: {
    width: width,
    height: width * 1.1,
    backgroundColor: Theme.colors.surface,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: width * 1.1,
    backgroundColor: 'rgba(10, 12, 18, 0.2)',
  },
  statsCard: {
    backgroundColor: Theme.colors.surface,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    padding: Theme.spacing.xl,
    paddingBottom: 110,
    minHeight: 500,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    ...Theme.shadows.medium,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarGlow: {
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
  },
  userName: {
    fontSize: 20,
    fontWeight: '900',
    color: Theme.colors.text,
    letterSpacing: -0.5,
  },
  timestamp: {
    fontSize: 13,
    color: Theme.colors.textTertiary,
    marginTop: 4,
    fontWeight: '600',
  },
  metricsContainer: {
    gap: 24,
    marginBottom: 40,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 31, 43, 0.5)',
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  iconOuter: {
    width: 54,
    height: 54,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: Theme.colors.text,
    marginRight: 10,
  },
  metricLabel: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    fontWeight: '700',
    flex: 1,
  },
});
