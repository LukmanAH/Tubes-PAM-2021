import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native'

const Favorit = ({ navigation }) => {

  const goToHome = () => {
    navigation.navigate('home')
  }

  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <View style={styles.navView}>

        <TouchableOpacity
          style={styles.buttonNavigation}
          onPress={goToHome}
        >
          <Text>Back</Text>
        </TouchableOpacity>

        <View style={styles.titlePageView}>
          <Text>Favorite Pokemon</Text>
        </View>

      </View>
      <ListFavorite />
    </View >
  );
}

class ListFavorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      listData: [],
    };
    this.url = "http://localhost/api/api.php";
  }

  componentDidMount() {
    this.ambilListData()
  }

  async ambilListData() {
    await fetch(this.url)
      .then((response) => response.json())
      .then((json) => {
        console.log('Hasil yang didapat: ' + JSON.stringify(json.data.result));
        this.setState({ listData: json.data.result });
      })
      .catch((error) => {
        console.log(error);
      })
  }


  async klikName(id) {
    navigation.navigate('home');
    searchPokemon();
  }

  async klikDelete(id) {
    await fetch(this.url + "/?op=delete&id=" + id)
      .then((response) => response.json())
      .then((json) => {
        alert('Data berhasil didelete');
        this.ambilListData();
      })
      .catch((error) => {
        console.log(error)
      })
  }



  render() {
    return (
      <View style={styles.viewWrapper}>
        <View style={styles.viewData}>
          {
            this.state.listData.map((val, index) => (
              <View style={styles.viewList} key={index}>
                <Text style={styles.textListNama} onPress={() => this.klikName(val.nama)}> {val.nama}</Text>
                <Text style={styles.textListDelete} onPress={() => this.klikDelete(val.id)}>Delete</Text>
              </View>
            ))
          }



        </View>
      </View>
    );
  }
}

export default Favorit;


const styles = StyleSheet.create({
  viewWrapper: {
    flex: 11,
    backgroundColor: 'lightblue'
  },
  viewForm: {
    flex: 2,
    padding: 10
  },
  viewData: {
    flex: 4
  },
  textInput: {
    padding: 10,
    fontSize: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 10,
    backgroundColor: '#dedede'
  },
  viewList: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',

  },
  textListNama: {
    flex: 3,
    fontSize: 20,
    fontWeight: 'bold'
  },

  textListDelete: {
    marginHorizontal: 5,
    color: 'white',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'black',
    backgroundColor: 'red',
  },


  navView: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'red',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  buttonNavigation: {
    backgroundColor: 'yellow',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    fontWeight: 'bold',
  },

  titlePageView: {
    flex: 5,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
})
