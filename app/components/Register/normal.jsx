import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import dep from '../../../assets/images/normal.png'
import { RadioButton } from 'react-native-paper';
import { useState } from 'react';
import { router } from 'expo-router';

const Normal = () => {
    const [accountType, setAccountType] = useState('hide')
    const handleSubmit = () =>{
        if (accountType==='hide'){
            router.push('/Register/hide')
            return;
        }
        if (accountType === 'dontHide'){
            router.push('/Register/dont')
            return;
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Express your self</Text>
            <Text style={styles.note}>In order to clearly express yourself, you can choose to be anonymous or decide to use your full details.
            </Text>
            <Image
                source={dep}
                style={{
                    width: '100%',
                    height: 200,
                    resizeMode: 'contain',
                    marginBottom: 20,
                }}
            />

            <RadioButton.Group
                onValueChange={value => setAccountType(value)}
                value={accountType}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <RadioButton value='hide' />
                    <Text>Hide Identity</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value='dontHide' />
                    <Text>Dont Hide Identity</Text>

                </View>
            </RadioButton.Group>

            <TouchableOpacity 
            style={styles.button}
            onPress={()=>{handleSubmit()}}
            >
                <Text style={styles.buttonText}>Continue</Text>
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
    button: {
        backgroundColor: '#007AFF',
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:10,
        marginTop:50,

    },
    buttonText:{
        color:'white',
        textAlign:'center',
        fontSize:18,
        fontWeight:'bold',
    }


})
export default Normal;