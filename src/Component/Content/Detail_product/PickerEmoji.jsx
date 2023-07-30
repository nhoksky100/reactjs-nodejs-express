import EmojiPicker from 'emoji-picker-react';

import React, { Component } from 'react';
import { connect } from 'react-redux';
class PickerEmoji extends Component {

  onEmojiClick = (emojiObject) => {
    
    this.props.getEmoji(emojiObject.emoji);

  };
  render() {

    return (
      <div >

        <EmojiPicker
          onEmojiClick={this.onEmojiClick} disableAutoFocus={true} native 
          skinTonesDisabled={true} width={250} height={400} theme='dark' emojiStyle={'native'} lazyLoadEmojis={true}
         
        />

      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    // iconEmoji: state.iconEmoji,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getEmoji: (ac_emoji) => {
      dispatch({ type: 'iconemoji', ac_emoji })
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PickerEmoji);