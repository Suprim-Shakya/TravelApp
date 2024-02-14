import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import LanguageCard from '../customComponents/LanguageCard';
import languages from "../../i18n/languagesAvailable.json"
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../components/AuthContext';
import { useState, useEffect } from 'react';

const LanguageSelectionScreen = () => {
    const [currentLanguage, setCurrentLanguage] = useState()
    const { t } = useTranslation();
    const { changeLanguage, getCurrentLanguage } = useAuth()

    useEffect(()=> {
        async function loadLanguage() {
            const lang = await getCurrentLanguage();
            setCurrentLanguage(lang)
        }
        loadLanguage()
    }, [])

    async function handlePress(code) {
        setCurrentLanguage(code)
        await changeLanguage(code)
    }



    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.title}>{t('language')} Language</Text> */}

            <FlatList
                data={languages}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <LanguageCard
                        onPress={() => handlePress(item.code)}
                        language={item.name}
                        code={item.code}
                        enabled={item.available}
                        current = {currentLanguage === item.code}
                    />
                }
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },

});

export default LanguageSelectionScreen;