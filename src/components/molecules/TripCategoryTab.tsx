
import React from 'react';
import { View, StyleProp, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import AppImage from '../atoms/Image/AppImage';
import AppTitle from '../atoms/title/AppTitle';

/**
 * Example Usage:
 * <TripCategoryTab
 *   viewStyle={{ margin: 8 }}
 *   imageStyle={{ width: 120, height: 120, borderRadius: 60 }}
 *   titleStyle={{ color: '#333', fontSize: 16 }}
 *   imageUrl={require('../../../assets/facebook.png')}
 *   title={'Camping'}
 * />
 *
 * <TripCategoryTab
 *   imageUrl={'https://example.com/image.png'}
 *   title={'Remote Image'}
 * />
 */

type TripCategoryTabProps = {
    viewStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    titleStyle?: StyleProp<TextStyle>;
    imageUrl: string | number; // number for require(), string for remote
    title: string;
};

const TripCategoryTab: React.FC<TripCategoryTabProps> = ({
    viewStyle,
    imageStyle,
    titleStyle,
    imageUrl,
    title,
}) => {
    // Determine source type for AppImage
    const source = typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl;

    return (
        <View style={[{ gap: 10, alignItems: 'center' }, viewStyle]}>
            <AppImage source={source} style={[{ width: 60, height: 60, borderRadius: 50 }, imageStyle]} />
            <AppTitle content={title} type={'subtitle'} style={titleStyle} />
        </View>
    );
};

export default TripCategoryTab;