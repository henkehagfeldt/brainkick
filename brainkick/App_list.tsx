import React from 'react';
import { Animated, FlatList, PanResponder, PanResponderInstance, StyleSheet, View } from 'react-native';

const colorMap = {
  0: 'red',
  1: 'green',
  2: 'black',
  3: 'white',
  4: 'blue'
}

export default class App extends React.Component {
  
  state = {
    indexList: -1,
    data: Array.from(Array(5), (_, i) => {
      return i;
    }),
    
  };

  _panResponder: PanResponderInstance;
  point = new Animated.ValueXY();
  
  
  constructor(props){
    super(props);

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now

        let temp_index = (gestureState.y0-100)/100;

        if(temp_index => 0 && temp_index <= 4){
          this.setState({indexList: Math.floor(temp_index)});
          console.log(Math.floor(temp_index));
        }

        

      },
      onPanResponderMove: (evt, gestureState) => {
        //console.log('y0', gestureState.y0);

        
        
        Animated.event([{y: this.point.y}])({y: gestureState.moveY- gestureState.y0});
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  
  render(){
    const {data, indexList} = this.state;

    const renderItem = ({item, index}) => (
    <Animated.View {...this._panResponder.panHandlers} style={{
      top: index === indexList ? this.point.getLayout().top : 0,
      flexDirection: 'row',
      opacity: index === indexList ? 1 : 1,
      zIndex: index === indexList ? 2 : 1,
      height:  100, 
      backgroundColor: colorMap[item]}}>
    </Animated.View>);

    return(
      <View style={styles.container}>
        <FlatList 
          style={styles.list}
          data={data} 
          renderItem={renderItem} 
          keyExtractor={(item) => "" + item}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    width: '70%',
    overflow: 'visible',
    zIndex: 1
  },

  container: {
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    height: '100%',
    overflow: 'visible'
  },
  
  image:{
    width: 100,
    height: 100
  },
  
  text:{
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    flex: 1
  }
});
