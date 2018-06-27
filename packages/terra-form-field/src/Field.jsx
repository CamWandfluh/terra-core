import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import IconError from 'terra-icon/lib/icon/IconError';
import 'terra-base/lib/baseStyles';
import styles from './Field.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The form control elements the Field contains.
   */
  children: PropTypes.node,
  /**
   * Error message for when the input is invalid. This will only be displayed if isInvalid is true.
   */
  error: PropTypes.node,
  /**
   * Error Icon to display when the input is invalid.
   */
  errorIcon: PropTypes.element,
  /**
   * Help element to display with the input.
   */
  help: PropTypes.node,
  /**
   * Whether or not to hide the required indicator on the label.
   */
  hideRequired: PropTypes.bool,
  /**
   * The htmlFor attribute on the field label.
   */
  htmlFor: PropTypes.string,
  /**
   * Whether or not the field is invalid.
   */
  isInvalid: PropTypes.bool,
  /**
   * Whether or not the field is an inline field.
   */
  isInline: PropTypes.bool,
  /**
   * Whether or not the label is visible. Use this props to hide a label while still creating it on the DOM for accessibility.
   */
  isLabelHidden: PropTypes.bool,
  /**
   * The label of the form control children.
   */
  label: PropTypes.node.isRequired,
  /**
   * Attributes to attach to the label.
   */
  labelAttrs: PropTypes.object,
  /**
   * Whether or not the field is required.
   */
  required: PropTypes.bool,
  /**
   * Whether or not to append the 'optional' label to a non-required field label.
   */
  showOptional: PropTypes.bool,
};

const defaultProps = {
  children: null,
  error: null,
  errorIcon: <IconError />,
  help: null,
  hideRequired: false,
  htmlFor: undefined,
  isInvalid: false,
  isInline: false,
  isLabelHidden: false,
  label: null,
  labelAttrs: {},
  required: false,
  showOptional: false,
};

const contextTypes = {
  /* eslint-disable consistent-return */
  intl: (context) => {
    if (context.intl === undefined) {
      return new Error('Please add locale prop to Base component to load translations');
    }
  },
};

const hasWhiteSpace = s => /\s/g.test(s);

const Field = (props, { intl }) => {
  const {
    children,
    error,
    errorIcon,
    help,
    hideRequired,
    htmlFor,
    isInvalid,
    isInline,
    isLabelHidden,
    label,
    labelAttrs,
    required,
    showOptional,
    ...customProps
  } = props;

  const fieldClasses = cx([
    'field',
    { 'field-inline': isInline },
    customProps.className,
  ]);

  const labelClassNames = cx([
    'label',
    labelAttrs.className,
  ]);

  if (htmlFor && hasWhiteSpace(htmlFor)) {
    // eslint-disable-next-line
    console.error('The htmlFor prop should be a string without white spaces as it will be used as an HTML attribute value. Use - or _ in place of white space characters.');
  }

  let labelId = `${htmlFor}-label`;
  if (labelAttrs.id) {
    labelId = labelAttrs.id;
  }

  const labelGroup = (
    <div className={cx(['label-group', { 'label-group-hidden': isLabelHidden }])}>
      {isInvalid && <div className={cx('error-icon')}>{errorIcon}</div>}
      {<label id={labelId} htmlFor={htmlFor} {...labelAttrs} className={labelClassNames}>
        {required && (isInvalid || !hideRequired) && <div className={cx('required')}>*</div>}
        {label}
        {required && !isInvalid && hideRequired && <div className={cx('required-hidden')}>*</div>}
        {showOptional && !required && <div className={cx('optional')}>{intl.formatMessage({ id: 'Terra.form.field.optional' })}</div>}
      </label>}
      {!isInvalid && <div className={cx('error-icon-hidden')}>{errorIcon}</div>}
    </div>
  );

  return (
    <div {...customProps} className={fieldClasses}>
      {labelGroup}
      {children}
      {isInvalid && error && <div id={`${htmlFor}-error`} className={cx('error-text')}>{error}</div>}
      {help && <div id={`${htmlFor}-help`} className={cx('help-text')}>{help}</div>}
    </div>
  );
};

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;
Field.contextTypes = contextTypes;

export default Field;
