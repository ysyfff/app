import React, {Component} from 'react'
import {View, StyleSheet, ScrollView, Text, TextInputState} from 'react-native'


export default class ViewContainer extends Component {
    render() {
        return (
            <ScrollView
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
        borderLeftColor: '#ddd'
    },
    container: {
        marginTop: 84,
    }
})
