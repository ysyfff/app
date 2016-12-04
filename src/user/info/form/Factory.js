// 对默认的Form Compoent进行加工，增加校验相关的props属性

export default class Factory {
    /*
    @param componet 要装饰的组件，如TextInput
    @param getter 组件变化的回调来获取值，如TextInput的onChangeText
    @param setter 设置组件值得回调，如TextInput的onChangeText
    */
    create(componet, getter, setter) {
        return (
            <componet
                {...this.props}
            />
        )
    }
}
