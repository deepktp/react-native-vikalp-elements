import React from 'react';
import { View, ScrollView } from 'react-native';
import { SocialIcon, SocialIconProps } from '@rn-vui/themed';
import { Header } from '../components/header';
import { SocialMediaType } from '@rn-vui/themed';
import _ from 'lodash';

type IconData = {
  type: SocialMediaType;
  iconType: string;
};

const dataList: Partial<IconData>[] = [
  {
    type: 'facebook',
  },
  {
    type: 'twitter',
  },
  {
    type: 'google-plus-official',
  },
  {
    type: 'google',
  },
  {
    type: 'pinterest',
  },
  {
    type: 'linkedin',
  },
  {
    type: 'youtube',
  },
  {
    type: 'vimeo',
  },
  {
    type: 'tumblr',
  },
  {
    type: 'instagram',
  },
  {
    type: 'quora',
  },
  {
    type: 'flickr',
  },
  {
    type: 'foursquare',
  },
  {
    type: 'wordpress',
  },
  {
    type: 'stumbleupon',
  },
  {
    type: 'github',
  },
  {
    type: 'github-alt',
  },
  {
    type: 'microsoft',
    iconType: 'material-community',
  },
  {
    type: 'twitch',
  },
  {
    type: 'medium',
  },
  {
    type: 'soundcloud',
  },
  {
    type: 'stack-overflow',
  },
  {
    type: 'gitlab',
  },
  {
    type: 'angellist',
  },
  {
    type: 'codepen',
  },
  {
    type: 'weibo',
  },
  {
    type: 'vk',
  },
  {
    type: 'facebook-messenger',
    iconType: 'material-community',
  },
  {
    type: 'whatsapp',
  },
];

type SocialIconsComponentProps = {};

const SocialIcons: React.FunctionComponent<SocialIconsComponentProps> = () => {
  const socialProps = {};
  return (
    <>
      <Header title="Social Icons" view="social_icon" />
      <ScrollView>
        {_.chunk(dataList, 3).map(
          (chunk: Partial<IconData>[], chunkIndex: React.Key) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
                backgroundColor: '#4c4c4c',
              }}
              key={chunkIndex}
            >
              {chunk.map((l: Partial<IconData>, i: React.Key) => (
                <SocialIcon
                  {...(socialProps as SocialIconProps)}
                  type={l.type}
                  iconType={l.iconType ? l.iconType : 'font-awesome'}
                  key={`${chunkIndex}-${i}`}
                />
              ))}
            </View>
          )
        )}
      </ScrollView>
    </>
  );
};

export default SocialIcons;
