import { Image as ExpoImage } from 'expo-image';
import { ChevronLeft, MoreVertical, Send } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
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
import { fetchMessages } from '../services/api';
import { Theme } from '../theme/designSystem';

export default function ChatScreen({ route, navigation }) {
  const { user } = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await fetchMessages(user.id);
      setMessages(data.messages || []);
    } catch (error) {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        type: 'from',
        text: inputText.trim(),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const renderItem = ({ item }) => {
    const isFromMe = item.type === 'from';
    return (
      <View style={[styles.messageBubble, isFromMe ? styles.myMessage : styles.theirMessage]}>
        {!isFromMe && <ExpoImage source={{ uri: user.url }} style={styles.bubbleAvatar} />}
        <View style={[styles.bubbleContent, isFromMe ? styles.myBubbleContent : styles.theirBubbleContent]}>
          <Text style={[styles.messageText, isFromMe ? styles.myMessageText : styles.theirMessageText]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft size={28} color={Theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.userInfo} activeOpacity={0.7}>
            <View style={styles.avatarGlow}>
              <ExpoImage source={{ uri: user.url }} style={styles.avatar} />
            </View>
            <View>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userStatus}>Online</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical size={22} color={Theme.colors.text} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={Theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputArea}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor={Theme.colors.textTertiary}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
          </View>
          <TouchableOpacity 
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]} 
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Send size={20} color="#fff" />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    backgroundColor: 'rgba(26, 31, 43, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarGlow: {
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: Theme.colors.primary,
  },
  userName: {
    fontSize: 17,
    fontWeight: '800',
    color: Theme.colors.text,
  },
  userStatus: {
    fontSize: 11,
    color: Theme.colors.secondary,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  moreButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 20,
    maxWidth: '82%',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  theirMessage: {
    alignSelf: 'flex-start',
  },
  bubbleAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  bubbleContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
  },
  myBubbleContent: {
    backgroundColor: Theme.colors.primary,
    borderBottomRightRadius: 4,
    ...Theme.shadows.soft,
  },
  theirBubbleContent: {
    backgroundColor: Theme.colors.surface,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  myMessageText: {
    color: '#fff',
  },
  theirMessageText: {
    color: Theme.colors.text,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.lg,
    paddingBottom: 100, // Clearance for absolute tab bar
    backgroundColor: 'rgba(10, 12, 18, 0.9)',
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: Theme.colors.surface,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  input: {
    color: Theme.colors.text,
    fontSize: 15,
    maxHeight: 120,
    fontWeight: '500',
  },
  sendButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    ...Theme.shadows.medium,
  },
  sendButtonDisabled: {
    backgroundColor: Theme.colors.surfaceLight,
    opacity: 0.5,
  },
});
