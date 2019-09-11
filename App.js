import React,{Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Picker, Dimensions } from 'react-native';
import RNShake from 'react-native-shake';
import {Provider} from 'react-redux'
import store from './src/redux/store'
import { updateCurrent } from './src/redux/actions'
const screenWidth = Math.round(Dimensions.get('window').width);

export default class App extends Component {
  state = {
    ready: false,
    selected:'0'
  }
  componentDidMount() {
      this._getNewPicture()
  }
  _getNewPicture =  async() => {
    this.setState({ready:false})
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    const json = await response.json()
    store.dispatch(updateCurrent({newUrl: json.message}))
    const mainStore = store.getState()
    this.setState({ready:true, selected: (mainStore.currentPicture.length-1)})

  }
  render(){
    const {ready,selected} = this.state
    const mainStore = store.getState()
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <View>
            {ready?
              (
                <View>
                  <Picker
                    selectedValue={(this.state && this.state.selected) || '0'}
                    style={{marginTop:20}}
                    mode="dropdown"
                    onValueChange={(value) => this.setState({ selected: value })}>
                    {mainStore.currentPicture.map((pic,key) =>{
                      return (
                        <Picker.Item key={key} label={`${(key+1)}.${pic.newUrl}`} value={key} />
                      )
                    })}
                  </Picker>
                  <TouchableOpacity onPress={this._getNewPicture}>
                    <Image style={{width: screenWidth, height: (screenWidth*0.75)}} source={{'uri': mainStore.currentPicture[selected].newUrl}} />
                    <Text style={{ fontWeight:'bold',  }}>Get a new picture!</Text>
                  </TouchableOpacity>

                </View>):(<Text>Getting Ready!</Text>)}
          </View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
