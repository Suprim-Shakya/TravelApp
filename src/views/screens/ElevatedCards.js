import React, { useState } from "react"
import {
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Image,
  Modal,
  StyleSheet
} from "react-native"

const data = {
  cuisines: [
    { id: "1", title: "Cuisine 1", imageUri: "cuisine1.jpg", description: "" },
    {
      id: "2",
      title: "Cuisine 2",
      imageUri: "cuisine2.jpg",
      description: "Description for Cuisine 2"
    }
  ],
  trekking: [
    {
      id: "1",
      title: "Trek 1",
      imageUri: "trek1.jpg",
      description: "Description for Trek 1"
    },
    {
      id: "2",
      title: "Trek 2",
      imageUri: "trek2.jpg",
      description: "Description for Trek 2"
    }
  ]
}

const CustomCard = ({
  title,
  description,
  imageUri,
  selected,
  onPress,
  onModalPress
}) => {
  const cardStyles = {
    padding: 3,
    margin: 2,
    backgroundColor: "white",
    width: 300,
    height: 250
  }

  return (
    <ScrollView>
      <View style={cardStyles}>
        <Image source={{ uri: imageUri }} style={{ width: 293, height: 170 }} />
        <Text style={{ fontWeight: "bold", color: "red", textAlign: "center" }}>
          {title}
        </Text>
        <Text
          style={{ fontWeight: "bold", color: "green", textAlign: "justify" }}
        >
          {description}
        </Text>
        <TouchableOpacity onPress={onModalPress}>
          <Text style={{ color: "black", textAlign: "center" }}>View More</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const ModalContent = ({ title, closeModal }) => {
  const selectedData = data[title]

  if (!selectedData || selectedData.length === 0) {
    return (
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>No Item Selected</Text>
        <TouchableOpacity onPress={closeModal}>
          <Text style={styles.modalCloseButton}>Close</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>{title}</Text>
      {selectedData.map(item => (
        <View key={item.id}>
          <Text style={styles.modalText}>{item.description}</Text>
        </View>
      ))}
      <TouchableOpacity onPress={closeModal}>
        <Text style={styles.modalCloseButton}>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

const App = () => {
  const [selectedButton, setSelectedButton] = useState("activities")
  const [selectedCard, setSelectedCard] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false)

  const selectedData = data[selectedButton] || []

  const handleCardPress = card => {
    setSelectedCard(selectedCard?.id === card.id ? null : card)
  }

  const handleModalPress = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={[
            styles.button,
            selectedButton === "activities" && styles.selectedButton
          ]}
          underlayColor="#DDDDDD"
          onPress={() => setSelectedButton("activities")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedButton === "activities" && styles.selectedButtonText
            ]}
          >
            Activities
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[
            styles.button,
            selectedButton === "cuisines" && styles.selectedButton
          ]}
          underlayColor="#DDDDDD"
          onPress={() => setSelectedButton("cuisines")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedButton === "cuisines" && styles.selectedButtonText
            ]}
          >
            Cuisines
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[
            styles.button,
            selectedButton === "trekking" && styles.selectedButton
          ]}
          underlayColor="#DDDDDD"
          onPress={() => setSelectedButton("trekking")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedButton === "trekking" && styles.selectedButtonText
            ]}
          >
            Trekking
          </Text>
        </TouchableHighlight>
      </View>
      <ScrollView horizontal>
        {selectedData.map(item => (
          <CustomCard
            key={item.id}
            title={item.title}
            description={item.description}
            imageUri={item.imageUri}
            selected={selectedCard?.id === item.id}
            onPress={() => handleCardPress(item)}
            onModalPress={handleModalPress}
          />
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          {/* <ModalContent selectedCard={selectedCard} closeModal={closeModal}  title={}> */}
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white"
  },
  modalText: {
    fontSize: 10,
    color: "white"
  },
  modalCloseButton: {
    fontSize: 16,
    color: "white",
    marginTop: 10
  },
  NavTab: {
    color: "red",
    backgroundColor: "green",
    width: 100,
    height: 30,
    alignItems: "center",
    textAlign: "center",
    verticalAlign: "middle",
    textAlignVertical: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#e0e0e0"
  },
  selectedButton: {
    backgroundColor: "#222222" // Set your desired highlight color
  },
  buttonText: {
    color: "black", // Set your desired text color
    textAlign: "center" // Center the text within the button
  },
  selectedButtonText: {
    color: "white" // Set your selected text color
  }
})

export default App
