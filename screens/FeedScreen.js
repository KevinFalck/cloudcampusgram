import { Bell, Search } from 'lucide-react-native';
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostCard from '../components/PostCard';
import StoryBar from '../components/StoryBar';
import { useAppState } from '../hooks/useAppState';
import { Theme } from '../theme/designSystem';

export default function FeedScreen({ navigation }) {
  const { feedItems, users, loading, toggleLike, likedPosts } = useAppState();

  const renderHeader = () => (
    <>
      <View style={styles.headerTitleContainer}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Gram</Text>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>PRO</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIcon}>
            <Search size={22} color={Theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Bell size={22} color={Theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <StoryBar users={users} onStoryPress={(user) => navigation.navigate('StoryView', { user })} />
    </>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <View style={styles.meshGradient} />
      <FlatList
        data={feedItems}
        keyExtractor={(item) => item.itemId.toString()}
        renderItem={({ item }) => {
          const user = users.find((u) => u.id === item.authorId);
          return (
            <PostCard
              post={item}
              user={user}
              onLike={toggleLike}
              isLiked={likedPosts.includes(item.itemId)}
            />
          );
        }}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  meshGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.sm,
    paddingBottom: Theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: Theme.colors.text,
    letterSpacing: -1.5,
  },
  headerBadge: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  headerBadgeText: {
    color: Theme.colors.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  listContent: {
    paddingBottom: 100,
  },
});
