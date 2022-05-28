import React from 'react';
import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';

import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

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

export function Scheduling() {
  const theme = useTheme();
  
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
        />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false} />
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÈ</DateTitle>
            <DateValue selected={false} />
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>
      
      <Footer>
        <Button
          title="Confirmar"
        />
      </Footer>
    </Container>
  );
}
