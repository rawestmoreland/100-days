import { View } from 'react-native';
import { Portal, Modal, Text, Button, TextInput } from 'react-native-paper';
import Colors from '@/constants/Colors';
import { useForm, Controller } from 'react-hook-form';
import { InputError } from '../Forms/InputError';
import { Progress } from '@/watermelon/models';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export function EditProgressModal({
  visible,
  handleEditProgress,
  handleClose,
  progress,
}: {
  visible: boolean;
  handleEditProgress: (data: any) => Promise<void>;
  handleClose: () => void;
  progress?: Progress | null;
}) {
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      progressDescription: progress?.description,
    },
  });

  const completedDate = useMemo(() => {
    if (!progress) return '';

    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };

    // @ts-ignore
    return new Date(progress.lastLoggedAt).toLocaleDateString('en-US', options);
  }, [progress]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => {
          form.reset({ progressDescription: '' });
          handleClose();
        }}
        contentContainerStyle={{
          backgroundColor: Colors.brand.cream,
          padding: 20,
          marginHorizontal: 20,
          borderRadius: 8,
        }}
      >
        <View style={{ position: 'relative', justifyContent: 'space-between' }}>
          <Text
            variant='titleLarge'
            style={{ color: Colors.brand.charcoal, fontWeight: '600' }}
          >
            {t('updateYourProgress')}
          </Text>
          <Text>
            {t('completedDate', {
              date: completedDate,
              interpolation: {
                escapeValue: false,
              },
            })}
          </Text>
          <View style={{ gap: 4, marginVertical: 16 }}>
            <View>
              <Controller
                control={form.control}
                rules={{
                  required: false,
                  max: {
                    value: 160,
                    message: t('formValidation.maxLength', { count: 160 }),
                  },
                }}
                name='progressDescription'
                render={({ field }) => (
                  <TextInput
                    mode='outlined'
                    multiline
                    returnKeyLabel='done'
                    returnKeyType='done'
                    label={t('description')}
                    onBlur={field.onBlur}
                    placeholder={t('descriptionOptional')}
                    outlineStyle={{
                      borderWidth: 2,
                      borderColor: Colors.brand.charcoal,
                    }}
                    blurOnSubmit
                    value={field.value}
                    onChangeText={field.onChange}
                    activeOutlineColor={Colors.brand.charcoal}
                    error={Boolean(
                      form.formState.errors.progressDescription?.message
                    )}
                    textColor={Colors.brand.charcoal}
                    style={{
                      verticalAlign: 'top',
                      backgroundColor: Colors.brand.cream,
                      minHeight: 100,
                    }}
                  />
                )}
              />
              {form.formState.errors.progressDescription && (
                <InputError
                  message={
                    form.formState.errors.progressDescription.message?.toString() ??
                    t('error')
                  }
                />
              )}
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button
              style={{
                borderColor: Colors.brand.charcoal,
                borderWidth: 2,
                borderRadius: 4,
                shadowColor: Colors.brand.charcoal,
                shadowOpacity: 1,
                shadowOffset: { width: 2, height: 2 },
              }}
              buttonColor={Colors.brand.primary}
              textColor={Colors.brand.charcoal}
              compact
              mode='outlined'
              onPress={form.handleSubmit(handleEditProgress)}
            >
              {t('update')}
            </Button>
            <Button
              textColor={Colors.brand.charcoal}
              buttonColor={Colors.brand.pictonBlue}
              style={{
                borderRadius: 4,
                borderWidth: 2,
                borderColor: Colors.brand.charcoal,
                shadowColor: Colors.brand.charcoal,
                shadowOpacity: 1,
                shadowOffset: { width: 2, height: 2 },
              }}
              compact
              mode='outlined'
              onPress={() => {
                handleClose();
              }}
            >
              {t('close')}
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
