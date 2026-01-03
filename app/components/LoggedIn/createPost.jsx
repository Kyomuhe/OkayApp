import { View,Text,StyleSheet,Image,TextInput,TouchableOpacity,ScrollView,Alert,} from 'react-native';
import profile from '../../../assets/images/profile2.png';
import { Image as ImageIcon, X } from 'lucide-react-native';
import { makeAuthenticatedRequest, showToast } from '../../../utils/util';
import { useState } from 'react';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';
import * as FileSystem from 'expo-file-system/legacy';

const CreatePost = () => {
    const [postTitle, setTitle] = useState('');
    const [postBody, setBody] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const [imageUri, setImageUri] = useState('');

    const pickImage = async () => {
        try {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permission Denied');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled && result.assets?.length > 0) {
                const asset = result.assets[0];

                setImageUri(asset.uri);

                const base64 = await FileSystem.readAsStringAsync(asset.uri, {
                    encoding: 'base64',
                });

                setImageBase64(base64);

                console.log(' Base64 length:', base64.length);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            showToast('Image encoding failed', 'error');
        }
    };

    const removeImage = () => {
        setImageUri('');
        setImageBase64('');
    };

    const createPost = async () => {
        try {
            if (!postTitle.trim() || !postBody.trim()) {
                showToast('Please fill in both title and body', 'error');
                return;
            }

            console.log('Creating post...');
            console.log('Has image:', !!imageBase64);
            console.log('Base64 length:', imageBase64.length);

            const data = {
                title: postTitle,
                body: postBody,
                image: imageBase64 || null, 
            };

            const response = await makeAuthenticatedRequest('create','Posts',data);

            if (response?.returnCode !== 0) {
                showToast(response?.returnMessage, 'error');
                return;
            }

            showToast('Published post', 'success');

            setTitle('');
            setBody('');
            setImageBase64('');
            setImageUri('');

            router.push('components/LoggedIn/bottomTab');
        } catch (error) {
            console.error('Error creating post:', error);
            showToast(error.message, 'error');
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 10,
                }}
            >
                Create Post
            </Text>

            <Text
                style={{
                    fontSize: 14,
                    textAlign: 'center',
                    color: 'gray',
                }}
            >
                Share your thoughts with the community
            </Text>

            <View style={styles.postContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={profile}
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                    <Text style={{ marginLeft: 10, color: 'gray' }}>
                        @userName
                    </Text>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={postTitle}
                    onChangeText={setTitle}
                />

                <TextInput
                    style={[styles.input, styles.bodyInput]}
                    placeholder="What's on your mind?"
                    multiline
                    value={postBody}
                    onChangeText={setBody}
                />

                {imageUri && (
                    <View style={styles.imagePreviewContainer}>
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.imagePreview}
                        />
                        <TouchableOpacity
                            style={styles.removeImageButton}
                            onPress={removeImage}
                        >
                            <X size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                )}

                <View style={{ flexDirection: 'row', marginTop: 40 }}>
                    <TouchableOpacity
                        style={styles.imageButton}
                        onPress={pickImage}
                    >
                        <ImageIcon size={20} color="#4B5563" />
                        <Text style={styles.buttonText}>Add Image</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={createPost}
                        style={styles.publishButton}
                    >
                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                            Publish
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        marginTop: 30,
    },
    contentContainer: {
        padding: 20,
    },
    postContainer: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        padding: 15,
    },
    input: {
        height: 40,
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 15,
    },
    bodyInput: {
        height: 190,
        textAlignVertical: 'top',
    },
    imageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
    },
    publishButton: {
        marginLeft: 'auto',
        backgroundColor: '#3B82F6',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 14,
        color: '#374151',
    },
    imagePreviewContainer: {
        marginTop: 15,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    imagePreview: {
        width: '100%',
        height: 200,
    },
    removeImageButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CreatePost;
