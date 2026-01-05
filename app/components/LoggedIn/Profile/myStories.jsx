import { ScrollView, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { makeAuthenticatedRequest, showToast } from '../../../../utils/util'
import PostCard from '../postCard'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MyStories = () => {
    const [stories, setStories] = useState([]);
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

    return (
        <ScrollView style={styles.container}>
            {stories.map(post => (
                <PostCard key={post.id} post={post} />
            ))}

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,

    }

})
export default MyStories;