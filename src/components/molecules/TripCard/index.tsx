import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AppImage from '../../atoms/Image/AppImage';
import AppPrice from '../../atoms/Price/AppPrice';
import IconButton from '../../atoms/IconBtn/IconButton';
import RatingPill from '../../atoms/Rating/RatingPill';
import colors from '../../../colors/colors';
import { wp, hp } from '@/utils/dimensions';
import styles from './styles.modules';

type Variant = 'vertical' | 'list' | 'large';

export type TripCardProps = {
  imageUrl: string;
  tripName: string;
  tripLocation: string;
  tripPrice: number;
  rating: number;
  perWhat: string;
  onFavPress?: () => void;
  onPress?: () => void;
  isFavorite?: boolean;
  variant?: Variant;
  isVertical?: boolean;
  style?: StyleProp<ViewStyle>;
  showDivider?: boolean; 
};

export default function TripCard(props: TripCardProps) {
  const {
    imageUrl,
    tripName,
    tripLocation,
    tripPrice,
    rating,
    perWhat,
    onFavPress,
    onPress,
    isFavorite = false,
    variant: variantProp,
    isVertical,
    style,
    showDivider = false,
  } = props;

  const variant: Variant = variantProp ?? (isVertical ? 'vertical' : 'list');

  const [fav, setFav] = useState<boolean>(!!isFavorite);
  useEffect(() => { setFav(!!isFavorite); }, [isFavorite]);
  const handleFavPress = () => {
    setFav((v) => !v);
    onFavPress?.();
  };

  if (variant === 'vertical') {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [styles.vCard, style, { transform: [{ scale: pressed ? 0.98 : 1 }] }]}> 
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.vImage}
          imageStyle={{ borderRadius: 15 }}
        >
          <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.12)', borderRadius: 15 }]} />

          <View style={styles.vTopRow}>
            <IconButton
              size="md"
              variant="elevated"
              tileColor="#FFFFFF"
              icon={({ size }) => (
                <AntDesign name={fav ? 'heart' : 'hearto'} size={size} color={fav ? '#F41F52' : '#141416'} />
              )}
              onPress={handleFavPress}
              accessibilityLabel="Favorite"
              stopPropagation
            />
          </View>

          <RatingPill value={rating} size="md" style={styles.vRating} />

          <View style={styles.vFooter}>
            <View>
              <Text style={[styles.tripName, { marginBottom: 7 }]} numberOfLines={1}>{tripName}</Text>
              <View style={[styles.tripLocation, { marginBottom: 3 }]}>
                <AntDesign name="enviromento" size={16} color="#FFFFFF" />
                <Text style={styles.tripLocationText} numberOfLines={1}>{tripLocation}</Text>
              </View>
              <AppPrice content={tripPrice} size={18} perWhat={perWhat} isPrimaryColor={true} />
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    );
  }

  if (variant === 'large') {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [styles.lgCard, style, { transform: [{ scale: pressed ? 0.98 : 1 }] }] }>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.lgImage}
          imageStyle={{ borderRadius: 16 }}
        >
          <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.10)', borderRadius: 16 }]} />
          <View style={styles.vTopRow}>
            <IconButton
              size="md"
              variant="elevated"
              tileColor="#FFFFFF"
              icon={({ size }) => (
                <AntDesign name={fav ? 'heart' : 'hearto'} size={size} color={fav ? '#F41F52' : '#141416'} />
              )}
              onPress={handleFavPress}
              accessibilityLabel="Favorite"
              stopPropagation
            />
          </View>
          <RatingPill value={rating} size="md" style={styles.lgRating} />
        </ImageBackground>

        <View style={styles.lgFooter}>
          <View style={styles.lgTitleRow}>
            <Text style={styles.tripName} numberOfLines={1}>{tripName}</Text>
            <AppPrice content={tripPrice} size={18} perWhat={perWhat} isPrimaryColor={true} />
          </View>
          <View style={[styles.tripLocation, { marginTop: 6 }]}>
            <AntDesign name="enviromento" size={16} color={colors.text} />
            <Text style={[styles.tripLocationText, { color: colors.text }]} numberOfLines={1}>{tripLocation}</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.hContainer, style, { transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
      <View style={styles.leftContainer}>
        <AppImage style={{ width: wp(78), height: wp(78), borderRadius: 10 }} source={{ uri: imageUrl }} />
        <View style={styles.hTripInfo}>
          <Text style={styles.tripName} numberOfLines={1}>{tripName}</Text>
          <View style={styles.tripLocation}>
            <AntDesign name="enviromento" size={16} color={colors.white} />
            <Text style={[styles.tripLocationText, { color: colors.text }]} numberOfLines={1}>{tripLocation}</Text>
          </View>
          <AppPrice content={tripPrice} size={18} perWhat={perWhat} isPrimaryColor={true} />
        </View>
      </View>

      <View style={styles.rightContainer}>
        <RatingPill value={rating} size="md" variant="inline" />
      </View>

      {showDivider && <View style={styles.divider} />}
    </Pressable>
  );
}

