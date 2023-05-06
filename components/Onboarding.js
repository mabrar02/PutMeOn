import { View, Text, StyleSheet, FlatList, SafeAreaView, Animated, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native'
import React, {useState, useRef} from 'react'
import Slides from './OnboardSlides';
import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft'

export default Onboarding = () => {

  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null)

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const handleNext = () => {
    if(currentIndex < Slides.length-1){
      slidesRef.current.scrollToIndex({index: currentIndex+1});
    }
    else{
      swapToLogin();
    }

  }

  const handleBack = () => {
    if(currentIndex > 0){
      slidesRef.current.scrollToIndex({index: currentIndex-1});
    }
    else{
      swapToLogin();
    }
  }

  const swapToLogin = () => {
    console.log("NEXT SCREEN");
  }

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;


  return (
    <SafeAreaView>
      <View style={styles.topBar}>
        <TouchableOpacity style={currentIndex == 0 ? styles.hidden : null} onPress={handleBack}>
          <FontAwesomeIcon icon={ faArrowLeft } size={22} color='#A4A4A4' />

        </TouchableOpacity>

        <TouchableOpacity style={currentIndex == 2 ? styles.hidden : null} onPress={swapToLogin}>
          <Text style={{color:'#A4A4A4'}}>Skip</Text>
        </TouchableOpacity>

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
        <Paginator data={Slides} scrollX={scrollX}/>




        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextText}>
              {currentIndex == 2 ? "Start" : "Next"}
            </Text>
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
      alignItems: "center",
      width: Dimensions.get('window').width * 0.9,
      alignSelf: "center"
    },

    topBar: {
      flex: 1,
      width: Dimensions.get('window').width * 0.92,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      alignSelf: "center",
      paddingHorizontal: 10,
    },

    nextButton: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#3E6F38",
      width: 75,
      height: 75,
      borderRadius: 40,
      marginBottom: 55,
      
    },

    nextText: {
      color: "#fff",
      fontFamily: "Rubik-SemiBold",
      fontSize: 17,
    },

    hidden: {
      opacity: 0,
      pointerEvents: "none"
    }

});