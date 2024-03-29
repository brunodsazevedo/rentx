import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDatesProps
} from '../../components/Calendar';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

import ArrowSvg from '../../assets/arrow.svg';
import { getPlatformDate } from '../../utils/getPlatformDate';

import { CarDTO } from '../../dtos/CarDTO';

type RouteNameType = {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
}

interface Params {
  car: CarDTO
}

interface RentalPeriod {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
}

export function Scheduling() {
  const [ lastSelectedDate, setLastSelectedDate ] = useState<DayProps>({} as DayProps);
  const [ markedDates, setMarkedDates ] = useState<MarkedDatesProps>({} as MarkedDatesProps);
  const [ rentalPeriod, setRentalPeriod ] = useState<RentalPeriod>({} as RentalPeriod);

  const navigation = useNavigation<RouteNameType>();
  const route = useRoute();
  const { car } = route.params as Params;
  const theme = useTheme();

  function handleConfirmRental() {
    if(!rentalPeriod.start || !rentalPeriod.end) {
      Alert.alert('Selecione o intervalo para alugar');
      return;
    }

    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  }

  return(
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <BackButton
          color={theme.colors.shape}
          onPress={handleBack}
        />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÈ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>
      
      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enable={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
}
