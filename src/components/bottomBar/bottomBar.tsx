// import React from "react";
// import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
// import FontAwesome from "react-native-vector-icons/FontAwesome";

// const bottomTabs = [
//   {
//     id: 1,
//     title: "Home",
//     icon: <FontAwesome name="home" size={23} color="#b1b5c3" />,
//     active: false,
//   },
//   {
//     id: 2,
//     title: "My Booking",
//     icon: <FontAwesome name="table" size={20} color="#b1b5c3" />,
//     active: false,
//   },
//   {
//     id: 3,
//     title: "Message",
//     icon: <FontAwesome name="envelope" size={20} color="#b1b5c3" />,
//     active: false,
//   },
//   {
//     id: 4,
//     title: "Profile",
//     icon: <FontAwesome name="user" size={20} color="#3b71fe" />,
//     active: true,
//   },
// ];
// const BottomBar = () => {
//   return (
//     <View style={styles.bottomNav}>
//       {bottomTabs.map((tab) => (
//         <TouchableOpacity key={tab.id} style={styles.tabItem}>
//           <Text style={[styles.tabIcon, tab.active && styles.activeTabIcon]}>
//             {tab.icon}
//           </Text>
//           <Text style={[styles.tabText, tab.active && styles.activeTabText]}>
//             {tab.title}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     bottomNav: {
//     flexDirection: "row",
//     backgroundColor: "#2a2a2a",
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#333",
//     position: "absolute", // ✅ fixed at bottom
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   tabItem: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 8,
//   },
//   tabIcon: {
//     fontSize: 20,
//     color: "#666",
//     marginBottom: 4,
//   },
//   activeTabIcon: {
//     color: "#4a90e2",
//   },
//   tabText: {
//     fontSize: 8,
//     color: "#666",
//   },
//   activeTabText: {
//     color: "#4a90e2",
//   },
// });

// export default BottomBar;


import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";

const bottomTabs = [
  {
    id: 1,
    title: "Home",
    icon: "home",
    route: "Home",
  },
  {
    id: 2,
    title: "My Booking",
    icon: "table",
    route: "Booking",
  },
  {
    id: 3,
    title: "Message",
    icon: "envelope",
    route: "Message",
  },
  {
    id: 4,
    title: "Profile",
    icon: "user",
    route: "Profile",
  },
];

const BottomBar = () => {
  const navigation = useNavigation<any>();
  const route = useRoute(); // get current screen name

  return (
    <View style={styles.bottomNav}>
      {bottomTabs.map((tab) => {
        const isActive = route.name === tab.route; // check if active
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            onPress={() => navigation.navigate(tab.route)}
          >
            <FontAwesome
              name={tab.icon}
              size={23}
              color={isActive ? "#4a90e2" : "#b1b5c3"}
            />
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#2a2a2a",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 10,
    color: "#b1b5c3",
    marginTop: 4,
  },
  activeTabText: {
    color: "#4a90e2",
    fontWeight: "bold",
  },
});

export default BottomBar;
