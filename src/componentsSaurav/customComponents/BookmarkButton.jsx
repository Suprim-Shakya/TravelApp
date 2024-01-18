import { Pressable, StyleSheet} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';

const BookmarkButton = ({onPress , active, style}) => {
    const iconName = active ? 'bookmark': 'bookmark-plus-outline'
    const iconColor = active? COLORS.primary : COLORS.darkGrey;
    const Styles = StyleSheet.create({
        pressable: {
            // position: 'absolute',
            // top: -5,
            // right: -8,
            // zIndex: 1,
            ...(style || {}) // destructure style prop only if present
        }
    })
  return (
    <Pressable onPress={onPress} style={Styles.pressable}>
        <Icon name={iconName} size={30} color={iconColor}/>
    </Pressable>
  )
}

export default BookmarkButton
