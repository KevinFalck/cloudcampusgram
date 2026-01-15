import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostCard from '../components/PostCard';
import { useAppState } from '../hooks/useAppState';
import { Theme } from '../theme/designSystem';

export default function FavoritesScreen() {
  const { feedItems, users, likedPosts, toggleLike } = useAppState();

  const favoritePosts = (feedItems || []).filter((item) => likedPosts.includes(item.itemId));

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
        <Text style={styles.emptyEmoji}>✨</Text>
      </View>
      <Text style={styles.emptyText}>No Favorites Yet</Text>
      <Text style={styles.emptySubtext}>Your favorite posts will appear here once you tap the heart.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        <Text style={styles.headerSubtitle}>Saved Moments</Text>
      </View>
      <FlatList
        data={favoritePosts}
        keyExtractor={(item) => item.itemId.toString()}
        renderItem={({ item }) => {
          const user = users.find((u) => u.id === item.authorId);
          return (
            <PostCard
              post={item}
              user={user}
              onLike={toggleLike}
              isLiked={true}
            />
          );
        }}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[styles.listContent, favoritePosts.length === 0 ? { flex: 1 } : null]}
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
  header: {
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.sm,
    paddingBottom: Theme.spacing.lg,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: Theme.colors.text,
    letterSpacing: -1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Theme.colors.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: -4,
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    ...Theme.shadows.glow,
  },
  emptyEmoji: {
    fontSize: 42,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '900',
    color: Theme.colors.text,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 15,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
});
