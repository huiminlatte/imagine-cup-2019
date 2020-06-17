import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';

import * as FileSystem from 'expo-file-system';

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as posenet from '@tensorflow-models/posenet';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';

import * as jpeg from 'jpeg-js';

//const timeoutPromise = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

/*
const Example = ({sample}) => (
  <View style = {styles.container}>
    <TouchableOpacity>
    <Image source={sample} style={{width: 225, height:225}} />
    </TouchableOpacity>
  </View>
);*/


export default class TrialCamera extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
          cameraType: 'back',
          URI: 'file:///var/mobile/Containers/Data/Application/599EB87D-D85E-4989-944F-404B65F79AE0/Library/Caches/Camera/E914FF01-1A86-4367-B78C-CF2AA4D16623.jpg',
          width: 0,
          height: 0
        };
      }
/*
    handleImage(canvas) {
      console.log("Other Image");
      const image = new CanvasImage(canvas);
      canvas.width = 225;
      canvas.height = 225;

      const context = canvas.getContext('2d');

      image.src = this.state.URI;
      image.addEventListener('load', () => {
      context.drawImage(image, 0, 0, 225, 225);
      console.log("Image");
    });

      const imgData = context.getImageData(0,0,225,225);
      return imgData;
     
    }*/

    singlePose = async () => {
      console.log("Meep!");
      const net = await posenet.load();

     // const inputImage = source = {uri: this.state.URI};
     // const imageURI = inputImage.uri;

      const image = require('./assets/standingpose.jpg');

      const imageAssetPath = Image.resolveAssetSource(image);

      console.log(imageAssetPath.uri);
      const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });

      const imgB64 = await FileSystem.readAsStringAsync(response, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
      const raw = new Uint8Array(imgBuffer);
      const imageTensor = decodeJpeg(raw);
      const pose = await net.estimateSinglePose(imageTensor, {
        flipHorizontal: false
      });
      console.log(pose);
    };

    trialPose = async () => {
      console.log("Meep!");
      const model = await posenet.load();

      const image1 = require('./assets/standingpose.jpg');
      const image2 = require('./assets/House.jpeg');
      const image3 = source = this.state.URI;
      console.log(image3);

      const imageAssetPath = Image.resolveAssetSource(image2);
      console.log(imageAssetPath);

      const cameraAssetPath =  {
        __packager_asset : true, 
        height: 255, 
        scale: 1, 
        uri: image3, 
        width: 255
      };
      console.log(cameraAssetPath);

      const response = await fetch(cameraAssetPath.uri, {}, { isBinary: true });
      console.log(response);

      const rawImageData = await response.arrayBuffer();
      console.log(rawImageData);

      const imageTensor = await this.imageToTensor(rawImageData);

      const prediction = await model.estimateSinglePose(imageTensor);
      console.log(prediction);

    };

    imageToTensor(rawImageData) {
      const TO_UINT8ARRAY = true
      const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY)
      // Drop the alpha channel info for posenet
      const buffer = new Uint8Array(width * height * 3)
      let offset = 0 // offset into original data
      for (let i = 0; i < buffer.length; i += 3) {
        buffer[i] = data[offset]
        buffer[i + 1] = data[offset + 1]
        buffer[i + 2] = data[offset + 2]
        offset += 4
      }
      return tf.tensor3d(buffer, [height, width, 3])
    }

    takePicture = async () => {
        if (this.camera) {
          const options = {base64: true , width: 225, height: 225};
          const data = await this.camera.takePictureAsync(options);
          console.log(data.uri);
          this.setState({
              URI: data.uri
          });
        }
      };
    
 /*   
    refreshPic = async() => {
      if (this.camera) {
        const options = {base64: true , width: 225, height: 225};
        while (true) {
            await timeoutPromise(5);
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
            this.setState({
                URI: data.uri
            });
        }
      }
    }

   */
   

    render() {
      return (
          <View style={{ flex: 1, alignItems:'center', }}>
              <RNCamera 
              ref={ref => {this.camera = ref;}}
              style={{height: '50%', width: '100%',}}
              type={this.state.cameraType}/>
              <TouchableOpacity style = {styles.opacity }>
                  <Text 
                  style={{fontSize: 18, 
                      marginBottom: 10, 
                      color: 'black', }}
                  onPress = {this.refreshPic.bind(this)}
                  > SNAP </Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.opacity }>
                  <Text 
                  style={{fontSize: 18, 
                      marginBottom: 10, 
                      color: 'black', }}
                  onPress = {this.trialPose.bind(this)}
                  > TRY </Text>
              </TouchableOpacity>
              <View style = {styles.container}>
              <Image
                   source = {{uri: this.state.URI}}
                   style={{width: 225, height: 225, }}/>
              </View>
          </View>
          
      );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      color: '#000',
      padding: 10,
      margin: 40
    },

    opacity: {
        flex: 0.2,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
    
  });

