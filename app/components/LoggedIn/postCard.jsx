import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Heart, MessageCircle, Bookmark } from "lucide-react-native";
import profile from '../../../assets/images/profile2.png';

const PostCard = ({ post }) => {
  const getTimeAgo = (timestamp) => {
    if (!timestamp) return '';

    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInMs = now - postDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return postDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Logging the coverImage value
  console.log("Post coverImage:", post?.coverImage);
  console.log("CoverImage type:", typeof post?.coverImage);
  console.log("CoverImage length:", post?.coverImage?.length);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={post?.profileImage || profile}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post?.username || "Kyomuhendo Precious"}</Text>
          <Text style={styles.timeStamp}>{getTimeAgo(post?.createdAt)}</Text>
        </View>
      </View>
      <Text style={{ marginBottom: 8, fontWeight: 'bold', fontSize: 16 }}>{post?.title || "Post Title"}</Text>

      <Text style={styles.postBody}>{post?.body || "This post is for testing"}</Text>

      {post?.coverImage && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${post.coverImage}` }}
          style={styles.postImage}
          onError={(error) => console.log("Image load error:", error.nativeEvent)}
          onLoad={() => console.log("Image loaded successfully!")}
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
    backgroundColor: '#E5E7EB', // Add a background color to see if space is reserved
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