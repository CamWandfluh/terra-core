import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import Radio from './Radio';
import styles from './RadioField.scss';

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
   * Help element to display with the input.
   */
  help: PropTypes.node,
  /**
   * Whether or not to hide the required indicator on the legend.
   */
  hideRequired: PropTypes.bool,
  /**
   * Whether or not the field is an inline field.
   */
  isInline: PropTypes.bool,
  /**
   * Whether or not the field is invalid.
   */
  isInvalid: PropTypes.bool,
  /**
   * Whether or not the legend is visible. Use this props to hide a legend while still creating it on the DOM for accessibility.
   */
  isLegendHidden: PropTypes.bool,
  /**
   * The legend of the form control children.
   */
  legend: PropTypes.node.isRequired,
  /**
   * Attributes to attach to the legend.
   */
  legendAttrs: PropTypes.object,
  /**
   * Whether or not the field is required.
   */
  required: PropTypes.bool,
  /**
   * Whether or not to append the 'optional' legend to a non-required field legend.
   */
  showOptional: PropTypes.bool,
};

const defaultProps = {
  children: null,
  error: null,
  help: null,
  hideRequired: false,
  isInline: false,
  isInvalid: false,
  isLegendHidden: false,
  legend: null,
  legendAttrs: {},
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

const RadioContext = React.createContext();

const RadioField = (props, { intl }) => {
  const {
    children,
    error,
    help,
    hideRequired,
    isInvalid,
    isInline,
    isLegendHidden,
    legend,
    legendAttrs,
    required,
    showOptional,
    ...customProps
  } = props;

  const radioFieldClasses = cx([
    'radio-field',
    { 'is-inline': isInline },
    customProps.className,
  ]);

  const legendClassNames = cx([
    'legend',
    legendAttrs.className,
  ]);

  const legendGroup = (
    <legend className={cx(['legend-group', { 'legend-group-hidden': isLegendHidden }])}>
      {<div {...legendAttrs} className={legendClassNames}>
        {isInvalid && <span className={cx('error-icon')} />}
        {required && (isInvalid || !hideRequired) && <span className={cx('required')}>*</span>}
        {legend}
        {required && !isInvalid && hideRequired && <span className={cx('required-hidden')}>*</span>}
        {showOptional && !required && <span className={cx('optional')}>{intl.formatMessage({ id: 'Terra.form.field.optional' })}</span>}
      </div>}
      {!isInvalid && <span className={cx('error-icon-hidden')} />}
    </legend>
  );

  return (
    <fieldset {...customProps} className={radioFieldClasses}>
      {legendGroup}
      <RadioContext.Provider
        value={{
          ariaDescribedBy: 'context1 context2',
        }}
      >
        {children}
      </RadioContext.Provider>
      {isInvalid && error && <div className={cx('error-text')}>{error}</div>}
      {help && <div className={cx('help-text')}>{help}</div>}
    </fieldset>
  );
};

const RadioOption = ({
  inputAttrs,
  ...customProps
}) => {

  // Check if a custom inputAttrs["aria-describedby"] has been set so we can merge it with context
  if (inputAttrs && inputAttrs["aria-describedby"]) {
    return (
        <RadioContext.Consumer>
          {radioGroup => (
            <Radio {...customProps} inputAttrs={Object.assign({}, inputAttrs, { 'aria-describedby': `${radioGroup.ariaDescribedBy} ${inputAttrs["aria-describedby"]}` })} />
          )}
        </RadioContext.Consumer>
    );
  } else {
    return (
      <RadioContext.Consumer>
        {radioGroup => (
          <Radio {...customProps} inputAttrs={Object.assign({}, inputAttrs, { 'aria-describedby': `${radioGroup.ariaDescribedBy}` })} />
        )}
      </RadioContext.Consumer>
    );
  }
};

RadioField.propTypes = propTypes;
RadioField.defaultProps = defaultProps;
RadioField.contextTypes = contextTypes;
RadioField.Radio = RadioOption;

export default RadioField;