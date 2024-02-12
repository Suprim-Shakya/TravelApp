import { Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import LanguageCard from '../customComponents/LanguageCard';
import languages from "../../constants/languages.json"
import { useTranslation } from 'react-i18next';

const LanguageSelectionScreen = () => {
    const { t, i18n } = useTranslation();
    function handlePress(code) {
        if (i18n.language !== code) {
            i18n.changeLanguage(code);
        }
        console.log(code);
    }



    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.title}>{t('Select')} Language</Text> */}

            <FlatList
                data={languages}

                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <LanguageCard
                        onPress={() => handlePress(item.code)}
                        language={item.name}
                        code={item.code}
                        enabled={item.available}
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