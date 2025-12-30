import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { resetRegistration } from '../../../store/register';
import { showToast, makeRequest } from '../../../utils/util'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const Hide = () => {
    const dispatch = useDispatch();
    const data = useSelector((state)=>state.register);
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters long')
            .required('Username is required'),
        problem: Yup.string()
            .required('Problem description is required'),
        details: Yup.string()
            .min(20, 'Details must be at least 20 characters long')
            .required('Details are required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters long')
            .required('Password is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            problem: '',
            details: '',
            password: '',
            email: '',
        },
        validationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            try{
                const registrationData = {
                    username: values.username,
                    problem: values.problem,
                    details: values.details,
                    password: values.password,
                    email: values.email,
                    accountType: data.accountType,

                };
                const response = await makeRequest("signup", "Auth", registrationData);

                if(response?.returnCode !== 0){
                    const errorMessage = response?.returnMessage || 'There is a registration issue';
                    showToast(errorMessage, 'error');
                    return;
                }
                const {token, user} = response?.returnObject || {};

                if(!token || !user){
                    const errorMessage = 'Server is misbehaving';
                    showToast(errorMessage, 'error');
                    return;
                }
                await AsyncStorage.setItem('accessToken', token);
                await AsyncStorage.setItem('user', JSON.stringify(user));

                formik.resetForm();
                dispatch(resetRegistration());
                showToast('Registration successful', 'success');

                router.push('components/LoggedIn/bottomTab');

            }catch(error){
                const errorMessage = error?.message || 'An error occurred during registration';
                showToast(errorMessage, 'error');
            }finally{
                setSubmitting(false);
            }
        },
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>You Are Almost There</Text>
            <Text style={styles.note}>Remember, even though you are not a medical professional, you can still help.
            </Text>

            <Text style={styles.label}>User Name</Text>
            <TextInput
                style={styles.input}
                id='username'
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
                placeholder='Enter your username'
                placeholderTextColor="#999"
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: 'red', marginBottom: 10 }}>{formik.errors.username}</Text>
            )}

            <Text style={styles.label}>Problem you are suffering from</Text>
            <TextInput
                style={styles.input}
                id='problem'
                value={formik.values.problem}
                onChangeText={formik.handleChange('problem')}
                onBlur={formik.handleBlur('problem')}
                placeholder='describe what you are suffering from'
                placeholderTextColor="#999"

            />
            {formik.touched.problem && formik.errors.problem && (
                <Text style={{ color: 'red', marginBottom: 10 }}>{formik.errors.problem}</Text>
            )}

            <Text style={styles.label}>More details about the problem you are suffering from
            </Text>
            <TextInput
                style={styles.input}
                id='details'
                value={formik.values.details}
                onChangeText={formik.handleChange('details')}
                onBlur={formik.handleBlur('details')}
                placeholder='provide more details about your issue'
                placeholderTextColor="#999"

            />
            {formik.touched.details && formik.errors.details && (
                <Text style={{ color: 'red', marginBottom: 10 }}>{formik.errors.details}</Text>
            )}
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                id='email'
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                placeholder='Enter your email'
                placeholderTextColor="#999"
            />
            {formik.touched.email && formik.errors.email && (
                <Text style={{ color: 'red', marginBottom: 10 }}>{formik.errors.email}</Text>
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
export default Hide;