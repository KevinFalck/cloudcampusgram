import { useNavigation } from '@react-navigation/native';
import { Image as ExpoImage } from 'expo-image';
import { Heart, MessageCircle, MoreHorizontal, Share2 } from 'lucide-react-native';
import { memo } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme } from '../theme/designSystem';

const { width } = Dimensions.get('window');

const PostCard = memo(({ post, user, onLike, isLiked }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <ExpoImage
            source={{ uri: user?.url }}
            style={styles.avatar}
            contentFit="cover"
          />
          <View>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.timestamp}>{post.timeStamp}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreHorizontal size={20} color={Theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={() => navigation.navigate('Stats', { post, user })}
        style={styles.imageContainer}
      >
        <ExpoImage
          source={{ uri: post.url }}
          style={styles.image}
          contentFit="cover"
        />
        <View style={styles.imageOverlay} />
      </TouchableOpacity>

      <View style={styles.footer}>
        <View style={styles.actions}>
          <View style={styles.leftActions}>
            <TouchableOpacity 
              onPress={() => onLike(post.itemId)}
              style={[styles.iconButton, isLiked && styles.activeIconButton]}
            >
              <Heart
                size={22}
                color={isLiked ? Theme.colors.primary : Theme.colors.textSecondary}
                fill={isLiked ? Theme.colors.primary : 'transparent'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MessageCircle size={22} color={Theme.colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Share2 size={22} color={Theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.statsRow}>
          <Text style={styles.statText}>
            <Text style={styles.statNumber}>{post.likes}</Text> likes
          </Text>
          <View style={styles.statDot} />
          <Text style={styles.statText}>
            <Text style={styles.statNumber}>{post.conversations}</Text> comments
          </Text>
        </View>
      </View>
    </View>
  );
});

export default PostCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.lg,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.roundness.xl,
    overflow: 'hidden',
    marginHorizontal: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    ...Theme.shadows.soft,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Theme.spacing.md,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: Theme.roundness.full,
    marginRight: Theme.spacing.sm,
    borderWidth: 1.5,
    borderColor: Theme.colors.primary,
  },
  userName: {
    fontWeight: '700',
    fontSize: 15,
    color: Theme.colors.text,
    letterSpacing: 0.1,
  },
  timestamp: {
    color: Theme.colors.textTertiary,
    fontSize: 11,
    marginTop: 1,
    fontWeight: '500',
  },
  moreButton: {
    padding: Theme.spacing.xs,
  },
  imageContainer: {
    width: '100%',
    height: width * 0.9,
    backgroundColor: Theme.colors.surfaceLight,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(99, 102, 241, 0.03)',
  },
  footer: {
    padding: Theme.spacing.md,
    backgroundColor: 'rgba(26, 31, 43, 0.5)',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  leftActions: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  iconButton: {
    padding: Theme.spacing.xs,
  },
  activeIconButton: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: Theme.roundness.md,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.xs,
  },
  statDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Theme.colors.textTertiary,
    marginHorizontal: Theme.spacing.sm,
  },
  statText: {
    fontSize: 13,
    color: Theme.colors.textSecondary,
    fontWeight: '500',
  },
  statNumber: {
    color: Theme.colors.text,
    fontWeight: '700',
  },
});
