import React from 'react';
const renderNode = (Component, content, defaultProps = {}) => {
    const { key, ...remainingDefaultProps } = defaultProps;
    if (content == null || content === false) {
        return null;
    }
    if (React.isValidElement(content)) {
        return content;
    }
    if (typeof content === 'function') {
        return content();
    }
    if (content === true) {
        return React.createElement(Component, { key: key, ...remainingDefaultProps });
    }
    if (typeof content === 'string') {
        if (content.length === 0) {
            return null;
        }
        return (React.createElement(Component, { key: key, ...remainingDefaultProps }, content));
    }
    if (typeof content === 'number') {
        return (React.createElement(Component, { key: key, ...remainingDefaultProps }, content));
    }
    return React.createElement(Component, { key: key, ...remainingDefaultProps, ...content });
};
export default renderNode;
