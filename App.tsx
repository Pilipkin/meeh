import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MMouse from "./src/screens/MMouse";
import Transitions from "./src/screens/Transitions";
import UseTransition from "./src/screens/UseTransition";
import TransitionTests from "./src/screens/TransitionTests";
import PinchGesture from "./src/screens/PinchGesture";

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="PinchGesture">
        <Drawer.Screen name="MMouse" component={MMouse} />
        <Drawer.Screen name="Transitions" component={Transitions} />
        <Drawer.Screen name="UseTransition" component={UseTransition} />
        <Drawer.Screen name="TransitionTests" component={TransitionTests} />
        <Drawer.Screen name="PinchGesture" component={PinchGesture} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
