import React, { useState } from 'react';
import { StatusBar, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

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
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const theme = useTheme();
  
  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('A senha é obrigatória')
      });
  
      await schema.validate({ email, password })
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credencias'
        );
        return;
      }

    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="position"
        enabled
      >
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
              value={email}
              onChangeText={setEmail}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              enabled={true}
              loading={false}
              onPress={handleSignIn}
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
