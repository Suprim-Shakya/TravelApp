import { DATABASE_ENDPOINT, MONGODB_API_KEY } from './config'

const fetchDetailsFromDb = async (classNumber) => {

	let response
	try {

		response = await fetch(DATABASE_ENDPOINT,
			{
				method: 'POST',
				cache: 'no-cache', //may break api , remove is problem occurs
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'apiKey': MONGODB_API_KEY
				},
				body: JSON.stringify({
					'dataSource': 'Cluster0',
					'database': 'travelGuide',
					'collection': 'heritageData',
					'filter': {
						'classNumber': classNumber
					}
				})
			})

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const details = await response.json();
		// console.log(details)
		return (details.document)

	} catch (error) {
		console.error('fetch failed: ', error)
		Alert.alert('fetch failed', error)
	}
}

export default fetchDetailsFromDb