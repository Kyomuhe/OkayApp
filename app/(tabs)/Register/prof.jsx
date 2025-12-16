import { RadioButton } from 'react-native-paper'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useState } from 'react'

const Prof = () => {
    const [checked, setChecked] = useState('');

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Professional Registration</Text>
            <Text style={styles.note}>Note: All help provided on this platform must be free of charge, failure to respect that will lead to closure of account
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
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter email address'
                placeholderTextColor="#999"

            />
            <Text style={styles.label}>Speciality
            </Text>
            <TextInput
                style={styles.input}
                placeholder='provide your specific area of speciality'
                placeholderTextColor="#999"

            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder='**********'
                placeholderTextColor="#999"
                secureTextEntry
            />
            <Text style={styles.label}>Are you willing to help people free of charge
            </Text>
            <RadioButton.Group
                onValueChange={value => setChecked(value)}
                value={checked}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}>
                        <RadioButton value='yes' />
                        <Text>Yes</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value='no' />
                        <Text>No</Text>
                    </View>

                </View>
            </RadioButton.Group>
            <Text style={styles.label}>Talk about your self</Text>
            <TextInput
                style={styles.input}
                multiline={true}
                numberOfLines={5}
            />


            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
            >
                <Text
                    style={styles.buttonText}
                >Create Account</Text>

            </TouchableOpacity>


        </ScrollView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 40,
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
export default Prof;