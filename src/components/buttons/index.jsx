import './buttons.css'

import PropTypes from 'prop-types'

const classNames = classnames => classnames.join(' ')

const Button = ({ className = '', primary, secondary, ...props }) => {
  return (
    <button
      type='button'
      className={classNames([
        'button',
        className,
        primary ? 'button--rectangle button--primary' : '',
        secondary ? 'button--rectangle button--secondary' : ''
      ])}
      {...props} />
  )
}

Button.propTypes = {
  className: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool
}

const FloatingButton = ({ className = '', ...props }) => {
  return (
    <Button
      className={classNames(['button--floating', className])}
      {...props} />
  )
}

FloatingButton.propTypes = {
  className: PropTypes.string
}

export { Button as default, FloatingButton }
