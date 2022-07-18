import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

interface ContainerProps {
  isFocused: boolean;
}

interface ButtonProps {
  children: React.ReactNode;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;

  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`;

export const IconContainer = styled.View`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;

  margin-right: 2px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const InputText = styled.TextInput`
  flex: 1;

  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};

  padding: 0 23px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)<ButtonProps>``;
