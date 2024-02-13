import { Pressable, ActivityIndicator, TextInput, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import COLORS from '../constants/colors';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import userLogin from '../componentsSaurav/apiCalls/userLogin';
import { useAuth } from './AuthContext';

export default function LoginScreen({ navigation }) {

    const {login} = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        let errors = {};

        if (!email) {
            errors.email = "Email or username is required";
        }
        if (!password) {
            errors.password = "Password is required";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0; // true if no error messages
    };

    const handleEmailChange = (text) => {
        setEmail(text);
        // validateForm();
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        // validateForm();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    
    const resetLoginForm = () => {
        setEmail('');
        setPassword('');
        setErrors({});
        
    };
    
    const createLoginData = () => {
        const data = new URLSearchParams();
        if (email.trim() !== '') {
            // Check if input resembles an email format using regex
            const isEmail = /^\S+@\S+\.\S+$/.test(email);
            if (isEmail) {
                data.append('email', email.trim().toLowerCase());
            } else {
                // If input doesn't resemble an email format, assume it's a username
                data.append('userName', email.trim().toLowerCase());
            }
        }
        password.trim() !== '' && data.append('password', password);
        return data;
    };
    
    const handleSubmit = async () => {
        if (validateForm()) {
            // Proceed with login
            const data = createLoginData()
            setLoading(true)
            const accessToken = await userLogin(data);
            if(accessToken) {
                setLoading(false)
                await login(accessToken);
            }
            setLoading(false)
        }
    };

    return (
        <View style={styles.container}>
        <View style={styles.content}>

            <View style={styles.collection}>
                <Text style={styles.headingText}>Email or username</Text>
                <TextInput
                    placeholder='Enter your email or username'
                    placeholderTextColor={COLORS.placeholder}
                    style={[styles.inputField, errors?.email && { borderColor: COLORS.error }]}
                    value={email}
                    onChangeText={handleEmailChange}
                    />
            </View>
            {errors?.email && <Text style={[styles.headingText, styles.errorText]}>{errors.email}</Text>}

            <View style={styles.collection}>
                <Text style={styles.headingText}>Password</Text>
                <TextInput
                    placeholder='Enter your password'
                    placeholderTextColor={COLORS.placeholder}
                    style={[styles.inputField, errors?.password && { borderColor: COLORS.error }]}
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                    />
                <Pressable onPress={togglePasswordVisibility} style={styles.passwordSwitch}>
                    <Icon color={COLORS.placeholder} size={30} name={showPassword ? 'eye' : 'eye-off'} />
                </Pressable>
            </View>
            {errors?.password && <Text style={[styles.headingText, styles.errorText]}>{errors.password}</Text>}

            <View style={styles.collection}>
                <Pressable
                    style={styles.btn}
                    onPress={handleSubmit}
                    android_ripple={{
                        foreground: true,
                        radius: 500,
                        color: "rgba(255,255,255,0.2)",
                        borderless: false,
                    }}
                    disabled={loading}
                    >
                    <View >
                        {loading ?
                            <View style={styles.btnContent}>
                                <Text style={styles.btnTxt}>Logging in..</Text>
                                <ActivityIndicator color={COLORS.white} />
                            </View>
                            : <Text style={styles.btnTxt}>Login</Text>
                        }
                    </View>
                </Pressable>
            </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.background,
    },
    content: {
        paddingHorizontal: 15,
        position: 'absolute',
        backgroundColor: COLORS.background,
        top: '30%',
        width: '100%',
        height: '100%'
    },
    collection: {
        marginTop: 20
    },
    headingText: {
        paddingLeft: 3,
        marginBottom: 3,
        color: "black"
    },
    inputField: {
        borderColor: "black",
        borderWidth: 1.5,
        borderRadius: 6,
        fontSize: 16,
        paddingLeft: 10,
        color: 'black'
    },
    description: {
        verticalAlign: "top"
    },
    btn: {
        backgroundColor: COLORS.primary,
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    btnTxt: {
        color: COLORS.white,
    },
    imageContainer: {
        marginTop: 20,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderWidth: 2,
        borderColor: COLORS.placeholder,
        borderStyle: 'dotted',

    },
    placeholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    imageIcon: {
        position: "absolute",
        top: 5,
        right: 5,
        zIndex: 1
    },
    text: {
        fontSize: 16,
        color: "black"
    },
    ticketContainer: {
        flexDirection: 'row',
        justifyContent: "flex-end"
    },
    errorText: {
        marginTop: 0,
        color: COLORS.error
    },
    btnContent: {
        flexDirection: 'row'
    },
    passwordSwitch: {
        // flexDirection : 'row',
        // alignItems: "center",
        // justifyContent: "flex-end",
        // gap: 4,
        position: 'absolute',
        top: 33,
        right: 8
    }
});

