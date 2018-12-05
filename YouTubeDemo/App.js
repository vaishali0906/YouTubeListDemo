/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, FlatList } from "react-native";
import ListView from "./src/components/common/ListView"
import {Header, Icon, Right} from "native-base"

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { dataSource: "" };
  }

  componentDidMount() {
    fetch(
      "https://s3-us-west-2.amazonaws.com/youtubeassets/home_num_likes.json"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ dataSource: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.log("dataSource11", this.state.dataSource);
    return (
      <View >
        <Header style = {{backgroundColor:"white"}}>
          <Right>
        <Icon
        type="material"
          name="search"
        />
        </Right>
          </Header>
       <FlatList
        data={this.state.dataSource}
        renderItem={items => 
        <ListView title={items.item.title}
         number_of_views={items.item.number_of_views} 
         duration={items.item.duration} 
         name={items.item.channel.name}
         profileImage = {items.item.channel.profile_image_name}
         thumbnail_image_name={items.item.thumbnail_image_name}
          />}/>
         
      </View>
    );
  }
}

