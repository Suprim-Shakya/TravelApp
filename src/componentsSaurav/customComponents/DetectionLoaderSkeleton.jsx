import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import COLORS from "../../constants/colors"
import { Dimensions } from "react-native"

const {width: screenWidth} = Dimensions.get('window')

const MyLoader = (props) => (
	<ContentLoader
		speed={1}
		// width={screenWidth}
		// height={300}
		// viewBox={`0 0 ${screenWidth-20} 300`}
		backgroundColor="#f5f5f5"
		foregroundColor={COLORS.grey}
		{...props}
	>

		<Rect x="10" y="10" rx="7" ry="7" width={screenWidth - 20} height="150" />

	</ContentLoader>
)

export default MyLoader

