import React, { Component } from 'react';
import { Animated, Easing, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

export default class Block extends Component{

    state = {
      spinning: false
    };
  
    spinValue = new Animated.Value(0);
    moveValue = new Animated.Value(0);
  
    growStyle = StyleSheet.create({
      image:{      
        width: 100,
        height: 100
      }
    });
    
    constructor(props){
     super(props); 
    }
    
    dragBlock = () => {
        
    }

    releaseBlock = () => {
        
    }

    startSpin = () => {
    let timing2 = Animated.timing(
        this.moveValue,
        {
            toValue: 1,
            duration: 500,
            easing: Easing.linear
        });
          

      if (this.state.spinning){
        this.state.spinning = false;
        //this.timing.stop();
        
        timing2.stop();
      }
      else{
        this.state.spinning = true;
        //this.timing.start();
        timing2.start();
      }
    }
    
  
    render(){
      const spin = this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
  
      const move = this.moveValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 120]
      })
      
      return(
        <Animated.View style={{
            height: 80, 
            width: 300,
            marginBottom: -15,
            transform: [{
                rotate: spin
            },
            {
            translateY: move
            },
            {
                scaleX: 0.6
            },
            {
                scaleY: 0.6
            }
            ]
            }}>
            <ImageBackground 
            source={require("./images/block.png")}
            style={{width:'100%', height:'100%'}}>
                <TouchableOpacity style={{
                    width: '100%',
                    height: '100%'
                }}
                onPress={this.startSpin}
                onPressIn={this.dragBlock}
                onPressOut={this.releaseBlock}/>
            </ImageBackground>
        </Animated.View>
      )
    }
  }