import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import COLORS from '../../consts/colors';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import ElevatedCards from './ElevatedCards'

const HomeScreen = ({navigation}) => {
  const categoryIcon = [
    <Icon name="restaurant" size={25} color={COLORS.dark}/>, 
    <Icon name="emergency" size={25} color={COLORS.dark} />,
    <Icon name="wc" size={25} color={COLORS.dark} />,
    <Icon name="atm" size={25} color={COLORS.dark} />,
  ]

  const ListCategories = () => {
    return (
    <View style={styles.categoryContainer}>
      {categoryIcon.map((icon, index) => (
        <View key={index} style={styles.iconContainer}>
          {icon} 
        </View>
      ))}
    </View>
  )};

 


  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
        <View style={styles.header}>
          <Icon name="sort" size={28} color='#FFF' style={{marginHorizontal:10}}/>
          <Text style={styles.title}>Travel Guide</Text>
          <Icon name="notifications" size={28} color={COLORS.white} style={{marginHorizontal:10}}/>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor : COLORS.primary, height: 120}}>
          <View>
            <Text style={styles.text}>Discover the Best</Text>
            <Text style={styles.text}>Sites to Travel</Text>
              <View style={styles.inputcontainer}>
                <Icon name="search" size={28} style={styles.icons}/>
                <TextInput placeholder="Search"/>
              </View>
              
          </View>
          
        </View>
        <ListCategories>
          <Text style={styles.sectionTitle}> Trending </Text>
        </ListCategories>
        <ElevatedCards></ElevatedCards>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
  },
  text: {
    color: '#FFF',
    fontSize: 22,
    marginHorizontal: 20,
    
  },
  inputcontainer:{
    height: 60,
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 50,
    position: 'absolute',
    top: 90,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor:'#e3e3e3',
    
  },
  TextInput:{
    color:'red',
  },
  icons:{
    marginTop: 15,
    marginHorizontal: 15,
  },
  categoryContainer:{
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer:{
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  sectionTitle:{
    color:'red',
    backgroundColor:'blue',
  },
});