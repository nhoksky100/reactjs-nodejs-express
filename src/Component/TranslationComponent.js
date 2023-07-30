import React from 'react';
import translate from 'google-translate-api';

class TranslationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            translatedText: ''
        };
    }

    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }

    handleTranslation() {
        const { text } = this.state;
        translate(text, { to: 'en' })
            .then((result) => {
                this.setState({ translatedText: result.text });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { text, translatedText } = this.state;

        return React.createElement(
            'div',
            null,
            React.createElement('input', {
                type: 'text',
                value: text,
                onChange: (e) => this.handleTextChange(e)
            }),
            React.createElement('button', {
                onClick: () => this.handleTranslation()
            }, 'Dịch sang tiếng Anh'),
            React.createElement('p', null, translatedText)
        );
    }
}

export default TranslationComponent;