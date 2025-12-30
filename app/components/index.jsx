import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import login from '../../assets/images/login.png';
import { router } from 'expo-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToast, makeRequest } from '../../utils/util'
import logo from '../../assets/images/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters long')
            .required('Username is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters long')
            .required('Password is required'),
    })
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const loginData = {
                    username: values.username,
                    password: values.password,
                };

                const response = await makeRequest("login", "Auth", loginData);
                const data = response; 

                if (data?.returnCode !== 0) {
                    const errorMessage = data?.returnMessage || 'There is a login issue';
                    showToast(errorMessage, 'error');
                    return;
                }

                const { token, user } = data?.returnObject || {};
                if (!token || !user) {
                    const errorMessage = 'Server is misbehaving';
                    showToast(errorMessage, 'error');
                    return;
                }

                await AsyncStorage.setItem('accessToken', token);
                await AsyncStorage.setItem('user', JSON.stringify(user));

                formik.resetForm();
                showToast('Login successful', 'success');

                router.push('components/LoggedIn/bottomTab');

            } catch (error) {
                const errorMessage = error?.message || 'An error occurred during login';
                showToast(errorMessage, 'error');
            } finally {
                setSubmitting(false); 
            }
        } 
    });

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Welcome</Text> */}
            <Image
                source={logo}
                style={{
                    width: 200,
                    height: 60,
                    resizeMode: 'contain',
                    marginBottom: 20,
                }}
            />
            <Image
                source={login}
                style={{
                    width: '100%', height: 200, resizeMode: 'contain', marginBottom: 20

                }}
            />

            <Text style={styles.label}>UserName</Text>
            <TextInput
                id='username'
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
                style={styles.input}
                placeholder='Enter your username'
                placeholderTextColor="#999"
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: 'red', marginBottom: 10 }}>{formik.errors.username}</Text>
            )}

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                id='password'
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                placeholder='**********'
                placeholderTextColor="#999"
                secureTextEntry
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={{ color: 'red', marginBottom: 10 }}>{formik.errors.password}</Text>
            )}

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={formik.handleSubmit}
            >
                <Text
                    style={styles.buttonText}
                >Login</Text>

            </TouchableOpacity>
            <Text
                style={styles.separator}
            >
                OR
            </Text>
            <TouchableOpacity
                style={styles.signupLinkArea}
                onPress={() => router.push('components/Register/signup')}

            >
                <Text style={styles.signupLinkText}>
                    Dont have an account? <Text style={styles.signupLink}>Sign Up</Text>
                </Text>

            </TouchableOpacity>


        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'blue',
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
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 50,
    },
    separator: {
        marginVertical: 10,
        fontSize: 16,
        color: '#888',
        fontFamily: '600',
        textAlign: 'center',
    },
    signupLinkArea: {
        padding: 10,
        alignItems: 'center',
    },
    signupLinkText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    signupLink: {
        color: '#007AFF',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    }

})
export default Index;