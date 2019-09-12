import React,{Component} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Picker, Dimensions,ImageBackground } from 'react-native'
import {Provider} from 'react-redux'
import store from './src/redux/store'
import { AppLoading, } from 'expo'
import { Asset } from 'expo-asset'
import {connect} from 'react-redux'
const bckImage = require('./pizza_background.png')
import { updateCurrent } from './src/redux/actions'
const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      selected:0,
      imgs: ''
    };
    this._getNewPicture = this._getNewPicture.bind(this);
  }

   async _getNewPicture () {
    let img = ''
    const images = [];
    const promiseFetch = await fetch('https://dog.ceo/api/breeds/image/random')
      .then(res => res.json())
      .then((data) => {
        img = data.message
        return Image.prefetch(data.message)
      })
      .then((dat) =>{
        console.log('dat',dat);
        store.dispatch(updateCurrent({newUrl: img}))
        return
      })
      .then(() =>{
        console.log('Finished')
        const mainStore = store.getState()
        console.log('mainStore',mainStore)
        this.setState({ready:true, selected: (mainStore.currentPicture.length-1)})
      })
  }
  render(){
    const {ready,selected} = this.state
    const mainStore = store.getState()

    function shorther(dog){
      dog = dog.split('breeds/').pop().split('/').shift().replace(/-/,' ')
      let indexDash = dog.indexOf(' ')
      dog = dog.replace(dog.charAt(0), dog.charAt(0).toUpperCase())
      if(indexDash) {
        dog = dog.replace(dog.charAt(indexDash+1), dog.charAt(indexDash+1).toUpperCase())
      }
      return dog
    }
    return (
            <View style={styles.container}>
              {ready?(<ImageBackground source={{'uri': mainStore.currentPicture[selected].newUrl}} style={{width: '100%', height: '100%'}} blurRadius={1}>
                <View style={styles.containerNonFlex}>
                  {(mainStore.currentPicture.length>1)?(<Picker
                    selectedValue={(this.state && this.state.selected) || '0'}
                    style={{backgroundColor:'#ffffff80'}}
                    mode="dropdown"
                    onValueChange={(value) => this.setState({ selected: value })}>
                    {mainStore.currentPicture.map((pic,key) =>{
                      return (
                        <Picker.Item key={key} label={`${(key+1)}.${shorther(pic.newUrl)}`} value={key} />
                      )
                    })}
                  </Picker>):<Text style={{backgroundColor:'#ffffff80', fontSize: 16, padding: 12 }}>{`${shorther(mainStore.currentPicture[0].newUrl)}`}</Text>}
                  <TouchableOpacity onPress={this._getNewPicture}>
                    <Image style={{width: screenWidth, height: (screenWidth*0.75), resizeMode: 'stretch', }}
                           source={{'uri': mainStore.currentPicture[selected].newUrl}}/>
                    <Text style={{ fontWeight:'bold', textAlign: 'center', backgroundColor:'#ffffff80'}}>Get a new picture!</Text>
                  </TouchableOpacity>

                </View>
              </ImageBackground>)
              :
              (<AppLoading
                  startAsync={this._getNewPicture}
                  onFinish={() => this.setState({ ready: true })}
                  onError={console.warn}
                />)}
          </View>
    );
  }
}

const styles = StyleSheet.create({
  stretch: {
  width: screenWidth,
  height: screenHeight,
  resizeMode: 'stretch'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerNonFlex: {
    justifyContent: 'center',
    marginTop: screenHeight/4
  },
});
const getPropsFromStore = state => ({
  imgs: state.imgs
})
export default connect(getPropsFromStore)(Main)
