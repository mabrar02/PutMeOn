import { View, Text, StyleSheet, FlatList, SafeAreaView, Animated, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, {useState, useRef} from 'react'
import Slides from './OnboardSlides';
import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';

export default Onboarding = () => {

  const [currerntIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null)

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;


  return (
    <SafeAreaView>
      <View>

      </View>

      <View style={styles.container}> 

        <FlatList  data={Slides} renderItem={({item}) => <OnboardingItem item={item}/>} 
        horizontal 
        showsHorizontalScrollIndicator={false}
         pagingEnabled 
         bounces={false} 
         keyExtractor={(item) => item.id}
         onScroll={Animated.event([{nativeEvent : {contentOffset : {x: scrollX}}}], {useNativeDriver: false,})}
         onViewableItemsChanged={viewableItemsChanged}
         viewabilityConfig={viewConfig}
         scrollEventThrottle={32}
         ref={slidesRef}
         />
      </View>


      <View style={styles.bottomBar}>
        <Paginator style={{flex: 0.8, flexDirection: "row"}} data={Slides} scrollX={scrollX}/>




        <TouchableOpacity style={{flex: 0.2, flexDirection: "row"}}>
            <Text>Next</Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 7,
        justifyContent: "center",
        alignItems: "center",
        
    },

    bottomBar: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },

});