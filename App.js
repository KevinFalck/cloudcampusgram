import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Heart, Home, MessageCircle, PlusSquare, User } from 'lucide-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useAppState } from './hooks/useAppState';
import AddPostScreen from './screens/AddPostScreen';
import ChatScreen from './screens/ChatScreen';
import ConversationsScreen from './screens/ConversationsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import FeedScreen from './screens/FeedScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import StatsScreen from './screens/StatsScreen';
import StoryViewScreen from './screens/StoryViewScreen';
import { Theme } from './theme/designSystem';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FeedStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FeedMain" component={FeedScreen} />
    <Stack.Screen name="Stats" component={StatsScreen} />
    <Stack.Screen 
      name="StoryView" 
      component={StoryViewScreen} 
      options={{ 
        presentation: 'modal',
        animationEnabled: true,
        gestureEnabled: true,
      }}
    />
  </Stack.Navigator>
);

const ChatStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ConversationsMain" component={ConversationsScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { isLoggedIn } = useAppState();

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const iconSize = focused ? size + 4 : size;
              switch (route.name) {
                case 'Feed': return <Home size={iconSize} color={color} />;
                case 'Conversations': return <MessageCircle size={iconSize} color={color} />;
                case 'AddPost': return <PlusSquare size={iconSize + 8} color={color} />;
                case 'Favorites': return <Heart size={iconSize} color={color} />;
                case 'Profile': return <User size={iconSize} color={color} />;
                default: return null;
              }
            },
            tabBarActiveTintColor: Theme.colors.primary,
            tabBarInactiveTintColor: Theme.colors.textTertiary,
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'rgba(10, 12, 18, 0.95)',
              borderTopColor: Theme.colors.border,
              height: 85,
              paddingBottom: 25,
              paddingTop: 10,
              borderTopWidth: 1,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              elevation: 0,
            },
          })}
        >
          <Tab.Screen name="Feed" component={FeedStack} />
          <Tab.Screen name="Conversations" component={ChatStack} />
          <Tab.Screen name="AddPost" component={AddPostScreen} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}
