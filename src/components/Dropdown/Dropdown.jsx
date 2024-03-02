import styled from '@emotion/styled'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PropTypes from 'prop-types'
import { Children, cloneElement, createElement, forwardRef, useRef, useState } from 'react'

const Dropdown = ({
  trigger,
  menu,
  keepOpen: keepOpenGlobal,
  isOpen: controlledIsOpen,
  onOpen: onControlledOpen,
  minWidth
}, ref) => {
  const [isInternalOpen, setInternalOpen] = useState(null)

  const isOpen = controlledIsOpen || isInternalOpen

  let anchorRef = useRef(null)
  if(ref) {
    anchorRef = ref
  }

  const handleOpen = (event) => {
    event.stopPropagation()

    if(menu.length) {
      onControlledOpen
        ? onControlledOpen(event.currentTarget)
        : setInternalOpen(event.currentTarget)
    }
  }

  const handleClose = (event) => {
    event.stopPropagation()

    if(
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return
    }

    handleForceClose()
  }

  const handleForceClose = () => {
    onControlledOpen
      ? onControlledOpen(null)
      : setInternalOpen(null)
  }

  const renderMenu = (menuItem, index) => {
    const { keepOpen: keepOpenLocal, children, ...props } = menuItem.props

    let extraProps = {}
    if(menu) {
      extraProps = {
        parentMenuOpen: isOpen
      }
    }

    return createElement(menuItem.type, {
      ...props,
      key: index,
      ...extraProps,
      onClick: (event) => {
        event.stopPropagation()

        if(!keepOpenGlobal && !keepOpenLocal) {
          handleClose(event)
        }

        if(menuItem.props.onClick) {
          menuItem.props.onClick(event)
        }
      }
    }, props.menu ? Children.map(props.menu, renderMenu) : children)
  }

  return (
    <>
      {cloneElement(trigger, {
        onClick: isOpen ? handleForceClose : handleOpen,
        ref: anchorRef
      })}

      <Menu
        PaperProps={{ sx: { minWidth: minWidth ?? 0 } }}
        anchorEl={isOpen}
        open={!!isOpen}
        onClose={handleClose}
      >
        {Children.map(menu, renderMenu)}
      </Menu>
    </>
  )
}

Dropdown.propTypes = {
  trigger: PropTypes.element,
  menu: PropTypes.array,
  keepOpen: PropTypes.bool,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  minWidth: PropTypes.number
}

export default forwardRef(Dropdown)

export const DropdownMenuItem = styled(MenuItem)`
  display: flex
  justify-content: space-between !important

  & > svg {
    margin-right: 32px
  }
`
