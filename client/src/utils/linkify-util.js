import Linkify from 'react-linkify';

var linkifyUtil = (text, linkExtraProps) => {
    return (
        <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => {return (
                <a
                    {...linkExtraProps}
                    href={decoratedHref}
                    target='_blank'
                    key={key}
                >
                    {decoratedText}
                </a>
            )}}
        >
            {text}
        </Linkify>
    );
};

export default linkifyUtil;
