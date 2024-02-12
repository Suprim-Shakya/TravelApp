import { StyleSheet, Text, View ,TextInput, TouchableOpacity, ScrollView} from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native';
import Error from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'

const RegisterPage = ({props}) => {
  const [name,setName]=useState('');
  const [nameVerify,setNameVerify]=useState(false);
  const [email,setEmail]=useState('');
  const [emailVerify,setEmailVerify]=useState(false);
  const [mobile, setMobile] =useState('');
  const [mobileVerify, setMobileVerify] = useState(false);
  // const [password, setPassword]=useState(' '); //The space also matters so do not use space, space does not mean null
  const [password, setPassword]=useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword,setShowPassword]=useState(false);

  function handleName(e){
    const nameVar=e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(false)
    if(nameVar.length>1){
      setNameVerify(true);
    }
  }

  function handleEmail(e){
    const emailVar=e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailVar)){
      setEmailVerify(true);
    }
  }

   function handleMobile(e){
      const mobileVar=e.nativeEvent.text;
      setMobile(mobileVar);
      setMobileVerify(false);
      if(/^[0-9]{10}$/.test(mobileVar)){
        setMobileVerify(true);
      }
    };

   function handlePassword(e){
      const passwordVar=e.nativeEvent.text;
      setPassword(passwordVar);
      setPasswordVerify(false);
      if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(passwordVar)){
        setPasswordVerify(true);
      }
    };
  

  const navigation=useNavigation();
  return (
    <ScrollView keyboardDismissMode='true'>
    <View style={styles.loginContainer}>
        <Text style={styles.text_header}>Register</Text>
        <View style={styles.action}>
            {/* <FontAwesome name="user-o" color="#420475" style={styles.smallIcon}/> I */}
            <TextInput placeholder="Name" style={styles.textInput} onChange={e=>handleName(e)} />
            {name.length<1?null: nameVerify? (
              <Feather name="check-circle" color="green" size={20} />
              ) : (
              <Error name="error" color="red" size={20} />
              )}
        </View>
        {name.length < 1 ? null :nameVerify? null : (
          <Text
          style={{
          marginLeft: 20,
          color: 'red',
          }}>
          Name sholud be more then 1 characters.
          </Text>
          )}

        <View style={styles.action}>
            {/* <FontAwesome name="lock" color="#420475" style={styles.smallIcon}/> */}
            <TextInput placeholder="Email" style={styles.textInput} onChange={handleEmail} />
            {
              email.length<1?null: emailVerify?(<Feather name="check-circle" color="green" size={20} />
              ):(
              <Error name="error" color="red" size={20} />)
            }
        </View>
        {email.length < 1 ? null :emailVerify? null : (
          <Text
          style={{
          marginLeft: 20,
          color: 'red',
          }}>
          Please Write Proper Email.
          </Text>
          )}

        <View style={styles.action}>
            {/* <FontAwesome name="lock" color="#420475" style={styles.smallIcon}/> */}
            <TextInput placeholder="Mobile" style={styles.textInput} onChange={handleMobile} maxLength={10}/>
            {mobile.length<1?null : mobileVerify? (
              <Feather name="check-circle" color="green" size={20} />
              ) : (
              <Error name="error" color="red" size={20} />
              )}
        </View>
        {mobile.length < 1 ? null :mobileVerify? null : (
          <Text
          style={{
          marginLeft: 20,
          color: 'red',
          }}>
          Please Write Proper Mobile Number.
          </Text>
          )}


        <View style={styles.action}>
            {/* <FontAwesome name="lock" color="#420475" style={styles.smallIcon}/> */}
            
            <TextInput placeholder="Password" style={styles.textInput} onChange={handlePassword} secureTextEntry={showPassword}/>
            <TouchableOpacity onPress={() => setShowPassword (!showPassword)}>
            {password.length < 1 ? null: !showPassword? (
              <Feather
              name="eye-off"
              style={{marginRight: -10}}
              color={'green'}
              size={43}
              />
              ): (
              <Feather
              name="eye"
              style={{marginRight: -10}}
              color={'green'}
              size={43}
              />)}
              </TouchableOpacity>
            {password.length<1? null: passwordVerify? (
              <Feather name="check-circle" color="green" size={20} />
              ) : (
              <Error name="error" color="red" size={20} />
              )}
        </View>
        {password.length < 1 ? null :passwordVerify? null : (
          <Text
          style={{
          marginLeft: 20,
          color: 'red',
          }}>
          Please set secure Password.
          </Text>
          )}
        

        

        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut}>
            <Text style={styles.textSign}>Sign Up</Text>
          </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
  );
}

export default RegisterPage

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
      },
      textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
      },
      smallIcon: {
        marginRight: 10,
        fontSize: 24,
      },
      logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      logo: {
        height: 260,
        width: 260,
        marginTop: 30,
      },
      text_footer: {
        color: '#05375a',
        fontSize: 18,
      },
      action: {
        flexDirection: 'row',
        paddingTop: 14,
        paddingBottom: 3,
        marginTop: 15,
    
        paddingHorizontal: 15,
    
        borderWidth: 1,
        borderColor: '#420475',
        borderRadius: 50,
      },
      textInput: {
        flex: 1,
        marginTop: -12,
    
        color: '#05375a',
      },
      loginContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
      },
      header: {
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
      },
      text_header: {
        color: '#420475',
        fontWeight: 'bold',
        fontSize: 30,
      },
      button: {
        alignItems: 'center',
        marginTop: 20,
        alignItems: 'center',
        textAlign: 'center',
        margin: 20,
      },
      inBut: {
        width: '70%',
        backgroundColor: '#420475',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 50,
      },
      inBut2: {
        backgroundColor: '#420475',
        height: 65,
        width: 65,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },
      bottomButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      smallIcon2: {
        fontSize: 40,
        // marginRight: 10,
      },
      bottomText: {
        color: 'black',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 5,
      },
})