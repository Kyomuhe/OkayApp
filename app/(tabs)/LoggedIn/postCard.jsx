import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Heart, MessageCircle, Bookmark } from "lucide-react-native";
import profile from '../../../assets/images/profile2.png';

const PostCard = ({ post }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={post?.profileImage || profile}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post?.username || "Kyomuhendo Precious"}</Text>
          <Text style={styles.timeStamp}>{post?.timestamp || "2hrs ago"}</Text>
        </View>
      </View>

        <Text style={styles.postBody}>{post?.body || "This post is for testing"}</Text>

      {post?.image && (
        <Image
          source={ post.image }
          style={styles.postImage}
        />
      )}

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Heart size={20} color="#6B7280" />
          <Text style={styles.actionText}>{post?.likes || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color="#6B7280" />
          <Text style={styles.actionText}>{post?.comments || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bookmarkButton}>
          <Bookmark size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D1D1D1',  
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  timeStamp: {
    fontSize: 12,
    color: '#6B7280',
  },
  postBody: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 12,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#6B7280',
  },
  bookmarkButton: {
    marginLeft: 'auto',
  },
});

export default PostCard;