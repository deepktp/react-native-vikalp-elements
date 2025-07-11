import React from 'react';
import { ScrollView } from 'react-native';
import colors from '../config/colors';
import { Header } from '../components/header';
import { PricingCard } from '@rn-vui/themed';

type PricingCardComponentProps = {};

const Pricing: React.FunctionComponent<PricingCardComponentProps> = () => {
  return (
    <>
      <Header title="Pricing" view="pricing" />
      <ScrollView>
        <PricingCard
          color={colors.primary}
          title="Free"
          price="$0"
          info={['1 User', 'Basic Support', 'All Core Features']}
          button={{ title: ' GET STARTED', icon: 'flight-takeoff' }}
        />
        <PricingCard
          color={colors.secondary}
          title="Starter"
          price="$19"
          info={['10 Users', 'Basic Support', 'All Core Features']}
          button={{ title: ' GET STARTED', icon: 'flight-takeoff' }}
        />
        <PricingCard
          color={colors.secondary2}
          title="Enterprise"
          price="$49"
          info={['100 Users', 'One on One Support', 'All Core Features']}
          button={{ title: ' GET STARTED', icon: 'flight-takeoff' }}
        />
      </ScrollView>
    </>
  );
};

export default Pricing;
