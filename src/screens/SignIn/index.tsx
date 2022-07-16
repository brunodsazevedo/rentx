import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import {
  Container,
  Header,
  SubTitle,
  Form,
  Title,
  Footer,
} from './styles';

export function SignIn() {
  const theme = useTheme();
  
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <Title>
          Estamos {'\n'}
          quase lá.
        </Title>

        <SubTitle>
          Faça seu login para começar {'\n'}
          uma experiência incrível.
        </SubTitle>
      </Header>

      <Form>
        <Input
          placeholder="E-mail"
          iconName="mail"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        />

        <PasswordInput
          iconName="lock"
          placeholder="Senha"
        />
      </Form>

      <Footer>
        <Button
          title="Login"
          enabled={false}
          loading={false}
          onPress={() => {}}
        />

        <Button
          title="Criar conta gratuita"
          color={theme.colors.background_secondary}
          light
          enabled={false}
          loading={false}
          onPress={() => {}}
        />
      </Footer>
    </Container>
  );
}
