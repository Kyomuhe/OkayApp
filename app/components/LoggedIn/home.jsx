import { View, StyleSheet, Text, Animated, Platform, TouchableOpacity, Image } from 'react-native';
import { useRef } from 'react';
import { Search } from 'lucide-react-native';
import PostCard from './postCard';
import profile from '../../../assets/images/profile2.png';
import image from '../../../assets/images/login.png';
import logo from '../../../assets/images/logoo.png';

// Constants
const HEADER_HEIGHT = Platform.OS === 'ios' ? 110 : 100;
const SCROLL_THRESHOLD = 10;
const ANIMATION_DURATION = 200;
const HEADER_HIDE_VALUE = -100;

const MOCK_POSTS = [
  {
    id: 1,
    username: "Mike Chen",
    profileImage: profile,
    timestamp: "5 hours ago",
    body: "Excited to announce that I've just launched my new web development portfolio! It's been months of hard work, but I'm so proud of how it turned out. Check it out and let me know what you think! 🚀",
    image: image,
    likes: 89,
    comments: 12
  },
  {
    id: 2,
    username: "Sarah Johnson",
    profileImage: profile,
    timestamp: "2 hours ago",
    body: "Just finished an amazing hike in the mountains! The view from the top was absolutely breathtaking. Nature really has a way of putting things in perspective. 🏔️",
    image: null,
    likes: 124,
    comments: 18
  },
  {
    id: 3,
    username: "Mike Chen",
    profileImage: profile,
    timestamp: "5 hours ago",
    body: "Excited to announce that I've just launched my new web development portfolio! It's been months of hard work, but I'm so proud of how it turned out. Check it out and let me know what you think! 🚀",
    image: image,
    likes: 89,
    comments: 12
  }
];

const HomePage = () => {
  const lastScrollY = useRef(0);
  const headerTranslateY = useRef(new Animated.Value(0)).current;

  const animateHeader = (toValue) => {
    Animated.timing(headerTranslateY, {
      toValue,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    
    if (currentScrollY < SCROLL_THRESHOLD) {
      animateHeader(0);
    } else if (currentScrollY > lastScrollY.current) {
      animateHeader(HEADER_HIDE_VALUE);
    } else if (currentScrollY < lastScrollY.current) {
      animateHeader(0);
    }
    
    lastScrollY.current = currentScrollY;
  };

  return (
    <View style={styles.container}>
      <Header headerTranslateY={headerTranslateY} />
      
      <Animated.ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {MOCK_POSTS.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const Header = ({ headerTranslateY }) => (
  <Animated.View 
    style={[
      styles.header,
      { transform: [{ translateY: headerTranslateY }] }
    ]}
  >
    <View style={styles.headerContent}>
      <ProfileButton />
      <Logo />
      <SearchButton />
    </View>
  </Animated.View>
);

const ProfileButton = () => (
  <TouchableOpacity style={styles.profileButton}>
    <Image source={profile} style={styles.profileImage} />
  </TouchableOpacity>
);

const Logo = () => (
  <View style={styles.logoContainer}>
    <Image 
      source={logo} 
      style={{ width: 160, height: 50, }} 
    />
    {/* <Text style={styles.logoText}>Its Okay</Text>
      <Text style={styles.okayText}>App</Text> */}
  </View>
);

const SearchButton = () => (
  <TouchableOpacity style={styles.searchButton}>
    <Search size={24} color="#1F2937" strokeWidth={2} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileButton: {
    width: 40,
    height: 40,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    
  },
  searchButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingTop: HEADER_HEIGHT,
    paddingBottom: 32,
    paddingHorizontal: 16,
    width: '100%',
  },
});

export default HomePage;