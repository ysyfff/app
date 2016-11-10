import React, {Component} from 'react'
import {Text, View, AsyncStorage} from 'react-native'
import ViewContainer from '../common/ViewContainer'
// import MapView from 'react-native-maps'
// import MapView from 'react-native-maps'
import RNMapViews from '../example/test/testReactNativeMaps'
import _ from 'lodash'

//Test MapView Example
// export default class Foot extends Component {
//     render() {
//         return (
//             <ViewContainer style={{backgroundColor: 'green'}} noNav={true}>
//                 <LocationFollow />
//                 <Overlay />
//                 <Callout nav={this.props.nav} />
//                 <MapViewExample />
//             </ViewContainer>
//         )
//     }
// }

export default class Foot extends Component {
    render() {
        //MapView不能套在ViewContainer中，否则导致MapView的flex：1时，高度无法伸展(应该是scroll属性导致)
        return (
            <View style={{flex: 1}}>
                <RNMapViews />
            </View>
        )
    }
}

// export default class Foot extends Component {
//     constructor(props) {
//         super(props)
//
//     }
//     render() {
//         //MapView不能套在ViewContainer中，否则导致MapView的flex：1时，高度无法伸展(应该是scroll属性导致)
//         return (
//             <View style={{flex: 1}}>
//                 <MapView
//                     style={{flex: 1}}
//                     showsUserLocation={true}
//                     followUserLocation={true}
//                     rotateEnabled={true}
//                     legalLabelInsets={{bottom: -1000}}
//                   />
//             </View>
//         )
//     }
//     _getPoint(key=new Date(): String, callback=()=>{}: Function) {
//         AsyncStorage.getItem(key, callback);
//     }
//     _setPoint(key=new Date(): String, data: [{a: 1,b:2}], callback = ()=>{}: Function) {
//         AsyncStorage.getItem(key, (err, val) => {
//             const point = val == null ? data : _.concat(JSON.parse(val), data);
//             AsyncStorage.setItem(key, JSON.stringify( point ), callback);
//         });
//     }
// }
