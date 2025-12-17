import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
const Dont = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>You Are Almost There</Text>
            <Text style={styles.note}>Remember, even though you are not a medical professional, you can still help.
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter First Name'
                        placeholderTextColor="#999"

                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Last Name'
                        placeholderTextColor="#999"

                    />
                </View>
            </View>

            <Text style={styles.label}>User Name</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your username'
                placeholderTextColor="#999"

            />
            <Text style={styles.label}>Problem you are suffering from</Text>
            <TextInput
                style={styles.input}
                placeholder='describe what you are suffering from'
                placeholderTextColor="#999"

            />
            <Text style={styles.label}>More details about the problem you are suffering from
            </Text>
            <TextInput
                style={styles.input}
                placeholder='provide more details about your issue'
                placeholderTextColor="#999"

            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder='**********'
                placeholderTextColor="#999"
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
            >
                <Text
                    style={styles.buttonText}
                >Create Account</Text>

            </TouchableOpacity>


        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        marginTop: 50,

    },
    title: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20,
    },
    note: {
        color: 'gray',
        fontSize: 13,
        marginBottom: 20
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#f9f9f9'
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },


})
export default Dont;