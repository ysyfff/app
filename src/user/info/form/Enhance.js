//强化表单Component
import React from 'react'
import {TextInput} from 'react-native'
import FieldEnhance from './FieldEnhance'


var TextInputV = FieldEnhance(TextInput, 'onChangeText');


export {
    TextInputV,
}
