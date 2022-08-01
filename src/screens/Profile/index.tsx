import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/auth';

interface NavigationProps {
  goBack: () => void;
}

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles';

export function Profile() {
  const { user, signOut, updatedUser } = useAuth();

  const [ option, setOption ] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [ avatar, setAvatar ] = useState(user.avatar);
  const [ name, setName ] = useState(user.name);
  const [ driverLicense, setDriverLicense ] = useState(user.driver_license);

  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {
    Alert.alert(
      'Tem certeza?',
      'Se você sair irá precisar de internet para conectar-se novamente.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
        },
        {
          text: 'Sair',
          onPress: () => signOut(),
        },
      ]
    );
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected);
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if(result.cancelled) {
      return;
    }

    if(result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdated() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
        .required('CNH é obrigatório'),
        name: Yup.string()
        .required('Nome né obrigatório')
      });

      const data = { name, driverLicense };
      await schema.validate(data);

      await updatedUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token,
      });

      Alert.alert('Perfil atualizado!');
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Não foi possível atualizar o perfil');
      }
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton
                color={theme.colors.shape}
                onPress={handleBack}  
              />

              <HeaderTitle>Editar Perfil</HeaderTitle>
              
              <LogoutButton onPress={handleSignOut}>
                <Feather
                  name="power"
                  size={24}
                  color={theme.colors.shape}
                />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {
                !!avatar && <Photo source={{ uri: avatar }} />
              }
              <PhotoButton onPress={handleSelectAvatar}>
                <Feather
                  name="camera"
                  size={24}
                  color={theme.colors.shape}
                />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>
                  Dados
                </OptionTitle>
              </Option>  
            
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {
              option === 'dataEdit' ? (
                <Section>
                  <Input
                    iconName="user"
                    placeholder="Nome"
                    autoCorrect={false}
                    value={name}
                    onChangeText={setName}
                    defaultValue={user.name}
                  />

                  <Input
                    iconName="mail"
                    editable={false}
                    defaultValue={user.email}
                  />

                  <Input
                    iconName="credit-card"
                    placeholder="CNH"
                    keyboardType="number-pad"
                    value={driverLicense}
                    onChangeText={setDriverLicense}
                    defaultValue={user.driver_license}
                  />
                </Section>
              ) : (
                <Section>
                  <PasswordInput
                    iconName="lock"
                    placeholder="Senha atual"
                  />

                  <PasswordInput
                    iconName="lock"
                    placeholder="Nova senha"
                  />

                  <PasswordInput
                    iconName="lock"
                    placeholder="Repetir senha"
                  />
                </Section>
              )
            }

            <Button
              title="Salvar alterações"
              onPress={handleProfileUpdated}
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
