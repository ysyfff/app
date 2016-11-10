import React from 'react'
import {AsyncStorage} from 'react-native'

import _ from 'lodash'

class Store {
    setPoint(key: String,
             data: [{a: 1,b:2}],
             callback = ()=>{}: Function ) {
        AsyncStorage.getItem(key, (err, val) => {

            const point = val == null ? data : _.concat(JSON.parse(val), data);
            AsyncStorage.removeItem(key, (err) => {
                AsyncStorage.setItem(key, JSON.stringify( point ), callback);
            });
        });
    }
}

export default new Store();
