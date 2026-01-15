import { Image as ExpoImage } from 'expo-image';
import { Edit, Search } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppState } from '../hooks/useAppState';
import { fetchConversations } from '../services/api';
import { Theme } from '../theme/designSystem';

export default function ConversationsScreen({ navigation }) {
  const { users } = useAppState();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, [users]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await fetchConversations();
      setConversations(data || []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const user = users.find((u) => u.id === item.userId);
    if (!user) return null;

    return (
      <TouchableOpacity 
        style={styles.chatItem}
        onPress={() => navigation.navigate('Chat', { user })}
        activeOpacity={0.7}
      >
        <View style={styles.avatarWrapper}>
          <ExpoImage source={{ uri: user.url }} style={styles.avatar} contentFit="cover" />
          <View style={styles.onlineStatus} />
        </View>
        <View style={styles.chatInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.lastMessage} numberOfLines={1}>{item.text}</Text>
        </View>
        <View style={styles.chatMeta}>
          <Text style={styles.time}>12:45</Text>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount}>1</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Edit size={22} color={Theme.colors.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchBar}>
        <Search size={18} color={Theme.colors.textTertiary} />
        <Text style={styles.searchText}>Search connections...</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={Theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    paddingVertical: Theme.spacing.md,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: Theme.colors.text,
    letterSpacing: -1,
  },
  headerButton: {
    backgroundColor: Theme.colors.surface,
    padding: 10,
    borderRadius: Theme.roundness.full,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 31, 43, 0.5)',
    marginHorizontal: Theme.spacing.md,
    padding: 14,
    borderRadius: Theme.roundness.lg,
    marginBottom: Theme.spacing.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  searchText: {
    marginLeft: 10,
    color: Theme.colors.textTertiary,
    fontSize: 15,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: 100,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: Theme.roundness.full,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
  },
  onlineStatus: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Theme.colors.secondary,
    borderWidth: 3,
    borderColor: Theme.colors.background,
  },
  chatInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.colors.text,
    marginBottom: 4,
  },
  lastMessage: {
    color: Theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  chatMeta: {
    alignItems: 'flex-end',
    gap: 8,
  },
  time: {
    color: Theme.colors.textTertiary,
    fontSize: 12,
    fontWeight: '600',
  },
  unreadBadge: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Theme.roundness.sm,
    ...Theme.shadows.soft,
  },
  unreadCount: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '900',
  },
});
