import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FNOL from "./FNOL";
import MyPolicies from "./policies/MyPolicies";
import MyClaims from "./claims/MyClaims";
import MyDocuments from "./MyDocuments";
import MyAgent from "./MyAgent";
import GetAssistance from "./GetAssistance";
import DrawerContent from "./DrawerContent";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faChartBar,
  faFileAlt,
  faUserTie,
  faHandsHelping,
  faPenSquare,
  faTachometerAlt,
  faPen,
  faShieldAlt,
  faFileMedicalAlt,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import MainScreen from "./MainScreen";

const Drawer = createDrawerNavigator();

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#1AC29A',
          inactiveTintColor:"#fff",
          itemStyle: { marginVertical: 5 }
        }}
        drawerContent={(props) => (
          <DrawerContent
            {...props}
            setLogout={this.props.setLogout}
            toggleTheme={this.props.toggleTheme}
            darkTheme={this.props.darkTheme}
          />
        )}
        initialRouteName="MainScreen"
      >
        <Drawer.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            drawerLabel: 'Dashboard',
            drawerIcon: ({ color }) => (
              <FontAwesomeIcon icon={faHome} size={20} color={color} />
            )
          }}
          initialParams={{
            darkTheme: this.props.darkTheme,
            accessToken: this.props.accessToken
          }}
        />

        <Drawer.Screen
          name="FNOLsubmission"
          options={{
            drawerLabel: 'FNOL Submission',
            title: null,
            drawerIcon: ({ color }) => (
              <FontAwesomeIcon icon={faPen} size={20} color={color} />
            )
          }}
          component={FNOL}
          initialParams={{
            darkTheme: this.props.darkTheme,
            accessToken: this.props.accessToken
          }}
        />
        <Drawer.Screen
          name="MyPolicies"
          options={{
            drawerLabel: 'My Policies',
            drawerIcon: ({ color }) => (
              <FontAwesomeIcon icon={faShieldAlt} size={20} color={color} />
            )
          }}
          component={MyPolicies}
          initialParams={{
            accessToken: this.props.accessToken
          }}
        />
        <Drawer.Screen
          name="MyClaims"
          options={{
            drawerLabel: 'My Claims',
            drawerIcon: ({ color }) => (
              <FontAwesomeIcon icon={faChartBar} size={20} color={color} />
            )
          }}
          component={MyClaims}
          initialParams={{
            accessToken: this.props.accessToken
          }}
        />
        <Drawer.Screen
          name="My Documents"
          component={MyDocuments}
          options={{
            drawerLabel: 'My Documents',
            drawerIcon: ({ color }) => (
              <FontAwesomeIcon icon={faFileAlt} size={20} color={color} />
            )
          }}
        />
        <Drawer.Screen
          name="My Agent"
          component={MyAgent}
          options={{
            drawerLabel: 'My Agent',
            drawerIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUserTie} size={20} color={color} />
            )
          }}
        />
        <Drawer.Screen
          name="Get Assistance"
          component={GetAssistance}
          options={{
            drawerLabel: 'Get Assistance',
            drawerIcon: ({ color }) => (
              <FontAwesomeIcon icon={faQuestionCircle} size={20} color={color} />
            )
          }}
        />
      </Drawer.Navigator>
    );
  }
}

export default Home;
