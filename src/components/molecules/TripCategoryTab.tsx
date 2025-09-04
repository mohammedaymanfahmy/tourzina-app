import { View, Text } from 'react-native'
import React from 'react'
import AppImage from '../atoms/Image/AppImage';
import AppTitle from '../atoms/title/AppTitle';

/* Example Usage:
    <TripCategoryTab 
    imageUrl={"https://up.yimg.com/ib/th/id/OIP.CjuJhR9wS4jD9R183-cdDwHaEK?pid=Api&rs=1&c=1&qlt=95&w=198&h=111"} 
    title={"Example Title"} 
    />
*/

type TripCategoryTabProps = {
    imageUrl: string,
    title: string
}

const TripCategoryTab = ({ imageUrl, title }: TripCategoryTabProps) => {
    return (
        <View style={{ gap: 10 }}>
            <AppImage source={{ uri: imageUrl }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            <AppTitle content={title} type={'subtitle'} />
        </View>
    )
}

export default TripCategoryTab;