import React, { useState, useEffect } from 'react';
import { StatusBar, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { database } from '../../database';

import {
  Container,
  Header,
  SubTitle,
  Form,
  Title,
  Footer,
} from './styles';

interface NavigationProps {
  navigate: (screen: string) => void;
}

export function SignIn() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();
  const { signIn } = useAuth();
  
  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('A senha é obrigatória')
      });
  
      await schema.validate({ email, password });

      await signIn({ email, password });
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

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

  useEffect(() => {
    async function loadData() {
      const usersCollection = database.get('users');
      const users = await usersCollection.query().fetch();
      console.log(users);
      
    }
  }, [])

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
              onPress={handleNewAccount}
            />
          </Footer>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
