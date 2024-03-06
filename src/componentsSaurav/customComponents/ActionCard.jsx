import { StyleSheet, View } from 'react-native';
import COLORS from '../../constants/colors'

const ActionCard = ({ children }) => {
	return (
		<View style={styles.card}>
			{children}

		</View>
	)
}

export default ActionCard

const styles = StyleSheet.create({
	card: {
		marginHorizontal: 20,
		elevation: 2,
		minHeight: 80,
		backgroundColor: COLORS.light,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		// borderColor: 'red',
		// borderWidth: 1,
		top: -30,
		borderRadius: 20
		// zIndex: 10
	}
})