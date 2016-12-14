import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import ViewContainer from '../../common/ViewContainer'

//纬度
const LATITUDE = 111712.69150641055729984301412873; //米/度

//经度
const LONGITUDE = 102834.74258026089786013677476285;

export default class Speed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            speed: 0,
            log: []
        };
        this.log = [];
        this.watchID = null;
        this.lastPosition = null;
    }

    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
                this._calSpeed(position);
                this.log.push({lat: position.coords.latitude, lon: position.coords.longitude});
                this.setState({log: this.log});
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true}
        );
    }

    componentWillUnmount() {
        this.log = [];
        navigator.geolocation.clearWatch(this.watchID);
    }

    _calDistance(a, b) {
        var ad = Math.abs(a.longitude - b.longitude) * LONGITUDE;
        var bd = Math.abs(a.latitude - b.latitude) * LATITUDE;
        return Math.sqrt(ad*ad + bd*bd);
    }

    _calSpeed(position) {
        let speed = 0;

        if(this.lastPosition != null) {
            var distance = this._calDistance(this.lastPosition.coords, position.coords)/1000;
            var time = (position.timestamp - this.lastPosition.timestamp)/1000/3600;
            speed = Math.ceil(distance / time);

        }

        this.lastPosition = position;

        this.setState({speed});
    }

    render() {
        let _showLog = (log) => {
            return (
                <View>
                    <Text>
                        lat: {log.lat}, log: {log.lon}
                    </Text>
                </View>
            )
        }


        return (
            <ViewContainer >
                <View style={style.speedContainer}>
                    <Text>{this.state.speed} km/h</Text>
                </View>
                <View>
                    {this.state.log.map(_showLog)}
                </View>
            </ViewContainer>
        )
    }
}

// style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
const style = StyleSheet.create({
    speedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 200
    }
});
