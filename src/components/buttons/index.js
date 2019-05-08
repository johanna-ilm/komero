import React from 'react';

import './buttons.css';

const classNames = classnames => classnames.join(" ");

const Button = ({ className = "", primary, secondary, ...props }) => {
    return (
        <button
            type="button"
            className={classNames([
                "button",
                className,
                primary ? "button--rectangle button--primary" : "",
                secondary ? "button--rectangle button--secondary" : ""
            ])}
            {...props} />
    );
}

const FloatingButton = ({ className = "", ...props }) => {
    return (
        <Button
            className={classNames(["button--floating", className])}
            {...props} />
    );
}

export { Button as default, Button, FloatingButton }