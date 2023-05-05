import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native'
import React from 'react'

const Paginator = ({data, scrollX}) => {


    const width = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
        {data.map((_, i) => {
            const inputRange = [(i-1) * width, i*width, (i+1) * width];

            const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: "clamp",
            });
            return <Animated.View style={[styles.dot, {opacity,}]} key={i.toString()} />;
        })}





    </View>
  )
}

export default Paginator

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 64,
        
    },

    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: "#515151",
        marginHorizontal: 8,
        width: 10,
    }

})