import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,FlatList,TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';



   const OPTIONS = [
  {id:'1', label: 'Enable Notification'},
  {id:'2', label: 'In app Notification'},
  {id:'3',label: 'Email'}, 
  ];


export default function App() {

  const [isChecked,setChecked] = useState(false);
  const [isChecked2,setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isChecked4, setChecked4] = useState(false);
  const [isChecked5, setChecked5] = useState(false);
  const [isChecked6, setChecked6] = useState(false);
  const [isChecked7, setChecked7] = useState(false);
  const [isChecked8, setChecked8] = useState(false);
  const [isChecked9, setChecked9] = useState(false);

  

/*This is the title for the settings.*/ 
  return (
    <View style={styles.container}>



          <View style = {{padding:-5}}>
            <Text style={styles.Toptext}>
        <Text style = {styles.LeftText } > Notification {"\t\t"} {"\t\t"} </Text>
        <Text style = {styles.RightText} > {"\t\t"} {"\t\t"} {"\t\t"} {"\t\t"} Account {"\t\t"}  {"\t\t"} </Text>
        <Text> {"\t\t"} {"\t\t"} {"\t\t"} Preference </Text>
        </Text>

        
        <Text style = {styles.textinputs}> {"\n"} Username {"\n"} </Text>
                  <TextInput style={styles.textinput} />

                  <Text style =  {styles.textinputs} > {"\n"} Email address {"\n"} </Text>

                  <TextInput style={styles.textinput} />

                  <Text style =  {styles.textinputs} >  {"\n"} Password {"\n"} </Text>

                  <TextInput style={styles.textinput} />


             



            </View>
      
              <View style = {styles.row}>
                   <Checkbox value={isChecked} onValueChange={setChecked}  />
                    <Text> Enable Notification </Text>

                  <View style = {styles.bolder}>
                    <Text> {"\n"} Receive Alerts :  {"\n"} </Text>
                    </View>  
      
             <Checkbox value={isChecked2} onValueChange={setChecked2} />
                  <Text> In app Notification  {"\n"} </Text>

            

            <Checkbox value={isChecked3} onValueChange={setChecked3} />
                  <Text> Email Notification  {"\n"} </Text>

              </View>


              <View style={styles.row}>
                <Checkbox value={isChecked6} onValueChange={setChecked6} />
                <Text> Ebay </Text>

                <Checkbox value = {isChecked7} onValueChange={setChecked7} />
                  <Text> Etsy   </Text>

                <Text> Wadrobes </Text>

                <Checkbox value = {isChecked8} onValueChange={setChecked8} />
                  <Text> Borrow </Text>

                   <Checkbox value = {isChecked4} onValueChange={setChecked4} />
                  <Text> Swap </Text>

                   <Checkbox value = {isChecked5} onValueChange={setChecked5} />
                  <Text> Rent </Text>


              </View>

            
            
            
            <View>        
      <StatusBar style="auto" />
    </View>
              
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
  
  },
    Toptext: {
    fontSize: 20,
    // Optional: for Android, to ensure text within the Text component itself is aligned to the bottom
    textAlignVertical: 'upper',
    height: 300,
  },
  row:{
    flexDirection: 'vertical',
    alignItems: 'center', 

    right: 500,
  },
  
  bolder:{
    fontWeight: 'bolder',


  },
  textinput :{
    borderWidth:1,
    borderColor:'#777',
    padding: 4,
    margin: 1,
    left: 200,
  },
  textinputs:{
    left: 200,
    margin: 1,

  }

  

 

 


});
