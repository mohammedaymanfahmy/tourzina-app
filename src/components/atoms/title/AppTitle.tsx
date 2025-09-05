import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

/* Example Usage
<AppTitle type="title" content="This is a title" />
<AppTitle type="subtitle" content="This is a subtitle" />
<AppTitle type="label" content="This is a label" />

// You can override styles:
<AppTitle type="title" content="Custom Title" style={{ color: 'red', fontSize: 30 }} />
<AppTitle type="subtitle" content="Custom Subtitle" style={{ fontWeight: 'bold', color: '#333' }} />
*/


import { StyleProp, TextStyle } from 'react-native';

type Props = {
    type: string,
    content: string,
    style?: StyleProp<TextStyle>
}

export default function AppTitle({ type, content, style }: Props) {
    const baseStyle = type === 'title' ? styles.title : type === 'subtitle' ? styles.subtitle : styles.label;
    return (
        <View style={styles.container}>
            <Text style={[baseStyle, style]}>{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#737373'
    },
    label: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#737373'
    }
})