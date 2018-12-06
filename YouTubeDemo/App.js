/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import ListView from "./src/components/common/ListView";
import { Header, Icon, Right, Title, Button, Left } from "native-base";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      youTubeList: "",
      isSearchedBarActive: false,
      allDataList: "",
      showLoader: false,
      isRefreshing:false
    };
  }

  componentDidMount() {
    this.setState({ showLoader: true });
    this.getApiData();
  }

  getApiData = () => {
   
    fetch(
      "https://s3-us-west-2.amazonaws.com/youtubeassets/home_num_likes.json"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ showLoader: false, isRefreshing:false ,allDataList: responseJson,youTubeList: responseJson  });
      })
      .catch(error => {
        console.error(error);
      });
  };

  searchFilterFunction = text => {
    if (text == "") {
      this.setState({ youTubeList: this.state.allDataList });
    } else {
      const newData = this.state.allDataList.filter(items => {
        console.log("items", items.title.toUpperCase());
        return items.title.toUpperCase().includes(text.toUpperCase());
      });
      this.setState({ youTubeList: newData });
    }
  };

  onRefresh =()=>{
   this.setState({isRefreshing:true})
   this.getApiData();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.setHeader()}
        <ActivityIndicator
          animating={this.state.showLoader}
          size="large"
          color="red"
          style={{ alignItems: "center", justifyContent: "center", flex: 3 }}
        />
        <FlatList
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
          data={this.state.youTubeList}
          keyExtractor={items => items.title}
          renderItem={items => (
            <ListView
              title={items.item.title}
              number_of_views={items.item.number_of_views}
              duration={items.item.duration}
              name={items.item.channel.name}
              profileImage={items.item.channel.profile_image_name}
              thumbnail_image_name={items.item.thumbnail_image_name}
            />)}
        />

      </View>
    );
  }

  setHeader = () => {
    if (this.state.isSearchedBarActive) {
      return (
        <Header style={{ backgroundColor: "white" }}>
          <Left />
          <TextInput
            placeholder="search text"
            style={{ fontSize: 20, flex: 2 }}
            onChangeText={text => this.searchFilterFunction(text)}
          />
          <Right>
            <Button transparent>
              <Icon
                onPress={() =>
                  this.setState({
                    isSearchedBarActive: !this.state.isSearchedBarActive,
                    youTubeList: this.state.allDataList
                  })}
                name="close"
                type={"FontAwesome"}
                style={{ color: "grey" }}
              />
            </Button>
          </Right>
        </Header>
      );
    } else {
      return (
        <Header style={{ backgroundColor: "white" }}>
          <Left>
            <Title style={{ color: "red", fontSize: 20, fontWeight: "bold" }}>
              You tube
            </Title>
          </Left>
          <Right>
            <Button transparent>
              <Icon
                onPress={() =>
                  this.setState({
                    isSearchedBarActive: !this.state.isSearchedBarActive
                  })}
                name="search"
                type={"FontAwesome"}
                style={{ color: "grey" }}
              />
            </Button>
          </Right>
        </Header>
      );
    }
  };
}
