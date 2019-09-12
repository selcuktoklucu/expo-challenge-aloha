import React,{Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Picker, Dimensions,ImageBackground } from 'react-native';
import {Provider} from 'react-redux'
import store from './src/redux/store'
const bckImage = require('./pizza_background.png')
import { updateCurrent } from './src/redux/actions'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class App extends Component {
  // constructor(){
  //   super()
  //   this.backGround = this.backGround.bind(this)
  // }
  state = {
    ready: false,
    selected:'0'
  }
  componentDidMount() {
      this._getNewPicture()
  }

  _loadAsync = async () => {
    await Promise.all([
      this._getNewPicture(),
      this._loadPic()
    ])
  }

  _getNewPicture =  async() => {
    this.setState({ready:false})
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    const json = await response.json()
    store.dispatch(updateCurrent({newUrl: json.message}))
    const mainStore = store.getState()
    this.setState({ready:true, selected: (mainStore.currentPicture.length-1)})

  }
  // _getNewPicture () {
  //   //this.setState({ready:false})
  //   fetch('https://dog.ceo/api/breeds/image/random')
  //     .then(res => res.json())
  //     .then((data) =>{
  //       store.dispatch(updateCurrent({newUrl: data.message}))
  //       const mainStore = store.getState()
  //       this.setState({ready:true, selected: (mainStore.currentPicture.length-1)})
  //
  //     })
  // }

  backGround () {
    const mainStore = store.getState()
    console.log(mainStore)
    if(mainStore.currentPicture.length>0){
      return {uri: mainStore.currentPicture[this.state.selected].newUrl}
    } else{
      return bckImage
    }

  }
  render(){
    const {ready,selected} = this.state
    const mainStore = store.getState()
    return (
      <Provider store={store}>

            <View style={styles.container}>
              {ready?(<ImageBackground source={{'uri': mainStore.currentPicture[selected].newUrl}} style={{width: '100%', height: '100%'}} blurRadius={1}>


                <View style={styles.containerNonFlex}>
                  <Picker
                    selectedValue={(this.state && this.state.selected) || '0'}
                    style={{backgroundColor:'#ffffff80'}}
                    mode="dropdown"
                    onValueChange={(value) => this.setState({ selected: value })}>
                    {mainStore.currentPicture.map((pic,key) =>{
                      return (
                        <Picker.Item key={key} label={`${(key+1)}.${pic.newUrl}`} value={key} />
                      )
                    })}
                  </Picker>
                  <TouchableOpacity onPress={this._getNewPicture}>
                    <Image style={{width: screenWidth, height: (screenWidth*0.75), resizeMode: 'stretch'}} source={{'uri': mainStore.currentPicture[selected].newUrl}} />
                    <Text style={{ fontWeight:'bold',  }}>Get a new picture!</Text>
                  </TouchableOpacity>

                </View>
              </ImageBackground>)
              :
              (<ImageBackground source={this.backGround(this)} style={{width: '100%', height: '100%'}} blurRadius={1}></ImageBackground>)}
          </View>
      </Provider>
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
