import {View, Text, StyleSheet, TextInput , Image, TouchableOpacity} from 'react-native';
import login from '../../assets/images/login.png';

const Index = () =>{
    return(
        <View style = {styles.container}>
            {/* <Text style={styles.title}>Welcome</Text> */}
            <Image 
            source={login} 
            style={{width: '100%', height: 200, resizeMode: 'contain', marginBottom: 20

            }} 
            />

            <Text style={styles.label}>UserName</Text>
            <TextInput
            style ={styles.input}
            placeholder='Enter your username'
            placeholderTextColor= "#999"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
            style ={styles.input}
            placeholder='**********'
            placeholderTextColor= "#999"
            secureTextEntry
            />

            <TouchableOpacity
            style ={styles.button}
            activeOpacity={0.7}
            >
                <Text
                style = {styles.buttonText}
                >Login</Text>

            </TouchableOpacity>


        </View>

    )

}

const styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        justifyContent: 'center',
        padding: 20,
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'blue',
    },
    label:{
        fontSize :16,
        marginBottom:8,
        color: '#333',
    },
    input: {
        height:40,
        borderColor: 'gray',
        borderWidth:1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#f9f9f9'
    },
    buttonText:{
        color:'white',
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center',
    },
    button:{
        backgroundColor:'#007AFF',
        paddingVertical:10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop:50,
    }
})
export default Index;