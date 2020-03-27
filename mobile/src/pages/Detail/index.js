import React from 'react';
import {View,Image,TouchableOpacity,Text,Linking} from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import style from './styles.js';
import LogoImg from '../../assets/logo.png';

export default function Detail(){
  const Route = useRoute();
  const incident = Route.params.incident;
  const message = `Hi ${incident.name} , I'm contacting you because i want to help you to solve your case about the "${incident.title}" case with the reward value of: ${Intl.NumberFormat('eng-US',{style:'currency',currency:'USD'}).format(incident.value)} that was published on the Be The Hero platform`;
  const navigation = useNavigation();
  function NavigateBack(){
    navigation.goBack();
  };
  function sendMail(){
    MailComposer.composeAsync({
      subject: `heroi do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  };
  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  };
  
  return(
    <View style={style.DetailContainer}>
      <View style={style.header}>          
        <Image source={LogoImg}/>
        <TouchableOpacity onPress={NavigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041"/>
        </TouchableOpacity>
      </View>
      <View style={style.incident}>
        <Text style={style.IncidentProperty,{marginTop:0}}>NGO</Text>
        <Text style={style.IncidentValue}>{incident.name} From {incident.city} / {incident.UF}</Text>
        <Text style={style.IncidentProperty}>Case</Text>  
        <Text style={style.IncidentValue}>{incident.title}</Text>
        <Text style={style.IncidentProperty}>Reward Value</Text>
        <Text style={style.IncidentValue}>{Intl.NumberFormat('eng-US',{style:'currency', currency:'USD'}).format(incident.value)}</Text>
      </View>
      <View style={style.contactBox}>
        <Text style={style.HeroTitle}>
          Save the day and become 
        </Text>
        <Text style={style.HeroTitle}>
          the hero of this case.
        </Text>
        <Text style={style.HeroDescription}>
          Contact:
        </Text>
        <View style={style.actions}>
          <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
            <Text style={style.actionText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.action} onPress={sendMail}>
            <Text style={style.actionText}>email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}