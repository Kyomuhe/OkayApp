import { View, ScrollView, StyleSheet } from 'react-native';
import PostCard from './postCard';
import profile from '../../../assets/images/profile2.png';
import image from '../../../assets/images/login.png';

const HomePage = () => {
  const posts = [
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

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    marginTop: 30,
  },
  scrollContent: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    width: '100%',
  },
});

export default HomePage;