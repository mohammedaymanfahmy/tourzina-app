import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

/* Example Usage
<AppTitle type="title" content="This is a title" />
<AppTitle type="subtitle" content="This is a subtitle" />
<AppTitle type="label" content="This is a label" />
 */

type Props = {
    type: string,
    content: string
}

export default function AppTitle({ type, content }: Props) {
    return (
        <View style={styles.container}>
            <Text style={type === 'title' ? styles.title : type === 'subtitle' ? styles.subtitle : styles.label}>{content}</Text>
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