import TripCategoryTab from "@/components/molecules/TripCategoryTab";
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

// Example Usage:
/**
 * import tripFlatList from "@/components/organisms/TripFlatList/TripFlatList";
 *
 * const trips = [
 *   { id: "1", title: "Camping", image: require("../../assets/facebook.png") },
 *   { id: "2", title: "Hiking", image: require("../../assets/icon.png") },
 *   // ...more trips
 * ];
 *
 * <TripFlatList titleStyle={{ color: 'white' }} subTitleStyle={{ color: 'lightGray' }} />
 *
 * // You can use this in your screen/component to show a horizontal list of trip categories.
 */

// mock data

const defaultTrips = [
    { id: "1", title: "Camping", image: require("../../../../assets/facebook.png") },
    { id: "2", title: "Hiking", image: require("../../../../assets/icon.png") },
    { id: "3", title: "Cruise", image: require("../../../../assets/apple.png") },
    { id: "4", title: "Fishing", image: require("../../../../assets/splash-icon.png") },
    { id: "5", title: "Safari", image: require("../../../../assets/facebook.png") },
    { id: "6", title: "Diving", image: require("../../../../assets/icon.png") },
    { id: "7", title: "Climbing", image: require("../../../../assets/apple.png") },
    { id: "8", title: "Road Trip", image: require("../../../../assets/splash-icon.png") },
];

type tripFlatListProps = {
    data?: typeof defaultTrips;
    containerStyle?: any;
    imageStyle?: any;
    titleStyle?: any;
    subTitleStyle?: any;
};

export default function tripFlatList({ data, containerStyle, imageStyle, titleStyle, subTitleStyle }: tripFlatListProps) {
    const trips = data || defaultTrips;
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.title, titleStyle]}>Explore Our Trips</Text>
            <FlatList
                data={trips}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id + index}
                ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                renderItem={({ item }) => (
                    <TripCategoryTab
                        imageStyle={imageStyle || { width: 60, height: 60, borderRadius: 60 }}
                        imageUrl={item.image}
                        title={item.title}
                        titleStyle={subTitleStyle}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginTop: 60 },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 10, paddingHorizontal: 16},
});
