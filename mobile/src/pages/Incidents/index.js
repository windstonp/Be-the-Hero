import React,{useEffect,useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {View,FlatList,Text,Image,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Api from "../../services/api";
import logoImg from '../../assets/logo.png';
import style from './styles';
export default function Incidents(){
  const navigation = useNavigation();
  const [incidents,SetIncidents] = useState([]); 
  const [TotalItems,SetTotalItems] = useState(0);
  const [page,SetPage] = useState(1);
  const [Loading, SetLoading] = useState(false);
  async function LoadIncidents(){
    if(Loading){
      return;
    }
    if(TotalItems > 0 && incidents.length === TotalItems){
      return;
    }
    SetLoading(true);
    const response = await Api.get(`/incidents`,{params:{page}})
    SetIncidents([... incidents, ... response.data]);
    SetTotalItems(response.headers['x-total-count']);
    SetPage(page + 1);
    SetLoading(false);
  }
  useEffect(()=>{
    LoadIncidents();
  },[]);
  function NavigateToDetail(incident){
    navigation.navigate('Detail',{incident});
  }
  return(
      <View style={style.container}>
        <View style={style.header}>
          <Image source={logoImg}/>
          <Text style={style.headerText}>
            total cases: <Text style={style.headerTextBold}>{TotalItems}</Text>
          </Text>
        </View>
        <Text style={style.title}>
          Welcome!
        </Text>
        <Text style={style.description}>
          Select one of the cases and save the day. 
        </Text>
        <FlatList
          style={style.incidentList}
          data={incidents}
          showsVerticalScrollIndicator = {false}
          onEndReached={LoadIncidents}
          onEndReachedThreshold={0.3}
          keyExtractor ={incident=>String(incident.id)}
          renderItem={({item: incident})=>(
            <View style={style.incident}>
              <Text style={style.IncidentProperty}>NGO</Text>
              <Text style={style.IncidentValue}>{incident.name}</Text>
              <Text style={style.IncidentProperty}>Case</Text>
              <Text style={style.IncidentValue}>{incident.title}</Text>
              <Text style={style.IncidentProperty}>Reward Value</Text>
              <Text style={style.IncidentValue}>
                {
                  Intl.NumberFormat(
                    'en-US',
                    {style:'currency', 
                    currency: 'USD'}
                  ).format(incident.value)
                }
              </Text>
              <TouchableOpacity style={style.DetailsButton} onPress={()=>NavigateToDetail(incident)}>
                <Text style={style.DetailsButtonText}>Details</Text>
                <Feather name='arrow-right' size={16} color='#e02041'/>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
  );
} 