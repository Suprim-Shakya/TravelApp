import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ListItem = ({text}) => {
    return (
        <View style={styles.outer}>
            <View style={styles.card}>
                <Text style={styles.cardText}>{text} text to be displayed</Text>
            </View>
        </View>
    )
}

export default ListItem

const styles = StyleSheet.create({
    outer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
        marginBottom: 0,
        // width:'100%',
        // backgroundColor:'red'
        minHeight: 150,
        elevation: 5,
        borderColor:'red',
    },
	card: {
		backgroundColor: 'white',
		borderRadius: 5,
		width: '100%',
		overflow: 'hidden',
		flex: 1,
		flexDirection: 'row',
		padding: 8,
		elevation: 3,
        borderColor:'red',
	},
	cardText: {
		flex: 3,
		alignItems: 'center',
		width: '100%',

	},
	headingText: {
		color: 'black',
		justifyContent: 'center',
		fontWeight: 'bold',
		fontSize: 16
	},
})