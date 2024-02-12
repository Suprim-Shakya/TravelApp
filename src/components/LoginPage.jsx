import { StyleSheet, Text, View ,TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native';

const LoginPage = ({props}) => {
  const navigation=useNavigation();
  return (
    <View style={styles.loginContainer}>
        <Text style={styles.text_header}>Login</Text>
        <View style={styles.action}>
            {/* <FontAwesome name="user-o" color="#420475" style={styles.smallIcon}/> I */}
            <TextInput placeholder="Mobile or Email" style={styles.textInput} />
        </View>
        <View style={styles.action}>
            {/* <FontAwesome name="lock" color="#420475" style={styles.smallIcon}/> */}
            
            <TextInput placeholder="Password" style={styles.textInput} />
        </View>

        <View
          style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginTop: 8,
          marginRight: 10,
          }}>
          <Text style={{color: '#420475', fontWeight: '700'}}> Forgot Password </Text>
        </View>

        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut}>
            <Text style={styles.textSign}>Log in</Text>
          </TouchableOpacity>
          <View style={{padding: 15}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#919191'}}>
            ----Or Continue as-
            </Text>
            </View>
            <View style={styles.bottomButton}>
            <View
            style={{
            alignItems: 'center',
            justifyContent: 'center',
            }}>
            <TouchableOpacity style={styles.inBut2}>
            <FontAwesome
            I
            name="user-circle-o"
            color="white"
            style={styles.smallIcon2}
            />
      </TouchableOpacity>
      <Text style={styles.bottomText}>Guest</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                <FontAwesome
                  name="user-plus"
                  color="white"
                  style={[styles.smallIcon2, {fontSize: 30}]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Sign Up</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => alert('Coming Soon')}>
                <FontAwesome
                  name="google"
                  color="white"
                  style={[styles.smallIcon2, {fontSize: 30}]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Google</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => alert('Coming Soon')}>
                <FontAwesome
                  name="facebook-f"
                  color="white"
                  style={[styles.smallIcon2, {fontSize: 30}]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Facebook</Text>
            </View>
        </View>
    </View>
    </View>
    
  );
}

export default LoginPage

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