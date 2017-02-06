import React, {Component} from 'react'
import {View, StyleSheet, ScrollView, Text, TextInputState, RefreshControl} from 'react-native'


export default class ViewContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false
    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    setTimeout(()=>{
      this.setState({refreshing: false})
    }, 500)
  }
    render() {
        return (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
                showsVerticalScrollIndicator={true}
                automaticallyAdjustContentInsets={false}
                contentContainerStyle={styles.content}

                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps={true}
                style={styles.scrollContainer}
                >

                <View
                    style={[this.props.noNav ? null : styles.container, this.props.style]}>
                    {this.props.children}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        borderLeftWidth: 1,
        borderLeftColor: '#ddd',
        marginTop: 64,

    },
    container: {
      marginTop: 20,
    }
})
