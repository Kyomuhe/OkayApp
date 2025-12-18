import { View, Text, StyleSheet, Image, TextInput ,TouchableOpacity} from 'react-native'
import profile from '../../../assets/images/profile2.png';
import { Image as ImageIcon } from 'lucide-react-native';

const CreatePost = () => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Create Post</Text>
            <Text style={{ fontSize: 14, textAlign: 'center', color: 'gray' }}>Share your thoughts with the community</Text>
            <View style={styles.postContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={profile} style={{ width: 40, height: 40, borderRadius: 20 }} />
                    <Text style={{ marginLeft: 10, color: 'gray' }}>@userName</Text>
                </View>

                <TextInput
                    style={{
                        height: 190, borderColor: '#E5E7EB',
                        borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 15, textAlignVertical: 'top'
                    }}
                    placeholder="What's on your mind?"
                    multiline={true}
                />
                <View style={{ flexDirection:'row', marginTop: 40}}>
                <View style={{
                    flexDirection: 'row',
                    gap: 8
                }}>
                    <TouchableOpacity
                        style={styles.imageButton}
                        activeOpacity={0.7}
                    >
                        <ImageIcon size={20} color="#4B5563" />
                        <Text style={styles.buttonText}>Add Image</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{
                    marginLeft: 'auto',
                    backgroundColor: '#3B82F6',
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                }}>
                    <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Publish</Text>
                </TouchableOpacity>
                </View>

            </View>

            <View style={styles.guidelinesContainer}>
                <Text style={{ fontWeight: 'bold', color: '#1E40AF' }}>Community Guidelines</Text>
                <View>
                    <Text style={{ fontSize: 12, color: 'gray', marginBottom: 5 }}>• Be respectful and considerate</Text>
                    <Text style={{ fontSize: 12, color: 'gray', marginBottom: 5 }}>• No spam or self-promotion</Text>
                    <Text style={{ fontSize: 12, color: 'gray', marginBottom: 5 }}>• Keep discussions appropriate</Text>
                    <Text style={{ fontSize: 12, color: 'gray' }}>• Report any violations to moderators</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#F9FAFB',
        marginTop: 30,
    },
    postContainer: {
        marginTop: 20,
        flex:1,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        padding: 15,
    },
    guidelinesContainer: {
        marginTop: 30,
        padding: 15,
        borderWidth: 1,
        borderColor: '#dbeafe',
        borderRadius: 10,
        backgroundColor: '#eff6ff',
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


})
export default CreatePost;