import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import Logo from '../../assets/logo.svg';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton,
} from './styles';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

type RouteNameType = {
  navigate: (screen: string, params?: any) => void;
}

export function Home() {
  const [ cars, setCars ] = useState<CarDTO[]>([]);
  const [ loading, setLoading ] = useState(true);

  const navigation = useNavigation<RouteNameType>();
  const theme = useTheme();

  function handleCarDetails (car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars () {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            height={RFValue(12)}
            width={RFValue(108)}
          />

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      {loading
        ? <Load />
        : (
          <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Car
                data={item}
                onPress={() => handleCarDetails(item)}
              />
            )}
          />
        )
      }

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons
          name="ios-car-sport"
          size={32}
          color={theme.colors.shape}
        />
      </MyCarsButton>
    </Container>
  );
}
