import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button,ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TripCard from './src/components/molecules/TripCard';
import colors from './src/colors/colors';
import AppButton from '@/components/atoms/AppButton/AppButton';

const trips = [
  {
    id: 'nile',
    name: 'Nile Cruise',
    location: 'Egypt, Luxor',
    price: 300,
    perWhat: 'night',
    rating: 4.9,
    imageUrl: 'https://www.travelandleisure.com/thmb/TyFmP1BjE_AQLhqSoTlvywIVwKs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/seabourn-cruises-LUXECRUISE0122-4ec1983310b54d748d5c5c12b4f23993.jpg',
  },
  {
    id: 'safari',
    name: 'Safari',
    location: 'Egypt, Fayoum',
    price: 190,
    perWhat: 'night',
    rating: 4.5,
    imageUrl: 'https://i0.wp.com/egypttimetravel.com/wp-content/uploads/2023/05/a-group-of-tourists-and-travelers-riding-camels-in-the-middle-of-the-desert.jpg?resize=800%2C500&ssl=1',},
  {
    id: 'desert',
    name: 'White Desert Safari',
    location: 'Bahariya Oasis, Egypt',
    price: 721,
    perWhat: 'Person',
    rating: 4.9,
    imageUrl: 'data:image/jpeg;base64,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',},
];

export default function App() {
  return (
    
    <SafeAreaView style={{ flex: 2, backgroundColor: colors.background }} edges={['top', 'left', 'right','bottom']}>
      <ScrollView style={{ flex: 0 }} contentContainerStyle={{ paddingVertical: 16 }}>
        <StatusBar style="light" />

      <Text style={styles.sectionTitle}>Featured</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 4 }}>
        {trips.slice(0, 3).map((t, idx) => (
          <TripCard
            key={t.id}
            variant="vertical"
            imageUrl={t.imageUrl}
            tripName={t.name}
            tripLocation={t.location}
            tripPrice={t.price}
            perWhat={t.perWhat}
            rating={t.rating}
            isFavorite={idx === 0}
            onFavPress={() => console.log('fav pressed', t.id)}
            onPress={() => console.log('open vertical', t.id)}
          />
        ))}
      </ScrollView>


      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Recommendations</Text>
      <View style={{ paddingHorizontal: 12 }}>
        {trips.map((t, i) => (
          <TripCard
            key={`list-${t.id}`}
            variant="list"
            imageUrl={t.imageUrl}
            tripName={t.name}
            tripLocation={t.location}
            tripPrice={t.price}
            perWhat={i % 2 === 0 ? 'Trip' : '3 Days'}
            rating={t.rating - (i % 2 ? 0.5 : 0)}
            showDivider={i !== trips.length - 1}
            onPress={() => console.log('open', t.id)}
          />
        ))}
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Popular</Text>
      <View style={{ paddingHorizontal: 12, gap: 16 }}>
        {trips.slice(0, 2).map((t, idx) => (
          <TripCard
            key={`lg-${t.id}`}
            variant="large"
            imageUrl={t.imageUrl}
            tripName={t.name}
            tripLocation={t.location}
            tripPrice={t.price + idx * 50}
            perWhat="Person"
            rating={t.rating}
            isFavorite={idx === 0}
            onPress={() => console.log('open large', t.id)}
          />
        ))}
      </View>
      
      <View style={{ paddingHorizontal: 12, paddingTop: 16, paddingBottom: 24 }}>
        <AppButton
          variant="contained"
          label="Explore More Trips"
          onPress={() => console.log('pressed')}
        />
      </View>
      
      </ScrollView> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
});
