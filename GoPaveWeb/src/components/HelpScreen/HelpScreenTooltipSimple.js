import React from 'react';
import ReactTooltip from 'react-tooltip';
import { SmallHelpScreenComponentSimple } from 'Components';

const HelpScreenTooltipSimple = ({id, helpScreenType, helpScreenTitle, showPopup, popup, firstParagraph, secondParagraph, isShow }) => {
  if (isShow) {
    return (
      <div>
        <ReactTooltip id={id} effect="solid" place="right" class='extraClass'  type='light' delayHide={200}>
          <SmallHelpScreenComponentSimple  title={helpScreenTitle} firstParagraph={firstParagraph}  secondParagraph={secondParagraph}  />
        </ReactTooltip>
      </div>
    )
  } else {
    return null;
  }
}

export default HelpScreenTooltipSimple;