import React, {Component} from 'react'
import {MapView, View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import Btn from '../../../component/Btn'
import If from '../../../component/If'

class AnnotationExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFirstLoad: true,
            annotations: [],
            mapRegion: void 0
        }
    }
    render() {
        if (this.state.isFirstLoad) {
          var onRegionChangeComplete = (region) => {
            this.setState({
              isFirstLoad: false,
              annotations: [{
                longitude: region.longitude,
                latitude: region.latitude,
                ...this.props.annotation,
              }],
            });
          };
        }

        return (
          <MapView
            style={styles.map}
            onRegionChangeComplete={onRegionChangeComplete}
            region={this.state.mapRegion}
            annotations={this.state.annotations}
          />
        );
    }
}

export class MapViewExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFirstLoad: true,
            mapRegion: void 0,
            mapRegionInput: void 0,
            annotations: []
        }
        this._onRegionChange = this._onRegionChange.bind(this);
        this._onRegionChangeComplete = this._onRegionChangeComplete.bind(this);
    }
    render() {
        return(
        <View>
            <Text>
                Annotations
            </Text>
            <MapView
              style={styles.map}
              onRegionChange={this._onRegionChange}
              onRegionChangeComplete={this._onRegionChangeComplete}
              region={this.state.mapRegion}
              annotations={this.state.annotations}
            />
          </View>
          )
    }
    _getAnnotations(region) {
        return [{
          longitude: region.longitude,
          latitude: region.latitude,
          title: 'You Are Here',
      },{
        longitude: region.longitude+10,
        latitude: region.latitude+10,
        title: 'You Are Here',
      }];
    }
    _onRegionChange(region) {
        this.setState({
          mapRegionInput: region,
        });
    }
    _onRegionChangeComplete(region) {
        if (this.state.isFirstLoad) {
          this.setState({
            mapRegionInput: region,
            annotations: this._getAnnotations(region),
            isFirstLoad: false,
          });
      }
    }
}

export class LocationFollow extends Component {
    render() {
        return (
            <View>
                <Text>
                    showsUserLocation + followUserLocation
                </Text>
                <MapView
                  style={styles.map}
                  showsUserLocation={true}
                  followUserLocation={true}
                />
            </View>
        )
    }
}

export class Callout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showHello: false
        }
    }
    render() {
        let me = this;
        return (
            <View style={{marginTop: 15}}>
                <View style={{position: 'absolute', left: -10, top: 20,zIndex: 2}}>
                    <Btn onPress={() => {
                        me.setState({showHello: !this.state.showHello})
                        me.props.nav.setState({showNav: !me.props.nav.state.showNav})
                    }}  style={{margin: 0}}>
                        你好
                    </Btn>
                </View>
                <If v={this.state.showHello}>
                    <Text>
                        Callout
                    </Text>
                </If>
                <AnnotationExample style={styles.map} annotation = {{
                    title: 'More Info',
                    rightCalloutView: (
                        <TouchableOpacity
                            onPress={() => {
                              alert('You Are Here');
                            }}>
                            <Image
                              style={{width:30, height:30}}
                              source={require('./uie_thumb_selected.png')}
                            />
                          </TouchableOpacity>
                    )
                }} />
            </View>
        )
    }
}

export class Overlay extends Component {
    render() {
        return(
            <View style={{marginTop: 15}}>
                <Text>
                    Overlay
                </Text>
                <MapView
                    style={styles.map}
                    region={{
                      latitude: 39.06,
                      longitude: -95.22,
                    }}
                    overlays={[{
                      coordinates:[
                        {latitude: 32.47, longitude: -107.85},
                        {latitude: 33.47, longitude: -106.85},
                        {latitude: 33.47, longitude: -105.85},
                        {latitude: 33.47, longitude: -104.85},
                        {latitude: 34.47, longitude: -104.85},
                        {latitude: 35.47, longitude: -104.85},
                        {latitude: 36.47, longitude: -103.85},
                        {latitude: 40.47, longitude: -102.85},
                      ],
                      strokeColor: '#f007',
                      lineWidth: 5,
                    }]}
                  />
            </View>
        )
    }
}

var styles = StyleSheet.create({
  map: {
    height: 150,
    marginTop: 2,
    borderWidth: 1,
    borderColor: '#000000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: 150,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    fontSize: 13,
    padding: 4,
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777',
  },
});
