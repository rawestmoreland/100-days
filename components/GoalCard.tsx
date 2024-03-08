import Colors from '@/constants/Colors';
import { Goal, Progress } from '@/watermelon/models';
import { withObservables } from '@nozbe/watermelondb/react';
import { router } from 'expo-router';
import { useMemo } from 'react';

import { Platform, StyleSheet, View } from 'react-native';
import { Text, Card } from 'react-native-paper';

const GoalCard = ({
  goal,
  progresses,
}: {
  goal: Goal;
  progresses: Progress[];
}) => {
  const createdAt = useMemo(() => {
    const dateOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };

    // @ts-ignore
    return new Date(goal.createdAt).toLocaleDateString('en-US', dateOptions);
  }, [goal.createdAt]);

  return (
    <>
      <Card
        onPress={() =>
          router.navigate({
            pathname: `/${goal.id}`,
            params: { description: goal.description, goal },
          })
        }
        mode='contained'
        style={[styles.boxShadow, styles.outerCard]}
      >
        <Card.Title
          style={{ marginBottom: 8 }}
          titleVariant='headlineLarge'
          titleStyle={{ color: Colors.brand.charcoal, fontWeight: '600' }}
          title={goal.title}
          subtitleStyle={{ color: Colors.brand.charcoal }}
        />
        <Card.Content style={{ marginBottom: 8 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={[styles.boxShadow, styles.innerCard]}>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{ color: Colors.brand.charcoal, fontWeight: '800' }}
                >
                  Progress:
                </Text>
                <Text style={{ color: Colors.brand.charcoal }}>
                  {`${Math.floor((progresses.length / 100) * 100)} %`}
                </Text>
              </View>
            </View>
            <View style={[styles.boxShadow, styles.innerCard]}>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{ color: Colors.brand.charcoal, fontWeight: '800' }}
                >
                  Updated:
                </Text>
                <Text style={{ color: Colors.brand.charcoal }}>
                  {createdAt}
                </Text>
              </View>
            </View>
            <View style={[styles.boxShadow, styles.innerCard]}>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{ color: Colors.brand.charcoal, fontWeight: '800' }}
                >
                  Created:
                </Text>
                <Text style={{ color: Colors.brand.charcoal }}>
                  {createdAt}
                </Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </>
  );
};

const enhance = withObservables(['goal'], ({ goal }) => ({
  goal,
  progresses: goal.progresses,
}));

const EnhancedGoalCard = enhance(GoalCard);

export default EnhancedGoalCard;

const styles = StyleSheet.create({
  outerCard: {
    borderWidth: 2,
    backgroundColor: Colors.brand.powderBlue,
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  innerCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.brand.serenade,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  },
  boxShadow: {
    shadowColor: Colors.brand.charcoal,
    shadowOffset: Platform.OS === 'ios' ? { width: 3, height: 3 } : undefined,
    shadowOpacity: Platform.OS === 'ios' ? 1 : undefined,
    shadowRadius: Platform.OS === 'ios' ? 0 : undefined,
  },
});
