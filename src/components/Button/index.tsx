import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Title,
} from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  enable?: boolean;
  loading?: boolean;
}

export function Button({
  title,
  color,
  enable = true,
  loading = false,
  ...rest
}: Props) {

  const theme = useTheme();

  return(
    <Container
      color={color ? color : theme.colors.main}
      enabled={enable}
      style={{ opacity: (enable === false || loading === true ) ? 0.5 : 1 }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={theme.colors.shape}
        />
      ) : (
        <Title>
          {title}
        </Title>
      )}
    </Container>
  );
}
