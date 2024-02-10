import {  Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import LanguageCard from '../customComponents/LanguageCard';
import languages from "../../constants/languages.json"

const LanguageSelectionScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Select Language</Text>

            <FlatList
                data={languages}
                keyExtractor={item => item.id}
                renderItem={({item}) =>
                    <LanguageCard
                        language={item.name}
                        code={item.code}
                        enabled={item.available}
                    />
                }
            />

            {/* <ScrollView contentContainerStyle={styles.languageList}>
                {languages.map((language) => (
                    <LanguageCard language={language.name} code={language.code} enabled={language.available} />
                ))}
            </ScrollView> */}
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
        color: 'black', // Changed title color to black
    },

});

export default LanguageSelectionScreen;