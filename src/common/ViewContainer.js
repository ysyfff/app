import React, {Component} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'


export default class ViewContainer extends Component {
    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={[this.props.noNav ? null : styles.container, this.props.style]}>
                    {this.props.children}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        marginTop: -20, // ScrollView会处理掉StatusBar的高度问题使用的是marginTop: 20属性
        backgroundColor: '#f8f8f8',
    },
    container: {
        marginTop: 84
    }
})
