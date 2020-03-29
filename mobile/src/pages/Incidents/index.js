import React, { useEffect, useState} from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, FlatList, Text, View, Image } from 'react-native';

import api from '../../services/api';

import logoImage from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {

  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const incidentsPerPage = 5;

  function navigateToDetail(incident){
    navigation.navigate('Detail', {incident});
  }

  async function loadIncidents(){
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);
    const response = await api.get('incidents', {
      params: {page}
    });
    const newIncidents = response.data.filter(responseItem => !incidents.find(i => responseItem.id === i.id));
    
    setIncidents([...incidents, ...newIncidents]);
    setTotal(response.headers['x-total-count']);
    if (response.data.length > 0){
      if (response.data.length % incidentsPerPage === 0){
        setPage(page + 1);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logoImage} />
          <Text style={styles.headerText}>
            Total de <Text style={styles.headerTextBold}>{total} casos</Text>
          </Text>
        </View>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

        <FlatList
          style={styles.incidentList}
          data={incidents}
          keyExtractor={incident => String(incident.id)}
          showsVerticalScrollIndicator={false}
          onEndReached={loadIncidents}
          onEndReachedThreshold={0.2}
          renderItem={({item: incident}) => (
            <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG:</Text>
              <Text style={styles.incidentValue}>{incident.ong_name}</Text>
  
              <Text style={styles.incidentProperty}>CASO:</Text>
              <Text style={styles.incidentValue}>{incident.title}</Text>
  
              <Text style={styles.incidentProperty}>Valor:</Text>
              <Text style={styles.incidentValue}>
                {Intl.NumberFormat('pt-BR', 
                  {style: 'currency', currency: 'BRL'})
                  .format(incident.value)}
               </Text>
  
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigateToDetail(incident)}>
                  
                  <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                  <Feather name="arrow-right" size={16} color="#e02041"/>
              </TouchableOpacity>
  
            </View>
          )}
        />
      </View>
    );
  }

  