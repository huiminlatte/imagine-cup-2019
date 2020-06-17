'use strict';
import React, { PureComponent, useState, useEffect } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View , Dimensions } from 'react-native';

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

import TrialCamera from './Camera';


const App: () => React$Node = () => {

  const [isTfReady, setTfReady] = useState(false);

  useEffect(() => {
    async function waitForTensorFlowJs() {
      await tf.ready();
      setTfReady(true);
    }
    waitForTensorFlowJs();
  }, []);

 /* useEffect(() => {
    try{
      if (isTfReady) {
      const singlePose = async (image) => {
        console.log("Meep!");
        const net = await posenet.load();
        const pose = await net.estimateSinglePose(image, {
          flipHorizontal: false
        });
        setResult(result);
        console.log(result);
      };
      singlePose(TrialCamera.returnFeed());
      }
    }
    catch(error) {
      console.log(error);
  }
  }, [isTfReady]);*/

  return(
    <View style = {{flex:1,}} >
      <TrialCamera style ={{flex:0.9,}}/>
      <Text style = {{flex:0.1,}}>
      TensorFlow.js v{tf.version.tfjs} is {isTfReady ? 'ready' : 'loading'}{' '}
                {isTfReady && `and using backend: ${tf.getBackend()}`}.
      </Text>
    </View>
  )

}



export default App;

AppRegistry.registerComponent('App', () => App);
