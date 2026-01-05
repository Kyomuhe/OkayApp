import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import profile from '../../../assets/images/profile2.png';
import { Image as ImageIcon, X } from 'lucide-react-native';
import { makeAuthenticatedRequest, showToast } from '../../../utils/util';
import { useState } from 'react';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const CreatePost = () => {
    const [postTitle, setTitle] = useState('');
    const [postBody, setBody] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const [imageUri, setImageUri] = useState('');

    const pickImage = async () => {
        try {
            // Requestng media library permission
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'We need access to your photos to select an image.');
                return;
            }

            //opening the device's image library
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,//restricting to images only
                allowsEditing: true,//allowing user to edit the selected image
                aspect: [4, 3],
                quality: 0.8,        // Adjusting if images are too large
                base64: true,  //converting image to base64     
            });

            //checking if user cancelled without selecting an image
            if (result.canceled) {
                console.log('Image selection cancelled');
                return;
            }

            if (result.assets && result.assets.length > 0) {
                const asset = result.assets[0];//getting the first selected image

                setImageUri(asset.uri);

                if (asset.base64) {
                    setImageBase64(asset.base64);
                    // console.log('Image encoded to base64 successfully');
                    // console.log('Base64 length:', asset.base64.length);
                } else {
                    console.error('Base64 data missing from picker result');
                    showToast('Failed to process image', 'error');
                    setImageUri('');
                }
            }
        } catch (error) {
            console.error('Error picking image:', error);
            showToast('Failed to select image', 'error');
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

            // console.log('Preparing to send post...');
            // console.log('Image included:', !!imageBase64);
            // console.log('Base64 length:', imageBase64.length || 0);

            const data = {
                title: postTitle.trim(),
                body: postBody.trim(),
                coverImage: imageBase64 || null, 
            };
            // console.log('this is the data being sent:', data);

            const response = await makeAuthenticatedRequest('create', 'Posts', data);

            if (response?.returnCode !== 0) {
                showToast(response?.returnMessage || 'Failed to create post', 'error');
                return;
            }

            showToast('Published post successfully!', 'success');

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
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
                Create Post
            </Text>
            <Text style={{ fontSize: 14, textAlign: 'center', color: 'gray' }}>
                Share your thoughts with the community
            </Text>

            <View style={styles.postContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={profile} style={{ width: 40, height: 40, borderRadius: 20 }} />
                    <Text style={{ marginLeft: 10, color: 'gray' }}>@userName</Text>
                </View>

                <TextInput
                    style={styles.titleInput}
                    placeholder="Title"
                    value={postTitle}
                    onChangeText={setTitle}
                />

                <TextInput
                    style={styles.bodyInput}
                    placeholder="What's on your mind?"
                    multiline
                    value={postBody}
                    onChangeText={setBody}
                />

                {/* Image Preview */}
                {imageUri && (
                    <View style={styles.imagePreviewContainer}>
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.imagePreview}
                            resizeMode="cover"
                        />
                        <TouchableOpacity
                            style={styles.removeImageButton}
                            onPress={removeImage}
                            activeOpacity={0.7}
                        >
                            <X size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                )}

                <View style={{ flexDirection: 'row', marginTop: 40, alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.imageButton}
                        onPress={pickImage}
                        activeOpacity={0.7}
                    >
                        <ImageIcon size={20} color="#4B5563" />
                        <Text style={styles.buttonText}>Add Image</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={createPost}
                        style={styles.publishButton}
                        activeOpacity={0.8}
                    >
                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Publish</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.guidelinesContainer}>
                <Text style={{ fontWeight: 'bold', color: '#1E40AF' }}>Community Guidelines</Text>
                <View style={{ marginTop: 8 }}>
                    <Text style={styles.guidelineText}>• Be respectful and considerate</Text>
                    <Text style={styles.guidelineText}>• No spam or self-promotion</Text>
                    <Text style={styles.guidelineText}>• Keep discussions appropriate</Text>
                    <Text style={styles.guidelineText}>• Report any violations to moderators</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    titleInput: {
        height: 40,
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 15,
    },
    bodyInput: {
        height: 190,
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 15,
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
    buttonText: {
        fontSize: 14,
        color: '#374151',
    },
    publishButton: {
        marginLeft: 'auto',
        backgroundColor: '#3B82F6',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    imagePreviewContainer: {
        marginTop: 15,
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
    },
    imagePreview: {
        width: '100%',
        height: 200,
    },
    removeImageButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    guidelinesContainer: {
        marginTop: 30,
        marginBottom: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#dbeafe',
        borderRadius: 10,
        backgroundColor: '#eff6ff',
    },
    guidelineText: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 5,
    },
});

export default CreatePost;