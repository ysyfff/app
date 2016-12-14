import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import ViewContainer from '../../common/ViewContainer'

const R = 6371;
Number.prototype.toRad = function() {
    return this * Math.PI / 180;
}

export default class Speed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            speed: 0,
            log: []
        };
        this.log = [];
        this.watchID = null;
        this.timeID = null;
        this.lastPosition = null;
    }

    componentDidMount() {
        // this.watchID = navigator.geolocation.watchPosition((position) => {
        //         this._calSpeed(position);
        //         this.log.push({lat: position.coords.latitude, lon: position.coords.longitude});
        //         this.setState({log: this.log});
        //     },
        //     (error) => alert(JSON.stringify(error)),
        //     {enableHighAccuracy: true}
        // );
        this._getCurrPosition();
    }

    componentWillUnmount() {
        this.log = [];
        navigator.geolocation.clearWatch(this.watchID);
        clearTimeout(this.timeID);
    }

    //计算球面上的两个点的距离
    _calDistance(a, b) {
        let [lat1, lon1, lat2, lon2] = [a.latitude, a.longitude, b.latitude, b.longitude];
        let dLat = (lat2- lat1).toRad();
        let dLon = (lon2 - lon1).toRad();

        let aa = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                 Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                 Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var cc = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa));
        var dd = R * cc;


        return dd;
    }

    _getCurrPosition() {
        clearTimeout(this.timeID);
        
        this.timeID = setTimeout(()=>{
            navigator.geolocation.getCurrentPosition((position)=>{
                    position.timestamp = new Date().getTime();
                    this._calSpeed(position);


                    this._getCurrPosition();
                },
                (error) => {},
                {enableHighAccuracy: true}
            );
        }, 1000);
    }

    _calSpeed(position) {
        let speed = 0;

        if(this.lastPosition != null) {
            let distance = this._calDistance(this.lastPosition.coords, position.coords)/1000;
            this.log.push({distance});
            this.setState({log: this.log});

            var time = (position.timestamp - this.lastPosition.timestamp)/1000/3600;
            speed = Math.ceil(distance / time);

        }

        this.lastPosition = position;

        this.setState({speed});
    }

    render() {
        let _showLog = (log, i) => {
            return (
                <View key={i}>
                    <Text>
                        distance: {log.distance}
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
