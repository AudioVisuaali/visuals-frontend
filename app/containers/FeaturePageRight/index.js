/**
 *
 * FeaturePageRight
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Chat from 'containers/Chat';
import Viewers from 'containers/Viewers';
import {
  makeSelectCurrentUser,
  makeSelectCurrentlyPlaying,
} from 'containers/WebSocket/selectors';
import {
  emitRoomMessage,
  emitUserChangeUsername,
} from 'containers/WebSocket/actions';
import ChatTextField from 'components/ChatTextField';
import TwitchChat from 'components/TwitchChat';

import Header from './styles/Header';
import Wrapper from './styles/Wrapper';
import ChatFieldContainer from './styles/ChatFieldContainer';
import ChatSelector from './ChatSelector';
import HiddableContainer from './styles/HiddableContainer';

const MATCH_TWITCH_CHANNEL_URL = /(?:www\.|go\.)?twitch\.tv\/([a-z0-9_]+)($|\?)/;

const FeaturePageRight = ({
  currentlyPlaying,
  currentUser,
  sendMessage,
  changeName,
  isMobile,
}) => {
  const [chatChannel, setChatChannel] = useState('default');

  const handleSend = message => sendMessage(message);
  const handleUsername = username => changeName(username);
  const isDefaultChat = chatChannel === 'default';
  const twitchChannelLogin = () => {
    if (!currentlyPlaying) return null;
    if (currentlyPlaying.type !== 'twitch-live') return null;

    const channel = currentlyPlaying.url.match(MATCH_TWITCH_CHANNEL_URL);
    if (!channel) return null;

    return channel[1];
  };

  const twitchChannelName = () => {
    if (!currentlyPlaying) return null;
    if (currentlyPlaying.type !== 'twitch-live') return null;
    return currentlyPlaying.channel;
  };

  return (
    <Wrapper>
      <Header>
        <Viewers />
        <ChatSelector
          onUsername={handleUsername}
          twitchChannel={twitchChannelName()}
          currentUser={currentUser}
          onClick={setChatChannel}
        />
      </Header>
      <HiddableContainer hidden={!isDefaultChat}>
        <Chat isMobile={isMobile} channel={chatChannel} />
        <ChatFieldContainer>
          <ChatTextField onSend={handleSend} />
        </ChatFieldContainer>
      </HiddableContainer>
      {currentlyPlaying && currentlyPlaying.type === 'twitch-live' && (
        <HiddableContainer hidden={isDefaultChat}>
          <TwitchChat username={twitchChannelLogin()} />
        </HiddableContainer>
      )}
    </Wrapper>
  );
};

FeaturePageRight.propTypes = {
  currentUser: PropTypes.object,
  currentlyPlaying: PropTypes.object,
  isMobile: PropTypes.bool,
  sendMessage: PropTypes.func.isRequired,
  changeName: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  currentlyPlaying: makeSelectCurrentlyPlaying(),
});

const mapDispatchToProps = dispatch => ({
  sendMessage: evt => dispatch(emitRoomMessage(evt)),
  changeName: evt => dispatch(emitUserChangeUsername(evt)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(FeaturePageRight);
