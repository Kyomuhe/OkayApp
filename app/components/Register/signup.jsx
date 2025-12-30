import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import signup from '../../../assets/images/signUp.png'
import { RadioButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setAccountType } from '../../../store/register';

const SignUp = () => {
    const dispatch = useDispatch();

    const [accountType, setAccount] = useState('Normal');

    const handleSubmit =() => {
        if(accountType === 'NormalUser'){
            dispatch(setAccountType('NormalUser'));
            router.push('components/Register/normal')
            return;
        }
        if(accountType === 'ProfessionalUser'){
            dispatch(setAccountType('ProfessionalUser'));
            router.push('components/Register/prof')
            return;
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose Type of Account</Text>
            <Text style={styles.note}>Note: Professional accounts are for medical personnel</Text>

            <Image
                source={signup}
                style={{
                    width: '100%', 
                    height: 200, 
                    resizeMode: 'contain', 
                    marginBottom: 20
                }}
            />

            <RadioButton.Group 
                onValueChange={value => setAccount(value)} 
                value={accountType}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <RadioButton value="NormalUser" />
                    <Text>Normal Account</Text>
                </View>
                
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="ProfessionalUser" />
                    <Text>Professional Account</Text>
                </View>
            </RadioButton.Group>

            <TouchableOpacity
            style= {styles.button}
            onPress={()=>{handleSubmit()}}
            >
                <Text style ={styles.buttonText}>Continue</Text>
                
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 27,
        marginBottom: 10,
    },
    note: {
        color: 'gray',
        fontSize: 13,
        marginBottom: 20,
    },
    button:{
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

export default SignUp;