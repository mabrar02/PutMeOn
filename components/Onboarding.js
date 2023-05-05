import { View, Text, StyleSheet, FlatList, SafeAreaView, Animated } from 'react-native'
import React, {useState, useRef} from 'react'
import Slides from './OnboardSlides';
import OnboardingItem from './OnboardingItem';

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
        showsHorizontalScrollIndicator
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

      <View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        
    },

});