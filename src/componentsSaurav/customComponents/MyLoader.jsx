import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"

const MyLoader = (props) => (
	<ContentLoader
		speed={2}
		width={400}
		height={160}
		viewBox="0 0 320 160"
		backgroundColor="#f5f5f5"
		foregroundColor="#ebebeb"
		{...props}
	>
		<Rect x="180" y="11" rx="3" ry="3" width="90" height="6" />
		<Rect x="5" y="5" rx="7" ry="7" width="100" height="150" />
		<Rect x="120" y="40" rx="3" ry="3" width="200" height="6" />
		<Rect x="120" y="60" rx="3" ry="3" width="200" height="6" />
		<Rect x="120" y="80" rx="3" ry="3" width="200" height="6" />
		<Rect x="120" y="100" rx="3" ry="3" width="200" height="6" />
		<Rect x="150" y="120" rx="3" ry="3" width="60" height="25" />
		<Rect x="240" y="120" rx="3" ry="3" width="60" height="25" />
	</ContentLoader>
)

export default MyLoader

