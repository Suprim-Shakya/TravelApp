import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import COLORS from '../../consts/colors';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const HomeScreen = ({navigation}) => {
  const categoryIcon = [
    <Icon name="restaurant" size={25} color={COLORS.grey} />,
    <Icon name="flights_and_hotels" size={25} color={COLORS.grey} />,
    <Icon name="wc" size={25} color={COLORS.grey} />,
  ]

  const ListCategories = () => {
    return <View style={styles.categoryContainer}>
      {categoryIcon.map((icon, index) => (
        <View key={index}> {icon} </View>
      )
      
      )}
    </View>
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
    <View style={styles.header}>
      <Icon name="sort" size={28} color='#FFF'/>
      <Text style={styles.title}>Travel Guide</Text>
      <Icon name="notifications" size={28} color={COLORS.white} />
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{backgroundColor : COLORS.primary, height: 120}}>
        <View>
          <Text style={styles.text}>Discover the Best</Text>
          <Text style={styles.text}>Sites to Travel</Text>
            <View style={styles.inputcontainer}>
            <Icon name="search" size={28} style={styles.icons}/>
            <TextInput placeholder='Search heritage' style={{color: COLORS.grey}}/>
            </View>
        </View>
        
      </View>
      <ListCategories>

      </ListCategories>
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
  }
})