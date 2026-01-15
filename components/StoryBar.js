import { Image as ExpoImage } from 'expo-image';
import { Plus } from 'lucide-react-native';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme } from '../theme/designSystem';

export default function StoryBar({ users, onStoryPress }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.storyContainer} 
      onPress={() => onStoryPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.avatarGlow}>
        <View style={styles.avatarBorder}>
          <ExpoImage source={{ uri: item.url }} style={styles.avatar} contentFit="cover" />
        </View>
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {item.name.split(' ')[0]}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={
          <TouchableOpacity style={styles.addStoryContainer} activeOpacity={0.8}>
            <View style={styles.addStory}>
              <Plus size={24} color={Theme.colors.primary} />
            </View>
            <Text style={styles.addText}>Your story</Text>
          </TouchableOpacity>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Theme.spacing.lg,
    backgroundColor: Theme.colors.background,
  },
  listContent: {
    paddingHorizontal: Theme.spacing.md,
  },
  storyContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  avatarGlow: {
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarBorder: {
    width: 72,
    height: 72,
    borderRadius: Theme.roundness.full,
    padding: 3,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    marginBottom: Theme.spacing.xs,
    backgroundColor: Theme.colors.background,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: Theme.roundness.full,
  },
  storyName: {
    fontSize: 11,
    color: Theme.colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  addStoryContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  addStory: {
    width: 72,
    height: 72,
    borderRadius: Theme.roundness.full,
    backgroundColor: Theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    marginBottom: Theme.spacing.xs,
    borderStyle: 'dashed',
  },
  addText: {
    fontSize: 11,
    color: Theme.colors.textTertiary,
    fontWeight: '600',
    marginTop: 2,
  },
});
