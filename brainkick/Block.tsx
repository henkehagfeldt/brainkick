import React, { Component } from 'react';
import { Animated, Easing, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

export default class Block extends Component{

    state = {
      color: 'yellow'
    };
  
    styles = StyleSheet.create({
      image:{      
        width: 100,
        height: 100
      }
    });
    
    constructor(props){
      super(props); 
    }    
  
    render(){
      const {color} = this.state;
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
            source={require("./images/"+color+".png")}
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