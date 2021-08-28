import React, { useState } from 'react';
import { RectButton } from 'react-native-gesture-handler';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';

import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';

import { style } from './style';
import { theme } from '../../global/styles/theme';
import {
  Text,
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export function AppointmentCreate() {
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  function handleOpenGuilds() {
    setOpenGuildsModal(true);
  }

  function handleCloseGuilds() {
    setOpenGuildsModal(false);
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setGuild(guildSelect);
    setOpenGuildsModal(false);
  }

  // Efeito de marcar e desmarcar o CardCategory
  function hadleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={style.container}
    >
      <ScrollView>
        <Background>
          <Header title="Agendar partida" />

          <Text
            style={[
              style.label,
              { marginLeft: 24, marginTop: 36, marginBottom: 18 },
            ]}
          >
            Categoria
          </Text>

          <CategorySelect
            hashCheckBox
            setCategory={hadleCategorySelect}
            categorySelected={category}
          />

          <View style={style.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={style.select}>
                {guild.icon ? <GuildIcon /> : <View style={style.image} />}

                <View style={style.selectBody}>
                  <Text style={style.label}>
                    {guild.name ? guild.name : 'Selecione um servidor'}
                  </Text>
                </View>

                <Feather
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={style.field}>
              <View>
                <Text style={[style.label, { marginBottom: 12 }]}>
                  Dia e mês
                </Text>

                <View style={style.column}>
                  <SmallInput maxLength={2} />
                  <Text style={style.divider}>/</Text>
                  <SmallInput maxLength={2} />
                </View>
              </View>

              <View>
                <Text style={[style.label, { marginBottom: 12 }]}>
                  Hora e minuto
                </Text>

                <View style={style.column}>
                  <SmallInput maxLength={2} />
                  <Text style={style.divider}>:</Text>
                  <SmallInput maxLength={2} />
                </View>
              </View>
            </View>

            <View style={[style.field, { marginBottom: 12 }]}>
              <Text style={style.label}>Descrição</Text>

              <Text style={style.caracteresLimit}>Max 100 caracteres</Text>
            </View>

            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
            />

            <View style={style.footer}>
              <Button title="Agendar" activeOpacity={0.7} />
            </View>
          </View>
        </Background>
      </ScrollView>

      <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}
