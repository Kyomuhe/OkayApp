import { RadioButton } from 'react-native-paper'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useState } from 'react'
 import { useFormik } from 'formik'
 import * as Yup from 'yup'
 import { showToast, makeRequest } from '../../../utils/util'
 import { useSelector ,useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { resetRegistration } from '../../../store/register'

const Prof = () => {
    const [checked, setChecked] = useState('');
    const data = useSelector((state)=>state.register);
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'First Name must be at least 2 characters long')
            .required('First Name is required'),
        lastName: Yup.string()
            .min(2, 'Last Name must be at least 2 characters long')
            .required('Last Name is required'),
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters long')
            .required('Username is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        speciality: Yup.string()
            .min(3, 'Speciality must be at least 3 characters long')
            .required('Speciality is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters long')
            .required('Password is required'),
        about: Yup.string()
            .required('About section is required'),
    })
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            speciality: '',
            password: '',
            about: '',
        },
        validationSchema,
        onSubmit: async(values, {setSubmitting}) => {
            try{
                const registrationData = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    username: values.username,
                    email: values.email,
                    speciality: values.speciality,
                    password: values.password,
                    professionalDetails: values.about,
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
        <ScrollView 
            style={styles.container} 
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Professional Registration</Text>
            <Text style={styles.note}>
                Note: All help provided on this platform must be free of charge, failure to respect that will lead to closure of account
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter First Name'
                        id='firstName'
                        value={formik.values.firstName}
                        onChangeText={formik.handleChange('firstName')}
                        onBlur={formik.handleBlur('firstName')}
                        placeholderTextColor="#999"
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                        <Text style={{ color: 'red', marginBottom: 10 }}>{formik.errors.firstName}</Text>
                    )}
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        id='lastName'
                        value={formik.values.lastName}
                        onChangeText={formik.handleChange('lastName')}
                        onBlur={formik.handleBlur('lastName')}
                        placeholder='Enter Last Name'
                        placeholderTextColor="#999"
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                        <Text style={{ color: 'red', marginBottom: 10 }}>{formik.errors.lastName}</Text>
                    )}
                </View>
            </View>

            <Text style={styles.label}>User Name</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your username'
                id='username'
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
                placeholderTextColor="#999"
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: 'red', marginBottom: 10 }}>{formik.errors.username}</Text>
            )}
            
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                id='email'
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                placeholder='Enter email address'
                placeholderTextColor="#999"
            />
            {formik.touched.email && formik.errors.email && (
                <Text style={{ color: 'red', marginBottom: 10 }}>{formik.errors.email}</Text>
            )}
            
            <Text style={styles.label}>Speciality</Text>
            <TextInput
                style={styles.input}
                id='speciality'
                value={formik.values.speciality}
                onChangeText={formik.handleChange('speciality')}
                onBlur={formik.handleBlur('speciality')}
                placeholder='provide your specific area of speciality'
                placeholderTextColor="#999"
            />
            {formik.touched.speciality && formik.errors.speciality && (
                <Text style={{ color: 'red', marginBottom: 10 }}>{formik.errors.speciality}</Text>
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
            
            <Text style={styles.label}>Are you willing to help people free of charge</Text>
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
                style={styles.textArea}
                multiline={true}
                numberOfLines={5}
                id='about'
                value={formik.values.about}
                onChangeText={formik.handleChange('about')}
                onBlur={formik.handleBlur('about')}
                placeholder='Tell us about yourself...'
                placeholderTextColor="#999"
                textAlignVertical='top'
            />
            {formik.touched.about && formik.errors.about && (
                <Text style={{ color: 'red', marginBottom: 10 }}>{formik.errors.about}</Text>
            )}

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={formik.handleSubmit}
            >
                <Text style={styles.buttonText}>Create Account</Text>
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
        paddingBottom: 100, // Increased from 40 to 100
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
    textArea: {
        minHeight: 100,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 15, 
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20, 
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

export default Prof;