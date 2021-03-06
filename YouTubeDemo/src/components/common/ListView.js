import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const ListView = (props) => {

    return (
      <View style={styles.container}>
        <Image
          style={styles.Imagestyle}
          source={{ uri: props.thumbnail_image_name }}
        />

        <Text
          style={styles.DurationTextStyle}>
          {(props.duration/60).toFixed(2)}
          </Text>

        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.smallImagestyle}
            source={{ uri: props.profileImage }}
          />
          <View>
            <Text style={styles.TextHeadingStyle}>{props.title}</Text>
            <Text style={styles.TextStyle}>{props.name} . {props.number_of_views%1000}K Views . {(props.duration/60).toFixed(1)} min</Text>
            
          </View>
        </View>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5
  },
  Imagestyle: {
    height: 200,
    marginBottom: 10
  },
  smallImagestyle: {
    width: "10%",
    height: "100%",
    marginLeft: 10,
    marginBottom:5 ,
    borderRadius:20
  },
  TextHeadingStyle: {
    fontSize: 14,
    paddingLeft: 20,
    fontWeight: "bold"
  },
  TextStyle: {
    fontSize: 14,
    paddingLeft: 20,
    marginBottom: 5
  },
  DurationTextStyle: {
    width: 45,
    height: 20,
    borderWidth: 1,
    position: "absolute",
    right:10,
    top:170,
    color:"white",
    textAlign:"center",
    backgroundColor: "black"
  }
});

export default ListView;
