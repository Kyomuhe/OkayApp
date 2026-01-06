import { ScrollView, StyleSheet, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { makeAuthenticatedRequest, showToast } from '../../../../utils/util'
import PostCard from '../postCard'
import PostOptionsMenu from './PostOptionsMenu'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MyStories = () => {
    const [stories, setStories] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        displayMyStories();
    }, []);

    const displayMyStories = async () => {
        try {
            const userString = await AsyncStorage.getItem('user')
            const user = JSON.parse(userString);
            const Id = { userId: user.id };
            console.log("User ID:", Id);
            const response = await makeAuthenticatedRequest("displayPost", "Posts", Id);
            if (response?.returnCode !== 0) {
                showToast(response.returnMessage, 'error');
                return;
            }

            const myStories = (response?.returnObject || []).reverse();
            setStories(myStories);

        } catch (error) {
            showToast(error.message, 'error')
        }
    }

    const handleMorePress = (post) => {
        setSelectedPost(post);
        setMenuVisible(true);
    }

    const handleEdit = () => {
        // TODO: Navigate to edit screen or open edit modal
        console.log('Edit post:', selectedPost);
        showToast('Edit functionality coming soon', 'info');
        // Example: navigation.navigate('EditPost', { post: selectedPost });
    }

    const handleDelete = () => {
        Alert.alert(
            'Delete Story',
            'Are you sure you want to delete this story? This action cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            // TODO: Call your delete API endpoint
                            const response = await makeAuthenticatedRequest(
                                "deletePost", 
                                "Posts", 
                                { postId: selectedPost.id }
                            );
                            
                            if (response?.returnCode !== 0) {
                                showToast(response.returnMessage, 'error');
                                return;
                            }

                            // Remove the post from local state
                            setStories(stories.filter(story => story.id !== selectedPost.id));
                            showToast('Story deleted successfully', 'success');
                        } catch (error) {
                            showToast(error.message, 'error');
                        }
                    },
                },
            ]
        );
    }

    return (
        <>
            <ScrollView style={styles.container}>
                {stories.map(post => (
                    <PostCard 
                        key={post.id} 
                        post={post} 
                        showMoreIcon={true}
                        onMorePress={() => handleMorePress(post)}
                    />
                ))}
            </ScrollView>

            <PostOptionsMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    }
})

export default MyStories;