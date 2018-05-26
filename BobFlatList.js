import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

export default class BobFlatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false
    };
  }

  async componentDidMount() {
    //await super.componentDidMount();
    await this.makeRemoteRequest();
  }

  handleRefresh = () => {
    console.log('handleRefresh');
    this.setState(
      {
        refreshing: true
      },
      async () => {
        await this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    console.log('handleLoadMore');
    this.setState(
      {
      },
      async () => {
        await this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 15,
          width: "86%",
          backgroundColor: "transparent",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,

        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    //console.log('RENDER!!!!' + JSON.stringify(this.state));
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={this.renderFooter}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={50}
      />
    );
  }
}

const styles = StyleSheet.create({
  titleImage: {
    width: 50,
    height: (214 / 241) * 50
  },
  titleText: {
    color: 'white',
    fontFamily: 'Myriad Pro Bold',
    
    fontSize: 16
  }
});